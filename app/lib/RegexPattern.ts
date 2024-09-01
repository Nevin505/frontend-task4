export const pinCodeRegex:RegExp = /^[1-9][0-9]{5}$/; // Matches a 6-digit numeric PIN code starting with a non-zero digit
export const panRegexPattern: RegExp = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export const gstinRegex:RegExp = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;