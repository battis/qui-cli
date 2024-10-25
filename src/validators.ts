import core from './core.js';
import domainValidator from '@tahul/is-valid-domain';
import cronValidator from 'cron-validate';
import emailValidator from 'email-validator';
import fs from 'fs';
import pathValidator from 'is-valid-path';
import path from 'path';

export type Validator = (value?: string) => boolean | string;

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
  return (notEmpty(value) && pathValidator(value)) || 'Must be a valid path';
}

export function match(pattern: RegExp): Validator {
  return (value?: string) =>
    (!!value && pattern.test(value)) ||
    `Must match pattern /${pattern.toString()}/`;
}

export function lengthBetween(min: number, max: number): Validator {
  return (value?: string) =>
    (minLength(min)(value) && maxLength(max)(value)) ||
    `Must be between ${minLength} && ${maxLength} characters`;
}

export function email(value?: string) {
  return (
    (notEmpty(value) && emailValidator.validate(value || '')) ||
    'Must be valid email address'
  );
}

export function cron(value?: string) {
  return (
    // FIXME cronValidator callable
    // @ts-ignore
    (notEmpty(value) && cronValidator(value || '').isValid()) ||
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

export function pathExists(root = core.appRoot()): Validator {
  return function (value?: string) {
    const possiblePath = path.resolve(root, value || '');
    return (
      (isPath(value) && fs.existsSync(possiblePath)) ||
      `${possiblePath} does not exist`
    );
  };
}

export function combine(...validators: (Validator | undefined)[]): Validator {
  return (value?: string) =>
    validators.reduce(
      (valid: string | boolean, validator?: Validator) =>
        validator ? (valid && validator ? validator(value) : true) : valid,
      true
    );
}

export default {
  notEmpty,
  minLength,
  maxLength,
  isPath,
  match,
  lengthBetween,
  email,
  cron,
  isHostname,
  pathExists,
  combine
};
