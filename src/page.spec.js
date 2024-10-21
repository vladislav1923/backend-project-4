import path from 'path';
import { promises as fs } from 'fs';
import nock from 'nock';
import Page from './page.js';
import {
  INITIAL_HTML_FILE_PATH,
  LOADED_HTML_FILE_PATH,
  MOCKED_PNG_FILE_PATH,
  MOCKED_FULL_URL,
  MOCKED_URL_ORIGIN,
  MOCKED_URL_PATH,
  STYLES_FILE_PATH,
  MOCKED_STYLES_FILE_PATH,
  MOCKED_CANONICAL_HTML_FILE_PATH,
  PNG_FILE_PATH,
  MOCKED_RUNTIME_SCRIPT_FILE_PATH,
  RUNTIME_SCRIPT_FILE_PATH, TEMP_DIR_PATH,
} from '../__tests__/constants.js';

describe('Page', () => {
  it('should load page', async () => {
    const expectedHtml = await fs.readFile(INITIAL_HTML_FILE_PATH, 'utf-8');
    const processedHtml = await fs.readFile(LOADED_HTML_FILE_PATH, 'utf-8');
    const expectedImage = await fs.readFile(PNG_FILE_PATH);
    const expectedStyles = await fs.readFile(STYLES_FILE_PATH);
    const expectedScript = await fs.readFile(RUNTIME_SCRIPT_FILE_PATH);

    nock(MOCKED_URL_ORIGIN)
      .get(MOCKED_URL_PATH)
      .reply(200, expectedHtml)
      .get(MOCKED_PNG_FILE_PATH)
      .reply(200, expectedImage)
      .get(MOCKED_STYLES_FILE_PATH)
      .reply(200, expectedStyles)
      .get(MOCKED_CANONICAL_HTML_FILE_PATH)
      .reply(200, expectedHtml)
      .get(MOCKED_RUNTIME_SCRIPT_FILE_PATH)
      .reply(200, expectedScript);

    await new Page(MOCKED_FULL_URL).load(TEMP_DIR_PATH);
    const downloadedHtml = await fs.readFile(`${TEMP_DIR_PATH}/ru-hexlet-io-courses.html`, 'utf-8');

    expect(downloadedHtml).toEqual(processedHtml);
  });
});
