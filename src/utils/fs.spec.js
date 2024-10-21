import { promises as fs } from 'fs';
import path from 'path';
import { writeFile, writeAssets } from './fs.js';
import {
  PNG_FILE_PATH, JPG_FILE_PATH, INITIAL_HTML_FILE_PATH,
} from '../../__tests__/constants.js';

describe('File System Utils', () => {
  it('should write a file', async () => {
    const file = await fs.readFile(INITIAL_HTML_FILE_PATH, 'utf-8');
    const newFilePath = path.join(__dirname, '../../__tests__/tmp/fs/write/new-file.html');

    await writeFile(newFilePath, file);

    const newFile = await fs.readFile(newFilePath, 'utf-8');

    expect(newFile).toEqual(file);
  });

  it('should write assets', async () => {
    const image1 = await fs.readFile(PNG_FILE_PATH);
    const image2 = await fs.readFile(JPG_FILE_PATH);
    const newImage1Path = path.join(__dirname, '../../__tests__/tmp/fs/write/new-image1.png');
    const newImage2Path = path.join(__dirname, '../../__tests__/tmp/fs/write/new-image2.jpg');

    await writeAssets('', [
      { newPath: newImage1Path, data: image1 },
      { newPath: newImage2Path, data: image2 },
    ]);

    const newImage1 = await fs.readFile(newImage1Path);
    const newImage2 = await fs.readFile(newImage2Path);

    expect(newImage1).toEqual(image1);
    expect(newImage2).toEqual(image2);
  });
});
