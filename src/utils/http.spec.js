import { promises as fs } from 'fs';
import path from 'path';
import nock from 'nock';
import { fetchFile, fetchImages, fetchTextAssets } from './http.js';
import {
  INITIAL_FILE_NAME, ASSETS_PATH, IMAGE_1_NAME, URL_ORIGIN, URL_PATH, STYLES_FILE_NAME, CSS_PATH, CANONICAL_PATH,
} from '../../__tests__/constants.js';

const TEST_FILE_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${INITIAL_FILE_NAME}`);
const TEST_IMAGE_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${IMAGE_1_NAME}`);
const TEST_STYLES_PATH = path.join(__dirname, `../../__tests__/__fixtures__/${STYLES_FILE_NAME}`);

describe('HTTP Utils', () => {
  it('should fetch files', async () => {
    const expectedHtml = await fs.readFile(TEST_FILE_PATH, 'utf-8');

    nock(URL_ORIGIN)
      .get(URL_PATH)
      .reply(200, expectedHtml);

    const response = await fetchFile(`${URL_ORIGIN}${URL_PATH}`);

    expect(response.data).toEqual(expectedHtml);
  });

  it('should fetch images', async () => {
    const expectedHtml = await fs.readFile(TEST_FILE_PATH, 'utf-8');
    const expectedImage = await fs.readFile(TEST_IMAGE_PATH);

    nock(URL_ORIGIN)
      .get(URL_PATH)
      .reply(200, expectedHtml)
      .get(new RegExp(`${ASSETS_PATH}/\\d+`))
      .reply(200, expectedImage);

    const response = await fetchImages(URL_ORIGIN, [
      `${ASSETS_PATH}/1`,
    ]);

    expect(
      response.map((res) => Buffer.from(res.data).buffer),
    ).toEqual([expectedImage.buffer]);
  });

  it('should fetch styles and canonicals', async () => {
    const expectedHtml = await fs.readFile(TEST_FILE_PATH, 'utf-8');
    const expectedStyles = await fs.readFile(TEST_STYLES_PATH);

    nock(URL_ORIGIN)
      .get(URL_PATH)
      .reply(200, expectedHtml)
      .get(CSS_PATH)
      .reply(200, expectedStyles)
      .get(CANONICAL_PATH)
      .reply(200, expectedHtml);

    const response = await fetchTextAssets(URL_ORIGIN, [
      CSS_PATH,
      CANONICAL_PATH,
    ]);

    expect(Buffer.from(response[0].data).buffer).toEqual(expectedStyles.buffer);
    expect(response[0].path).toBe(CSS_PATH);
    expect(response[1].data).toEqual(expectedHtml);
    expect(response[1].path).toBe(CANONICAL_PATH);
  });
});
