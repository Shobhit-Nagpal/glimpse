export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const Providers = {
  EMAIL: "EMAIL",
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
};

// 100 days in seconds
export const COOKIE_MAX_AGE = 24 * 60 * 60 * 100;
