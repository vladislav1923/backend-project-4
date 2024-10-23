import { promises as fs } from 'fs';
import path from 'path';
import { writeFile, checkPathExists } from './fs.js';
import { INITIAL_HTML_FILE_PATH, NOT_EXISTENT_PATH } from '../../__tests__/constants.js';

describe('File System Utils', () => {
  it('should write a file', async () => {
    const file = await fs.readFile(INITIAL_HTML_FILE_PATH, 'utf-8');
    const newFilePath = path.join(__dirname, '../../__tests__/tmp/fs/write/new-file.html');

    await writeFile(newFilePath, file);

    const newFile = await fs.readFile(newFilePath, 'utf-8');

    expect(newFile).toEqual(file);
  });

  it('should check if a path exists', async () => expect(checkPathExists(NOT_EXISTENT_PATH))
    .rejects.toThrow(`The output directory does not exist: ${NOT_EXISTENT_PATH}`));

  it('should resolve if an output is not defined', async () => expect(checkPathExists())
    .resolves.toBeUndefined());
});
