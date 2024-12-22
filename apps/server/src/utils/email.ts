import { EMAIL_REGEX } from "../consts";

export function isValidEmail(email: string) {
  if (email.match(EMAIL_REGEX)) {
    return true;
  }

  return false;
}
