import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import validator from 'validator';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {
  constructor() {}

  // Check If Input Contains Valid Email
  static isEmail(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    if (value && !validator.isEmail(value)) {
      return { notEmail: true };
    }
    return null;
  }

  // Check If Input Contains Numbers Only
  static isNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value: string = control.value.trim().toString();
    if (value && !validator.isNumeric(value, { no_symbols: true })) {
      return { notNumber: true };
    }
    if (value.startsWith('1')) return null;
    return null;
  }

  // Check If Input Contains English Characters Only
  static isEnglish(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValid = value
      .split('')
      .every(
        (word) =>
          validator.isAlpha(word, 'en-US') ||
          validator.isNumeric(word, { no_symbols: false }) ||
          word === ' '
      );
    if (value && !isValid) {
      return { notEnglish: true };
    }
    return null;
  }

  // Check If Input Contains Arabic Characters Only
  static isArabic(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValid = value
      .split('')
      .every(
        (word) =>
          validator.isAlpha(word, 'ar-EG') ||
          validator.isNumeric(word, { no_symbols: false }) ||
          word === ' '
      );
    if (value && !isValid) {
      return { notArabic: true };
    }
    return null;
  }

  // Check If Input Contains Arabic OR English Characters Only
  static isAlphabet(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValidAlphabetEn = value
      .split(' ')
      .every((word) => validator.isAlpha(word, 'en-US'));
    const isValidAlphabetAr = value
      .split(' ')
      .every((word) => validator.isAlpha(word, 'ar-EG'));
    if (value && !isValidAlphabetEn && !isValidAlphabetAr) {
      return { notAlphabet: true };
    }
    return null;
  }

  // Check If Input Contains Valid Mobile Number
  static isPhone(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    if (value && !validator.isMobilePhone(value, 'ar-EG')) {
      return { notPhone: true };
    }
    return null;
  }

  // Check If Input Contains Arabic OR English Characters And Numbers Only
  static isAlphanumeric(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValidAlphanumericEn = value
      .split(' ')
      .every((word) => validator.isAlphanumeric(word, 'en-US'));
    const isValidAlphanumericAr = value
      .split(' ')
      .every((word) => validator.isAlphanumeric(word, 'ar-EG'));
    if (value && !isValidAlphanumericEn && !isValidAlphanumericAr) {
      return { notAlphaNum: true };
    }
    return null;
  }

  // Check If Input Contains Valid isBase64
  static isBase64(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    if (value && !validator.isBase64(value)) {
      return { notBase64: true };
    }
    return null;
  }

  // Check If Input Contains Valid URL
  static isURL(control: AbstractControl): ValidationErrors | null {

    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    if (value && !validator.isURL(value)) {
      return { notURL: true };
    }
    return null;
  }
}
