import { promises as fs } from 'fs';
import path from 'path';
import { writeFile } from './fs.js';
import { INITIAL_HTML_FILE_PATH } from '../../__tests__/constants.js';

describe('File System Utils', () => {
  it('should write a file', async () => {
    const file = await fs.readFile(INITIAL_HTML_FILE_PATH, 'utf-8');
    const newFilePath = path.join(__dirname, '../../__tests__/tmp/fs/write/new-file.html');

    await writeFile(newFilePath, file);

    const newFile = await fs.readFile(newFilePath, 'utf-8');

    expect(newFile).toEqual(file);
  });
});
