import { register } from '@qui-cli/plugin';
import { Plugin } from './Base.js';
import { isRef } from './Secrets.js';

export const OP: {
  isSecretReference: (value: unknown) => boolean;
  get?: Plugin['get'];
  set?: Plugin['set'];
} = {
  isSecretReference: isRef
};
try {
  await import('@1password/sdk');
  const opModule = await import('./1Password.js');
  const plugin = new opModule.OP();
  OP.set = plugin.set.bind(plugin);
  OP.get = plugin.get.bind(plugin);
  await register(plugin);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (_) {
  //
}
