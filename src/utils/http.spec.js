import { promises as fs } from 'fs';
import nock from 'nock';
import path from 'path';
import { fetchFile, fetchImage } from './http.js';
import {
  INITIAL_HTML_FILE_PATH,
  PNG_FILE_PATH,
  MOCKED_URL_ORIGIN,
  MOCKED_URL_PATH,
  MOCKED_PNG_FILE_PATH,
} from '../../__tests__/constants.js';

describe('HTTP Utils', () => {
  it('should fetch files', async () => {
    const expectedHtml = await fs.readFile(INITIAL_HTML_FILE_PATH, 'utf-8');

    nock(MOCKED_URL_ORIGIN)
      .get(MOCKED_URL_PATH)
      .reply(200, expectedHtml);

    const response = await fetchFile(`${MOCKED_URL_ORIGIN}${MOCKED_URL_PATH}`);

    expect(response.data).toEqual(expectedHtml);
  });

  it('should fetch images', async () => {
    const expectedHtml = await fs.readFile(INITIAL_HTML_FILE_PATH, 'utf-8');
    const expectedImage = await fs.readFile(PNG_FILE_PATH);

    nock(MOCKED_URL_ORIGIN)
      .get(MOCKED_URL_PATH)
      .reply(200, expectedHtml)
      .get(MOCKED_PNG_FILE_PATH)
      .reply(200, expectedImage);

    const response = await fetchImage(path.join(MOCKED_URL_ORIGIN, MOCKED_PNG_FILE_PATH));

    expect(Buffer.from(response.data).buffer).toEqual(expectedImage.buffer);
  });
});
