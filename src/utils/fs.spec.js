import { promises as fs } from 'fs';
import path from 'path';
import { writeFile, writeImages } from './fs.js';

const TEST_FILE_NAME = 'page-with-images.html';
const TEST_IMAGE_1_NAME = 'image.png';
const TEST_IMAGE_2_NAME = 'image.jpg';
const TEST_FILE_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${TEST_FILE_NAME}`);
const TEST_IMAGE_1_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${TEST_IMAGE_1_NAME}`);
const TEST_IMAGE_2_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${TEST_IMAGE_2_NAME}`);

describe('File System Utils', () => {
  it('should write a file', async () => {
    const file = await fs.readFile(TEST_FILE_PATH, 'utf-8');
    const newFilePath = path.join(__dirname, '../../__tests__/tmp/fs/write/new-file.html');

    await writeFile(newFilePath, file);

    const newFile = await fs.readFile(newFilePath, 'utf-8');

    expect(newFile).toEqual(file);
  });

  it('should write images', async () => {
    const image1 = await fs.readFile(TEST_IMAGE_1_PATH);
    const image2 = await fs.readFile(TEST_IMAGE_2_PATH);
    const newImage1Path = path.join(__dirname, '../../__tests__/tmp/fs/write/new-image1.png');
    const newImage2Path = path.join(__dirname, '../../__tests__/tmp/fs/write/new-image2.jpg');

    await writeImages('', [
      { newPath: newImage1Path, data: image1 },
      { newPath: newImage2Path, data: image2 },
    ]);

    const newImage1 = await fs.readFile(newImage1Path);
    const newImage2 = await fs.readFile(newImage2Path);

    expect(newImage1).toEqual(image1);
    expect(newImage2).toEqual(image2);
  });
});
