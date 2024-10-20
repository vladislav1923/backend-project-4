import { promises as fs } from 'fs';
import path from 'path';
import { getImagesPaths, rewriteImagesPaths } from './html.js';
import { INITIAL_FILE_NAME, ASSET_PATH, NEW_ASSET_PATH } from '../../__tests__/constants.js';

const TEST_FILE_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${INITIAL_FILE_NAME}`);

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
      path: ASSET_PATH,
      newPath: NEW_ASSET_PATH,
    }];

    const received = rewriteImagesPaths(file, images);

    expect(received.includes(images[0].newPath)).toBe(true);
  });
});
