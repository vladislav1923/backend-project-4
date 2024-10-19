import path from 'path';
import { promises as fs } from 'fs';
import nock from 'nock';
import pageLoader from '../src/page-loader.js';

const TEST_URL_ORIGIN = 'https://ru.hexlet.io';
const TEST_URL_PATH = '/courses';
const TEST_URL = `${TEST_URL_ORIGIN}${TEST_URL_PATH}`;
const TEST_FILE_NAME = 'ru-hexlet-io-courses.html';
const TEST_FILE_PATH = path.join(__dirname, `__fixtures__/${TEST_FILE_NAME}`);
const TEMP_DIR = path.join(__dirname, 'tmp/');

let expectedHtml;

beforeAll(async () => {
  expectedHtml = await fs.readFile(TEST_FILE_PATH, 'utf-8');

  nock(TEST_URL_ORIGIN)
    .get(TEST_URL_PATH)
    .reply(200, expectedHtml);
});

describe('page-loader', () => {
  it('should load page', async () => {
    await pageLoader(TEST_URL, TEMP_DIR);
    const downloadedHtml = await fs.readFile(`${TEMP_DIR}/${TEST_FILE_NAME}`, 'utf-8');

    expect(downloadedHtml).toEqual(expectedHtml);
  });
});
