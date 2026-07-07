// Validation helpers used by Login and CreateAccount pages
export function isEmailValid(email) {
  if (!email) return false
  // simple check for @ and a domain-like part
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isStrongPassword(pw) {
  if (!pw) return false
  // at least 8 chars, one upper, one lower, one digit, one special
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pw)
}

export function isSingleWordName(name) {
  if (!name) return false
  // allow letters, hyphen or apostrophe in single word, no spaces
  return /^[A-Za-z'-]+$/.test(name)
}

export function isPhoneValid(phone) {
  if (!phone) return false
  // digits only, exactly 10
  return /^\d{10}$/.test(phone.replace(/\D/g, ''))
}
