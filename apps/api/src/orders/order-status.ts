import { OrderStatus } from '@prisma/client';

export class InvalidOrderTransitionError extends Error {
  readonly from: OrderStatus | null;
  readonly to: OrderStatus;

  constructor(args: {
    from: OrderStatus | null;
    to: OrderStatus;
    message?: string;
  }) {
    super(
      args.message ??
        `Invalid order status transition: ${args.from ?? '∅'} -> ${args.to}`,
    );
    this.name = 'InvalidOrderTransitionError';
    this.from = args.from;
    this.to = args.to;
  }
}

// Minimal, explicit state machine skeleton (expand as M0 evolves).
// NOTE: Keep transitions conservative; loosen only with product confirmation.
const ALLOWED: Readonly<Record<OrderStatus, readonly OrderStatus[]>> = {
  CREATED: ['PLANNED', 'PAUSED', 'FAILED'],
  PLANNED: ['MINING', 'PAUSED', 'FAILED'],
  MINING: ['ENRICHMENT', 'PAUSED', 'FAILED'],
  ENRICHMENT: ['NURTURE', 'INITIAL_LIST', 'PAUSED', 'FAILED'],
  NURTURE: ['INITIAL_LIST', 'PAUSED', 'FAILED'],
  INITIAL_LIST: ['SCORING', 'PAUSED', 'FAILED'],
  SCORING: ['QUALITY_GATE', 'PAUSED', 'FAILED'],
  QUALITY_GATE: ['QUALIFIED_LIST', 'PAUSED', 'FAILED'],
  QUALIFIED_LIST: ['DELIVERED', 'PAUSED', 'FAILED'],
  DELIVERED: ['CLOSED', 'PAUSED'],
  CLOSED: [],
  PAUSED: [
    'PLANNED',
    'MINING',
    'ENRICHMENT',
    'NURTURE',
    'INITIAL_LIST',
    'SCORING',
    'QUALITY_GATE',
    'QUALIFIED_LIST',
    'DELIVERED',
    'FAILED',
  ],
  FAILED: [],
};

export function canTransitionOrderStatus(
  from: OrderStatus,
  to: OrderStatus,
): boolean {
  if (from === to) return true;
  return (ALLOWED[from] ?? []).includes(to);
}

export function assertOrderStatusTransition(args: {
  from: OrderStatus | null;
  to: OrderStatus;
}): void {
  // from=null means initial creation.
  if (args.from === null) {
    if (args.to !== 'CREATED') {
      throw new InvalidOrderTransitionError({
        from: null,
        to: args.to,
        message: `Order must start at CREATED (got ${args.to})`,
      });
    }
    return;
  }

  if (!canTransitionOrderStatus(args.from, args.to)) {
    throw new InvalidOrderTransitionError({ from: args.from, to: args.to });
  }
}
