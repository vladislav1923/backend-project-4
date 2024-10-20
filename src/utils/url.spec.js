import {
  generateNameByFileName, generateNameByUrl, getOrigin, getPaths,
} from './url.js';

describe('URL Utils', () => {
  it('should generate name by url', () => {
    const url = 'https://ru.hexlet.io/courses';
    const expected = 'ru-hexlet-io-courses';
    const received = generateNameByUrl(url);
    expect(received).toBe(expected);
  });

  it('should generate name by file name', () => {
    const fileName = 'ru.hexlet.io/assets/professions/nodejs.png';
    const expected = 'ru-hexlet-io-assets-professions-nodejs.png';
    const received = generateNameByFileName(fileName);
    expect(received).toBe(expected);
  });

  it('should get origin', () => {
    const url = 'https://ru.hexlet.io/courses';
    const expected = 'https://ru.hexlet.io';
    const received = getOrigin(url);
    expect(received).toBe(expected);
  });

  it('should get paths', () => {
    const urls = ['https://ru.hexlet.io/courses', '/assets/professions/nodejs.png'];
    const expected = ['/courses', '/assets/professions/nodejs.png'];
    const received = getPaths(urls);
    expect(received).toEqual(expected);
  });
});
