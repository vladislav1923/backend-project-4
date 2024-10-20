import { promises as fs } from 'fs';
import path from 'path';
import {
  getImagesPaths, getLinksPaths, getScriptsPaths, rewriteAssetsPaths,
} from './html.js';
import {
  INITIAL_FILE_NAME,
  IMAGE_PATH,
  NEW_IMAGE_PATH,
  URL_ORIGIN,
  CSS_PATH,
  NEW_CSS_PATH,
  CANONICAL_PATH,
  NEW_CANONICAL_PATH,
  NEW_RUNTIME_SCRIPT_PATH, RUNTIME_SCRIPT_PATH,
} from '../../__tests__/constants.js';

const TEST_FILE_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${INITIAL_FILE_NAME}`);

describe('HTML Utils', () => {
  let file;

  beforeAll(async () => {
    file = await fs.readFile(TEST_FILE_PATH, 'utf-8');
  });

  it('should extract image paths from html', async () => {
    const expected = ['/assets/professions/nodejs.png'];

    const received = getImagesPaths(file);

    expect(received).toEqual(expected);
  });

  it('should replace assets paths', async () => {
    const assets = {
      images: [{
        path: IMAGE_PATH,
        newPath: NEW_IMAGE_PATH,
      }],
      links: [
        { path: CSS_PATH, newPath: NEW_CSS_PATH },
        { path: CANONICAL_PATH, newPath: NEW_CANONICAL_PATH },
      ],
      scripts: [
        {
          path: `${URL_ORIGIN}${RUNTIME_SCRIPT_PATH}`,
          newPath: NEW_RUNTIME_SCRIPT_PATH,
        },
      ],
    };

    const received = rewriteAssetsPaths(file, assets);

    expect(received.includes(assets.images[0].newPath)).toBe(true);
    expect(received.includes(assets.images[0].path)).toBe(false);
    expect(received.includes(assets.links[0].newPath)).toBe(true);
    expect(received.includes(assets.links[0].path)).toBe(false);
    expect(received.includes(assets.links[1].newPath)).toBe(true);
    expect(received.includes(assets.links[1].path)).toBe(false);
    expect(received.includes(assets.scripts[0].newPath)).toBe(true);
    expect(received.includes(assets.scripts[0].path)).toBe(false);
  });

  it('should extract links paths from html', async () => {
    const expected = ['/assets/application.css', '/courses'];

    const received = getLinksPaths(file);

    expect(received).toEqual(expected);
  });

  it('should extract scripts paths from html', async () => {
    const expected = ['https://ru.hexlet.io/packs/js/runtime.js'];

    const received = getScriptsPaths(file, URL_ORIGIN);

    expect(received).toEqual(expected);
  });
});
