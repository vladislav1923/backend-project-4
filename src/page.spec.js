import path from 'path';
import { promises as fs } from 'fs';
import nock from 'nock';
import Page from './page.js';

const TEST_URL_ORIGIN = 'https://ru.hexlet.io';
const TEST_URL_PATH = '/courses';
const TEST_ASSET_PATH = '/assets/professions/nodejs.png';
const TEST_URL = `${TEST_URL_ORIGIN}${TEST_URL_PATH}`;
const IMAGE_NAME = 'image.png';
const IMAGE_PATH = path.join(__dirname, '../__tests__/__fixtures__', IMAGE_NAME);
const TEMP_DIR = path.join(__dirname, '../__tests__/tmp');
const INITIAL_FILE_NAME = 'page-with-images.html';
const INITIAL_FILE_PATH = path.join(__dirname, `../__tests__/__fixtures__/${INITIAL_FILE_NAME}`);
const PROCESSED_FILE_NAME = 'downloaded-page-with-images.html';
const PROCESSED_FILE_PATH = path.join(__dirname, `../__tests__/__fixtures__/${PROCESSED_FILE_NAME}`);

describe('Page', () => {
  it('should load page', async () => {
    const expectedHtml = await fs.readFile(INITIAL_FILE_PATH, 'utf-8');
    const processedHtml = await fs.readFile(PROCESSED_FILE_PATH, 'utf-8');
    const expectedImage = await fs.readFile(IMAGE_PATH);

    nock(TEST_URL_ORIGIN)
      .get(TEST_URL_PATH)
      .reply(200, expectedHtml)
      .get(TEST_ASSET_PATH)
      .reply(200, expectedImage);

    await new Page(TEST_URL).load(TEMP_DIR);
    const downloadedHtml = await fs.readFile(`${TEMP_DIR}/ru-hexlet-io-courses.html`, 'utf-8');

    expect(downloadedHtml).toEqual(processedHtml);
  });
});
