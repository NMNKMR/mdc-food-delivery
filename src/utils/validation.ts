const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;

export const isEmail = (value: string) => EMAIL_RE.test(value.trim());
export const isPhone = (value: string) => PHONE_RE.test(value.trim());
export const isStrongPassword = (value: string) => value.length >= 8;
export const isNonEmpty = (value: string) => value.trim().length > 0;
