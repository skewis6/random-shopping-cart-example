import { currencyFormatter } from './formatters';

describe('currencyFormatter', () => {
  it('should format the currency correctly for positive amount', () => {
    expect(currencyFormatter(10)).toBe('£10.00');
  });

  it('should format the currency correctly for negative amount', () => {
    expect(currencyFormatter(-10)).toBe('-£10.00');
  });

  it('should format the currency correctly for decimal value', () => {
    expect(currencyFormatter(10.123)).toBe('£10.12');
  });

  it('should format the currency correctly for zero value', () => {
    expect(currencyFormatter(0)).toBe('£0.00');
  });
});
