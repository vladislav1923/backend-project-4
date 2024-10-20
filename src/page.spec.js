import path from 'path';
import { promises as fs } from 'fs';
import nock from 'nock';
import Page from './page.js';
import {
  INITIAL_FILE_NAME, PROCESSED_FILE_NAME,
  ASSET_PATH, IMAGE_1_NAME, URL, URL_ORIGIN, URL_PATH,
} from '../__tests__/constants.js';

const IMAGE_PATH = path.join(__dirname, '../__tests__/__fixtures__', IMAGE_1_NAME);
const TEMP_DIR = path.join(__dirname, '../__tests__/tmp');

const INITIAL_FILE_PATH = path.join(__dirname, `../__tests__/__fixtures__/${INITIAL_FILE_NAME}`);
const PROCESSED_FILE_PATH = path.join(__dirname, `../__tests__/__fixtures__/${PROCESSED_FILE_NAME}`);

describe('Page', () => {
  it('should load page', async () => {
    const expectedHtml = await fs.readFile(INITIAL_FILE_PATH, 'utf-8');
    const processedHtml = await fs.readFile(PROCESSED_FILE_PATH, 'utf-8');
    const expectedImage = await fs.readFile(IMAGE_PATH);

    nock(URL_ORIGIN)
      .get(URL_PATH)
      .reply(200, expectedHtml)
      .get(ASSET_PATH)
      .reply(200, expectedImage);

    await new Page(URL).load(TEMP_DIR);
    const downloadedHtml = await fs.readFile(`${TEMP_DIR}/ru-hexlet-io-courses.html`, 'utf-8');

    expect(downloadedHtml).toEqual(processedHtml);
  });
});
