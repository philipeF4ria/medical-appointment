import { resolve } from 'path';
import { randomBytes } from 'node:crypto';
import multer from 'multer';

const folderTmp = resolve(__dirname, '..', '..', 'tmp');

export default {
  storage: multer.diskStorage({
    destination: folderTmp,
    filename: (request, file, callback) => {
      const fileHash = randomBytes(16).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
}
