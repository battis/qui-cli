import { Configuration, config } from './Configuration.js';

export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      switch (key) {
        case 'fileHandlers':
          config.fileHandlers = {
            ...config.fileHandlers,
            ...proposal.fileHandlers
          };
          break;
        case 'scope':
          config[key] = proposal[key].replace(/^@/, '');
          break;
        case 'ignore':
          if (proposal.ignore?.length !== 0) {
            config.ignore = [
              ...new Set([...(config.ignore || []), ...(proposal.ignore || [])])
            ];
            break;
          }
        // eslint-disable-next-line no-fallthrough
        default:
          config[key] = proposal[key];
      }
    }
  }
}
