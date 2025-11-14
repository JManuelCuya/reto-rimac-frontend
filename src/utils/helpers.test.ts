import { describe, it, expect } from 'vitest';
import { validateDNI, validateCE, validatePhone, calculateAge, formatPrice } from '../utils/helpers';

describe('Validation Helpers', () => {
  describe('validateDNI', () => {
    it('should validate correct DNI', () => {
      expect(validateDNI('12345678')).toBe(true);
    });

    it('should reject DNI with less than 8 digits', () => {
      expect(validateDNI('1234567')).toBe(false);
    });

    it('should reject DNI with more than 8 digits', () => {
      expect(validateDNI('123456789')).toBe(false);
    });

    it('should reject DNI with non-numeric characters', () => {
      expect(validateDNI('1234567a')).toBe(false);
    });
  });

  describe('validateCE', () => {
    it('should validate correct CE', () => {
      expect(validateCE('123456789')).toBe(true);
    });

    it('should reject CE with less than 9 digits', () => {
      expect(validateCE('12345678')).toBe(false);
    });

    it('should reject CE with more than 9 digits', () => {
      expect(validateCE('1234567890')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should validate correct phone number starting with 9', () => {
      expect(validatePhone('987654321')).toBe(true);
    });

    it('should validate phone not starting with 9', () => {
      expect(validatePhone('887654321')).toBe(true);
    });

    it('should reject phone with less than 9 digits', () => {
      expect(validatePhone('98765432')).toBe(false);
    });
  });

  describe('calculateAge', () => {
    it('should calculate age correctly', () => {
      const birthDate = '01-01-1990';
      const age = calculateAge(birthDate);
      expect(age).toBeGreaterThan(30);
    });
  });

  describe('formatPrice', () => {
    it('should format price correctly', () => {
      expect(formatPrice(99)).toBe('S/ 99.00');
      expect(formatPrice(39.5)).toBe('S/ 39.50');
    });
  });
});
