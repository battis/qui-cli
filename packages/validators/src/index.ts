import Plugin from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';
import domainValidator from '@tahul/is-valid-domain';
import cronValidator from 'cron-validate';
import emailValidator from 'email-validator';
import pathValidator from 'is-valid-path';
import fs from 'node:fs';
import path from 'node:path';

export type Validator = (value?: string) => boolean | string;

function notEmpty(value?: string) {
  return (!!value && value.length > 0) || 'May not be empty';
}

function minLength(minLength: number): Validator {
  return (value?: string) =>
    (!!value && value.length >= minLength) ||
    `Must be at least ${minLength} characters`;
}

function maxLength(maxLength: number): Validator {
  return (value?: string) =>
    (!!value && value.length <= maxLength) ||
    `Must be no more than ${maxLength} characters`;
}

function isPath(value?: string) {
  return (notEmpty(value) && pathValidator(value)) || 'Must be a valid path';
}

function match(pattern: RegExp): Validator {
  return (value?: string) =>
    (!!value && pattern.test(value)) ||
    `Must match pattern /${pattern.toString()}/`;
}

function lengthBetween(min: number, max: number): Validator {
  return (value?: string) =>
    (minLength(min)(value) && maxLength(max)(value)) ||
    `Must be between ${min} && ${max} characters`;
}

function email(): Validator {
  return (value?: string) =>
    (notEmpty(value) && emailValidator.validate(value || '')) ||
    'Must be valid email address';
}

function cron(value?: string) {
  return (
    // FIXME cronValidator callable
    // @ts-ignore
    (this.notEmpty(value) && cronValidator(value || '').isValid()) ||
    'Must be valid cron schedule'
  );
}

function isHostname({
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

function pathExists(root = Root.path()): Validator {
  return (value?: string) => {
    const possiblePath = path.resolve(root, value || '');
    return (
      (isPath(value) && fs.existsSync(possiblePath)) ||
      `${possiblePath} does not exist`
    );
  };
}

function combine(...validators: (Validator | undefined)[]): Validator {
  return (value?: string) =>
    validators.reduce(
      (valid: string | boolean, validator?: Validator) =>
        validator ? (valid && validator ? validator(value) : true) : valid,
      true
    );
}
const { name, dependencies } = await Plugin.define({
  pathToPluginSourceDirectory: import.meta.dirname
});

export const Validators: Plugin.Container = {
  name,
  dependencies,
  configure: async () => {},
  options: () => ({}),
  init: () => {},
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
