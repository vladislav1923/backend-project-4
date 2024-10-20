import { promises as fs } from 'fs';
import path from 'path';
import nock from 'nock';
import { fetchFile, fetchImages } from './http.js';
import {
  INITIAL_FILE_NAME, ASSETS_PATH, IMAGE_1_NAME, URL_ORIGIN, URL_PATH,
} from '../../__tests__/constants.js';

const TEST_FILE_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${INITIAL_FILE_NAME}`);
const TEST_IMAGE_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${IMAGE_1_NAME}`);

let expectedHtml;
let expectedImage;

describe('HTTP Utils', () => {
  beforeAll(async () => {
    expectedHtml = await fs.readFile(TEST_FILE_PATH, 'utf-8');
    expectedImage = await fs.readFile(TEST_IMAGE_PATH);

    nock(URL_ORIGIN)
      .get(URL_PATH)
      .reply(200, expectedHtml)
      .get(new RegExp(`${ASSETS_PATH}/\\d+`))
      .reply(200, expectedImage);
  });

  it('should fetch files', async () => {
    const response = await fetchFile(`${URL_ORIGIN}${URL_PATH}`);

    expect(response.data).toEqual(expectedHtml);
  });

  it('should fetch images', async () => {
    const response = await fetchImages(URL_ORIGIN, [
      `${ASSETS_PATH}/1`,
    ]);

    expect(
      response.map((res) => Buffer.from(res.data).buffer),
    ).toEqual([expectedImage.buffer]);
  });
});
