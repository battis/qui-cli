import { Root } from '@qui-cli/root';
import domainValidator from '@tahul/is-valid-domain';
import cronValidator from 'cron-validate';
import emailValidator from 'email-validator';
import pathValidator from 'is-valid-path';
import fs from 'node:fs';
import path from 'node:path';

export type Validator = (value?: string) => boolean | string;

/** Non-empty string */
export function notEmpty(value?: string) {
  return (!!value && value.length > 0) || 'May not be empty';
}

/** A string of at least `minLength` characters */
export function minLength(minLength: number): Validator {
  return (value?: string) =>
    (!!value && value.length >= minLength) ||
    `Must be at least ${minLength} characters`;
}

/** A string of no more than `maxLength` charaters */
export function maxLength(maxLength: number): Validator {
  return (value?: string) =>
    (!!value && value.length <= maxLength) ||
    `Must be no more than ${maxLength} characters`;
}

/** A string that is a valid file path */
export function isPath(value?: string) {
  return (
    (notEmpty(value) === true && pathValidator(value)) || 'Must be a valid path'
  );
}

/** A string that matches the regular expression `pattern` */
export function match(pattern: RegExp): Validator {
  return (value?: string) =>
    (!!value && pattern.test(value)) ||
    `Must match pattern /${pattern.toString()}/`;
}

/** A {@link Validator} that validates that a string is between `min` and `max` characters, inclusive */
export function lengthBetween(min: number, max: number): Validator {
  return (value?: string) =>
    (minLength(min)(value) === true && maxLength(max)(value) === true) ||
    `Must be between ${min} && ${max} characters`;
}

/** A string that is a valid email address */
export function email(): Validator {
  return (value?: string) =>
    (notEmpty(value) === true && emailValidator.validate(value || '')) ||
    'Must be valid email address';
}

/** A string that is a valid crontab schedule */
export function cron(value?: string) {
  return (
    // FIXME cronValidator callable
    // Issue URL: https://github.com/battis/qui-cli/issues/27
    // @ts-expect-error 2349 cronValidator typing
    (notEmpty(value) === true && cronValidator(value || '').isValid()) ||
    'Must be valid cron schedule'
  );
}

/** A {@link Validator} that validates a string as a valid hostname */
export function isHostname({
  subdomain = false,
  wildcard = false,
  allowUnicode = false,
  topLevel = false,
  localhost = true,
  ipAddress = true,
  allowed = []
}: {
  /** require a subdomain */
  subdomain?: boolean;
  /** allow wildcards */
  wildcard?: boolean;
  /** allow Unicode characters */
  allowUnicode?: boolean;
  /** require a top-level domain name */
  topLevel?: boolean;
  /** allow localhost */
  localhost?: boolean;
  /** allow UP address */
  ipAddress?: boolean;
  /** specific allowed hostnames */
  allowed?: string[];
}): Validator {
  return (value?: string) => {
    let domain;
    if (value) {
      domain = domainValidator(value, {
        subdomain,
        wildcard,
        allowUnicode,
        topLevel
      });
    }
    return (
      (!!value &&
        (domain ||
          (localhost && value === 'localhost') ||
          (ipAddress && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) ||
          allowed.includes(value))) ||
      `Must be a valid hostname`
    );
  };
}

/** A {@link Validator}  that validates a string as a valid file path relative to `root` to a file that exists */
export function pathExists(root = Root.path()): Validator {
  return (value?: string) => {
    const possiblePath = path.resolve(root, value || '');
    return (
      (isPath(value) === true && fs.existsSync(possiblePath)) ||
      `${possiblePath} does not exist`
    );
  };
}

/** A {@link Validator} that combines other Validators */
export function combine(...validators: Validator[]): Validator {
  return (value?: string) =>
    validators.reduce((valid: string | boolean, validator: Validator) => {
      if (valid === true) {
        return validator(value);
      }
      return valid;
    }, true);
}
