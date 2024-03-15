export const EmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const PasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/;
export const SSNRegex = /^(?:[0-9]{3})(?:[0-9]{2})(?:[0-9]{4})$/;
// export const MobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/
// export const MobileRegex =  /^(?!0+$)\d{10}$/
export const MobileRegex = /^(?!.*(\d)\1{9})\d{10}$/
export const OnlyNumRegex = /^[0-9]+$/