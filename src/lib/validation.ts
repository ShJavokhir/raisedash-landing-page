/**
 * Centralized validation utilities
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validateRequiredFields(
  data: Record<string, unknown>,
  requiredFields: string[]
): string[] {
  return requiredFields.filter(
    (field) => !data[field] || String(data[field]).trim() === ''
  );
}

export function hasMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength;
}

export function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, '').length >= 10;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validateContactForm(data: {
  name?: string;
  email?: string;
  message?: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name?.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!data.email?.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if (!data.message?.trim()) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (!hasMinLength(data.message, 10)) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  }

  return errors;
}
