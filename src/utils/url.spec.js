import {
  generateNameByFileName,
  generateNameByUrl,
  getOrigin,
  filterAbsolutes,
  filterTheSameDomain,
  generateNameByLinkName,
} from './url.js';
import {
  MOCKED_FULL_URL,
  MOCKED_PNG_FILE_PATH,
  MOCKED_URL_ORIGIN,
  MOCKED_URL_PATH,
} from '../../__tests__/constants.js';

describe('URL Utils', () => {
  it('should generate name by url', () => {
    const url = MOCKED_FULL_URL;
    const expected = 'ru-hexlet-io-courses';
    const received = generateNameByUrl(url);
    expect(received).toBe(expected);
  });

  it('should generate name by file name', () => {
    const fileName = `${MOCKED_URL_ORIGIN}${MOCKED_PNG_FILE_PATH}`;
    const expected = 'ru-hexlet-io-assets-professions-nodejs.png';
    const received = generateNameByFileName(fileName);
    expect(received).toBe(expected);
  });

  it('should get origin', () => {
    const url = MOCKED_FULL_URL;
    const expected = MOCKED_URL_ORIGIN;
    const received = getOrigin(url);
    expect(received).toBe(expected);
  });

  it('should filter absolutes', () => {
    const urls = [
      MOCKED_PNG_FILE_PATH,
      'https://cdn2.hexlet.io/assets/menu.css',
    ];
    const expected = [MOCKED_PNG_FILE_PATH];
    const received = filterAbsolutes(urls);
    expect(received).toEqual(expected);
  });

  it('should filter the same domain', () => {
    const urls = [MOCKED_PNG_FILE_PATH, MOCKED_FULL_URL];
    const domain = MOCKED_URL_ORIGIN;
    const expected = [MOCKED_FULL_URL];
    const received = filterTheSameDomain(urls, domain);
    expect(received).toEqual(expected);
  });

  it('should generate name by link name', () => {
    const origin = MOCKED_URL_ORIGIN;
    const path = MOCKED_URL_PATH;
    const expected = 'ru-hexlet-io-courses.html';
    const received = generateNameByLinkName(origin, path);
    expect(received).toBe(expected);
  });
});
