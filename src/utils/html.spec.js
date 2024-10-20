import { promises as fs } from 'fs';
import path from 'path';
import { getImagesPaths, rewriteImagesPaths } from './html.js';

const TEST_FILE_NAME = 'page-with-images.html';
const TEST_FILE_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${TEST_FILE_NAME}`);

describe('HTML Utils', () => {
  it('should extract image paths from html', async () => {
    const file = await fs.readFile(TEST_FILE_PATH, 'utf-8');
    const expected = ['/assets/professions/nodejs.png'];

    const received = getImagesPaths(file);

    expect(received).toEqual(expected);
  });

  it('should replace image paths', async () => {
    const file = await fs.readFile(TEST_FILE_PATH, 'utf-8');
    const images = [{
      path: '/assets/professions/nodejs.png',
      newPath: 'ru-hexlet-io-courses_files/ru-hexlet-io-assets-professions-nodejs.png',
    }];

    const received = rewriteImagesPaths(file, images);

    expect(received.includes(images[0].newPath)).toBe(true);
  });
});
