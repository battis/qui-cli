import { build } from '@qui-cli/structured';
import path from 'node:path';

await build({
  fileName: import.meta.filename,
  commandDirPath: path.join(import.meta.dirname, 'Commands')
});
