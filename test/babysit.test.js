const { expect } = require('chai');
const calcPay = require('../lib/calcPay');

describe('Babysitter Pay Calculator', () => {
  // Family A tests
  describe('Family A', () => {
    it('calculates pay only before 23:00', () => {
      // 17–23 = 6h @ $15 = $90
      expect(calcPay(17, 23, 'A')).to.equal(6 * 15);
    });

    it('calculates pay only after 23:00', () => {
      // 23–2 (2 AM) => 23–26 = 3h @ $20 = $60
      expect(calcPay(23, 2, 'A')).to.equal(3 * 20);
    });

    it('calculates pay across both periods', () => {
      // 18–1 => 18–23 = 5h @15, 23–25 = 2h @20 => 75 + 40 = 115
      expect(calcPay(18, 1, 'A')).to.equal(5 * 15 + 2 * 20);
    });

    it('allows full-night span 17–4 AM', () => {
      // 17–23 = 6h @15, 23–28 = 5h @20 => 90 + 100 = 190
      expect(calcPay(17, 4, 'A')).to.equal(6 * 15 + 5 * 20);
    });
  });

  // Family B tests
  describe('Family B', () => {
    it('calculates pay before 22:00', () => {
      // 17–22 = 5h @12 = 60
      expect(calcPay(17, 22, 'B')).to.equal(5 * 12);
    });

    it('calculates pay between 22:00 and midnight', () => {
      // 22–24 = 2h @8 = 16
      expect(calcPay(22, 24, 'B')).to.equal(2 * 8);
    });

    it('calculates pay after midnight', () => {
      // 24–28 = 4h @16 = 64
      expect(calcPay(0, 4, 'B')).to.equal(4 * 16);
      // also numeric 24–28
      expect(calcPay(24, 28, 'B')).to.equal(4 * 16);
    });

    it('calculates pay across all bands', () => {
      // 17–28: 17–22=5h@12=60,22–24=2h@8=16,24–28=4h@16=64 => total 140
      expect(calcPay(17, 4, 'B')).to.equal(60 + 16 + 64);
    });
  });

  // Family C tests
  describe('Family C', () => {
    it('calculates pay only before 21:00', () => {
      // 17–21 = 4h @21 = 84
      expect(calcPay(17, 21, 'C')).to.equal(4 * 21);
    });

    it('calculates pay only after 21:00', () => {
      // 21–4 = 7h @15 = 105
      expect(calcPay(21, 4, 'C')).to.equal(7 * 15);
    });

    it('calculates pay across both periods', () => {
      // 18–2: 18–21=3h@21=63,21–26=5h@15=75 => 138
      expect(calcPay(18, 2, 'C')).to.equal(3 * 21 + 5 * 15);
    });
  });

  // Validation tests
  describe('Validation and errors', () => {
    it('throws if start time is before 17 (5 PM)', () => {
      expect(() => calcPay(16, 20, 'A')).to.throw('Start before 5pm');
    });

    it('throws if end time is after 4 AM', () => {
      // 5 AM -> normalized to 5, end > 28? no; but 5 < start? test with 17–5 => error "End must be after start"
      // To test after 4 AM: use 29 (invalid hour): parse hour '29' => 29 => toInternal 29 => >28
      expect(() => calcPay(17, 29, 'A')).to.throw('End after 4am');
    });

    it('throws if end is <= start', () => {
      expect(() => calcPay(20, 20, 'B')).to.throw('End must be after start');
      expect(() => calcPay(22, 21, 'B')).to.throw('End must be after start');
    });

    it('throws for unknown family', () => {
      expect(() => calcPay(17, 23, 'X')).to.throw('Unknown family');
    });

    it('throws for non-integer or invalid hour input', () => {
      expect(() => calcPay('abc', 23, 'A')).to.throw('Invalid hour: abc');
      expect(() => calcPay(17, 'xyz', 'A')).to.throw('Invalid hour: xyz');
    });
  });
});
