import path from 'path';
import { promises as fs } from 'fs';
import nock from 'nock';
import Page from './page.js';
import {
  INITIAL_FILE_NAME,
  PROCESSED_FILE_NAME,
  IMAGE_PATH,
  URL,
  URL_ORIGIN,
  URL_PATH,
  STYLES_FILE_NAME,
  CSS_PATH,
  CANONICAL_PATH,
  IMAGE_1_NAME,
  RUNTIME_SCRIPT_PATH,
  RUNTIME_SCRIPT_FILE_NAME,
} from '../__tests__/constants.js';

const TEMP_DIR = path.join(__dirname, '../__tests__/tmp');

const INITIAL_FILE_PATH = path.join(__dirname, '../__tests__/__fixtures__', INITIAL_FILE_NAME);
const PROCESSED_FILE_PATH = path.join(__dirname, '../__tests__/__fixtures__', PROCESSED_FILE_NAME);
const STYLES_PATH = path.join(__dirname, '../__tests__/__fixtures__', STYLES_FILE_NAME);
const SCRIPT_PATH = path.join(__dirname, '../__tests__/__fixtures__', RUNTIME_SCRIPT_FILE_NAME);
const IMAGE_1_PATH = path.join(__dirname, '../__tests__/__fixtures__', IMAGE_1_NAME);

describe('Page', () => {
  it('should load page', async () => {
    const expectedHtml = await fs.readFile(INITIAL_FILE_PATH, 'utf-8');
    const processedHtml = await fs.readFile(PROCESSED_FILE_PATH, 'utf-8');
    const expectedImage = await fs.readFile(IMAGE_1_PATH);
    const expectedStyles = await fs.readFile(STYLES_PATH);
    const expectedScript = await fs.readFile(SCRIPT_PATH);

    nock(URL_ORIGIN)
      .get(URL_PATH)
      .reply(200, expectedHtml)
      .get(IMAGE_PATH)
      .reply(200, expectedImage)
      .get(CSS_PATH)
      .reply(200, expectedStyles)
      .get(CANONICAL_PATH)
      .reply(200, expectedHtml)
      .get(RUNTIME_SCRIPT_PATH)
      .reply(200, expectedScript);

    await new Page(URL).load(TEMP_DIR);
    const downloadedHtml = await fs.readFile(`${TEMP_DIR}/ru-hexlet-io-courses.html`, 'utf-8');

    expect(downloadedHtml).toEqual(processedHtml);
  });
});
