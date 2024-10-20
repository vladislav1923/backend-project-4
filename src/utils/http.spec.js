import { promises as fs } from 'fs';
import path from 'path';
import nock from 'nock';
import { fetchFile, fetchImages } from './http.js';

const TEST_URL_ORIGIN = 'https://ru.hexlet.io';
const TEST_URL_PATH = '/courses';
const TEST_ASSETS_PATH = '/assets';
const TEST_FILE_NAME = 'page-with-images.html';
const TEST_IMAGE_NAME = 'image.png';
const TEST_FILE_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${TEST_FILE_NAME}`);
const TEST_IMAGE_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${TEST_IMAGE_NAME}`);

let expectedHtml;
let expectedImage;

describe('HTTP Utils', () => {
  beforeAll(async () => {
    expectedHtml = await fs.readFile(TEST_FILE_PATH, 'utf-8');
    expectedImage = await fs.readFile(TEST_IMAGE_PATH);

    nock(TEST_URL_ORIGIN)
      .get(TEST_URL_PATH)
      .reply(200, expectedHtml)
      .get(new RegExp(`${TEST_ASSETS_PATH}/\\d+`))
      .reply(200, expectedImage);
  });

  it('should fetch files', async () => {
    const response = await fetchFile(`${TEST_URL_ORIGIN}${TEST_URL_PATH}`);

    expect(response.data).toEqual(expectedHtml);
  });

  it('should fetch images', async () => {
    const response = await fetchImages(TEST_URL_ORIGIN, [
      `${TEST_ASSETS_PATH}/1`,
    ]);

    expect(
      response.map((res) => Buffer.from(res.data).buffer),
    ).toEqual([expectedImage.buffer]);
  });
});
