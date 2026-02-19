import {
  assertOrderStatusTransition,
  canTransitionOrderStatus,
} from './order-status';

describe('order status state machine (skeleton)', () => {
  it('allows initial creation only to CREATED', () => {
    expect(() =>
      assertOrderStatusTransition({ from: null, to: 'CREATED' }),
    ).not.toThrow();
    expect(() =>
      assertOrderStatusTransition({ from: null, to: 'PLANNED' }),
    ).toThrow(/must start at CREATED/i);
  });

  it('allows a normal happy-path transition', () => {
    expect(canTransitionOrderStatus('CREATED', 'PLANNED')).toBe(true);
    expect(() =>
      assertOrderStatusTransition({ from: 'CREATED', to: 'PLANNED' }),
    ).not.toThrow();
  });

  it('rejects an obviously invalid transition', () => {
    expect(canTransitionOrderStatus('CREATED', 'DELIVERED')).toBe(false);
    expect(() =>
      assertOrderStatusTransition({ from: 'CREATED', to: 'DELIVERED' }),
    ).toThrow(/invalid order status transition/i);
  });

  it('allows idempotent (same-status) transition', () => {
    expect(canTransitionOrderStatus('SCORING', 'SCORING')).toBe(true);
  });
});
