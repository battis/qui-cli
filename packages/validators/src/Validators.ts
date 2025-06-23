import { Root } from '@battis/qui-cli.root';
import domainValidator from '@tahul/is-valid-domain';
import cronValidator from 'cron-validate';
import emailValidator from 'email-validator';
import pathValidator from 'is-valid-path';
import fs from 'node:fs';
import path from 'node:path';

export type Validator = (value?: string) => boolean | string;

export const name = 'validators';

export function notEmpty(value?: string) {
  return (!!value && value.length > 0) || 'May not be empty';
}

export function minLength(minLength: number): Validator {
  return (value?: string) =>
    (!!value && value.length >= minLength) ||
    `Must be at least ${minLength} characters`;
}

export function maxLength(maxLength: number): Validator {
  return (value?: string) =>
    (!!value && value.length <= maxLength) ||
    `Must be no more than ${maxLength} characters`;
}

export function isPath(value?: string) {
  return (
    (notEmpty(value) === true && pathValidator(value)) || 'Must be a valid path'
  );
}

export function match(pattern: RegExp): Validator {
  return (value?: string) =>
    (!!value && pattern.test(value)) ||
    `Must match pattern /${pattern.toString()}/`;
}

export function lengthBetween(min: number, max: number): Validator {
  return (value?: string) =>
    (minLength(min)(value) === true && maxLength(max)(value) === true) ||
    `Must be between ${min} && ${max} characters`;
}

export function email(): Validator {
  return (value?: string) =>
    (notEmpty(value) === true && emailValidator.validate(value || '')) ||
    'Must be valid email address';
}

export function cron(value?: string) {
  return (
    // FIXME cronValidator callable
    // Issue URL: https://github.com/battis/qui-cli/issues/27
    // @ts-ignore
    (notEmpty(value) === true && cronValidator(value || '').isValid()) ||
    'Must be valid cron schedule'
  );
}

export function isHostname({
  subdomain = false,
  wildcard = false,
  allowUnicode = false,
  topLevel = false,
  localhost = true,
  ipAddress = true,
  allowed = []
}: {
  subdomain?: boolean;
  wildcard?: boolean;
  allowUnicode?: boolean;
  topLevel?: boolean;
  localhost?: boolean;
  ipAddress?: boolean;
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

export function pathExists(root = Root.path()): Validator {
  return (value?: string) => {
    const possiblePath = path.resolve(root, value || '');
    return (
      (isPath(value) === true && fs.existsSync(possiblePath)) ||
      `${possiblePath} does not exist`
    );
  };
}

export function combine(...validators: Validator[]): Validator {
  return (value?: string) =>
    validators.reduce((valid: string | boolean, validator: Validator) => {
      if (valid === true) {
        return validator(value);
      }
      return valid;
    }, true);
}
