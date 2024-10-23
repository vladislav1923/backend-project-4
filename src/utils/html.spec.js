import { promises as fs } from 'fs';
import {
  getImagesPaths, getLinksPaths, getScriptsPaths, rewriteAssetsPaths,
} from './html.js';
import {
  MOCKED_PNG_FILE_PATH,
  MOCKED_URL_ORIGIN,
  MOCKED_STYLES_FILE_PATH,
  MOCKED_CANONICAL_HTML_FILE_PATH,
  MOCKED_RUNTIME_SCRIPT_FILE_PATH,
  INITIAL_HTML_FILE_PATH,
} from '../../__tests__/constants.js';
import File from './file-model.js';

describe('HTML Utils', () => {
  let file;

  beforeAll(async () => {
    file = await fs.readFile(INITIAL_HTML_FILE_PATH, 'utf-8');
  });

  it('should extract image paths from html', async () => {
    const received = getImagesPaths(file);

    expect(received[0].getPath()).toBe('/assets/professions/nodejs.png');
  });

  it('should replace assets paths', async () => {
    const images = [new File(MOCKED_PNG_FILE_PATH, 'image')];
    const assets = [
      new File(MOCKED_STYLES_FILE_PATH, 'stylesheet'),
      new File(MOCKED_CANONICAL_HTML_FILE_PATH, 'canonical'),
      new File(`${MOCKED_URL_ORIGIN}${MOCKED_RUNTIME_SCRIPT_FILE_PATH}`, 'script'),
    ];

    const received = rewriteAssetsPaths(file, images, assets, MOCKED_URL_ORIGIN, '/assets');

    expect(received.includes(images[0].getNewPath(MOCKED_URL_ORIGIN, '/assets'))).toBe(true);
    expect(received.includes(images[0].getPath())).toBe(false);
    expect(received.includes(assets[0].getNewPath(MOCKED_URL_ORIGIN, '/assets'))).toBe(true);
    expect(received.includes(assets[0].getPath())).toBe(false);
    expect(received.includes(assets[1].getNewPath(MOCKED_URL_ORIGIN, '/assets'))).toBe(true);
    expect(received.includes(assets[1].getPath())).toBe(false);
    expect(received.includes(assets[0].getNewPath(MOCKED_URL_ORIGIN, '/assets'))).toBe(true);
    expect(received.includes(assets[0].getPath())).toBe(false);
  });

  it('should extract links paths from html', async () => {
    const received = getLinksPaths(file);

    expect(received[0].getPath()).toBe('/assets/application.css');
    expect(received[1].getPath()).toBe('/courses');
  });

  it('should extract scripts paths from html', async () => {
    const received = getScriptsPaths(file, MOCKED_URL_ORIGIN);

    expect(received[0].getPath()).toBe('https://ru.hexlet.io/packs/js/runtime.js');
  });
});
