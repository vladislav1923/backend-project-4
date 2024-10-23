import { promises as fs } from 'fs';
import nock from 'nock';
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
  RUNTIME_SCRIPT_FILE_PATH, TEMP_DIR_PATH, NOT_EXISTENT_PATH,
} from '../__tests__/constants.js';
import loader from './loader.js';

describe('Loader', () => {
  it('should load a page', async () => {
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

    await loader(MOCKED_FULL_URL, TEMP_DIR_PATH);

    const downloadedHtml = await fs.readFile(`${TEMP_DIR_PATH}/ru-hexlet-io-courses.html`, 'utf-8');

    expect(downloadedHtml).toEqual(processedHtml);
  });

  it('should handle error during the root html file uploading', async () => {
    nock(MOCKED_URL_ORIGIN)
      .get(MOCKED_URL_PATH)
      .reply(500, { error: 'Not Found' });

    return expect(loader(MOCKED_FULL_URL, TEMP_DIR_PATH))
      .rejects.toThrow('Failed to download the root HTML file: Request failed with status code 500');
  });

  it('should handle error during images uploading', async () => {
    const expectedHtml = await fs.readFile(INITIAL_HTML_FILE_PATH, 'utf-8');

    nock(MOCKED_URL_ORIGIN)
      .get(MOCKED_URL_PATH)
      .reply(200, expectedHtml)
      .get(MOCKED_PNG_FILE_PATH)
      .reply(404, { error: 'Not Found' });

    return expect(loader(MOCKED_FULL_URL, TEMP_DIR_PATH))
      .rejects.toThrow('Failed to download images: Request failed with status code 404');
  });

  it('should handle error if a path does not exist', async () => {
    const expectedErrorMessage = `The output directory does not exist: ${NOT_EXISTENT_PATH}`;

    return expect(loader(MOCKED_FULL_URL, NOT_EXISTENT_PATH))
      .rejects.toThrow(expectedErrorMessage);
  });
});
