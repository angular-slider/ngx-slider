import { MathHelper } from './math-helper';

describe('MathHelper', () => {
  describe('roundToPrecisionLimit', () => {
    it('gets rid of digits to the left of precision limit', () => {
      expect(MathHelper.roundToPrecisionLimit(123456789010 + 1, 11)).toEqual(123456789010);
      expect(MathHelper.roundToPrecisionLimit(123456789010 - 1, 11)).toEqual(123456789010);
    });

    it('keeps digits to the right of precision limit', () => {
      expect(MathHelper.roundToPrecisionLimit(123456789010 + 10, 11)).toEqual(123456789010 + 10);
      expect(MathHelper.roundToPrecisionLimit(123456789010 - 10, 11)).toEqual(123456789010 - 10);
    });

    it('helps with rounding common floating point operations', () => {
      expect(0.3 - 0.2).not.toEqual(0.1); // yeah, floating point
      expect(MathHelper.roundToPrecisionLimit(0.3 - 0.2, 12)).toEqual(0.1); // that's better
    });
  });

  describe('isModuloWithinPrecisionLimit', () => {
    it('works for decimal modulo', () => {
      expect(2 % 0.1 === 0).toBeFalsy();
      expect(MathHelper.isModuloWithinPrecisionLimit(2, 0.1, 10)).toBeTruthy();

      expect(MathHelper.isModuloWithinPrecisionLimit(2 - 1e-12, 0.1, 10)).toBeTruthy();
      expect(MathHelper.isModuloWithinPrecisionLimit(2 + 1e-12, 0.1, 10)).toBeTruthy();

      expect(MathHelper.isModuloWithinPrecisionLimit(2, 0.1 - 1e-12, 10)).toBeTruthy();
      expect(MathHelper.isModuloWithinPrecisionLimit(2, 0.1 + 1e-12, 10)).toBeTruthy();

      expect(MathHelper.isModuloWithinPrecisionLimit(2 + 1e-9, 0.1, 10)).toBeFalsy();
      expect(MathHelper.isModuloWithinPrecisionLimit(2 - 1e-9, 0.1, 10)).toBeFalsy();
      expect(MathHelper.isModuloWithinPrecisionLimit(2, 0.1 - 1e-9, 10)).toBeFalsy();
      expect(MathHelper.isModuloWithinPrecisionLimit(2, 0.1 + 1e-9, 10)).toBeFalsy();
    });
  });

  describe('clampToRange', () => {
    it('returns original value if in range', () => {
      expect(MathHelper.clampToRange(40, 0, 100)).toEqual(40);
    });

    it('returns floor if value is below floor', () => {
      expect(MathHelper.clampToRange(-10, 0, 100)).toEqual(0);
    });

    it('returns ceil if value is above ceil', () => {
      expect(MathHelper.clampToRange(110, 0, 100)).toEqual(100);
    });
  });
});
