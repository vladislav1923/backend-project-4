import { promises as fs } from 'fs';
import path from 'path';
import {
  getImagesPaths, getLinksPaths, getScriptsPaths, rewriteAssetsPaths,
} from './html.js';
import {
  MOCKED_PNG_FILE_PATH,
  LOADED_PNG_FILE_PATH,
  MOCKED_URL_ORIGIN,
  MOCKED_STYLES_FILE_PATH,
  LOADED_STYLES_FILE_PATH,
  MOCKED_CANONICAL_HTML_FILE_PATH,
  LOADED_CANONICAL_HTML_FILE_PATH,
  LOADED_RUNTIME_SCRIPT_FILE_PATH, MOCKED_RUNTIME_SCRIPT_FILE_PATH, INITIAL_HTML_FILE_PATH,
} from '../../__tests__/constants.js';

describe('HTML Utils', () => {
  let file;

  beforeAll(async () => {
    file = await fs.readFile(INITIAL_HTML_FILE_PATH, 'utf-8');
  });

  it('should extract image paths from html', async () => {
    const expected = ['/assets/professions/nodejs.png'];

    const received = getImagesPaths(file);

    expect(received).toEqual(expected);
  });

  it('should replace assets paths', async () => {
    const assets = {
      images: [{
        path: MOCKED_PNG_FILE_PATH,
        newPath: LOADED_PNG_FILE_PATH,
      }],
      links: [
        { path: MOCKED_STYLES_FILE_PATH, newPath: LOADED_STYLES_FILE_PATH },
        { path: MOCKED_CANONICAL_HTML_FILE_PATH, newPath: LOADED_CANONICAL_HTML_FILE_PATH },
      ],
      scripts: [
        {
          path: `${MOCKED_URL_ORIGIN}${MOCKED_RUNTIME_SCRIPT_FILE_PATH}`,
          newPath: LOADED_RUNTIME_SCRIPT_FILE_PATH,
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

    const received = getScriptsPaths(file, MOCKED_URL_ORIGIN);

    expect(received).toEqual(expected);
  });
});
