import {
  generateNameByFileName, generateNameByUrl, getOrigin, filterAbsolutes, filterTheSameDomain, generateNameByLinkName,
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

  it('should filter absolutes', () => {
    const urls = [
      { href: '/assets/professions/nodejs.png', rel: 'stylesheet' },
      { href: 'https://cdn2.hexlet.io/assets/menu.css', rel: 'stylesheet' },
    ];
    const expected = [{ href: '/assets/professions/nodejs.png', rel: 'stylesheet' }];
    const received = filterAbsolutes(urls);
    expect(received).toEqual(expected);
  });

  it('should filter the same domain', () => {
    const urls = ['/assets/professions/nodejs.png', 'https://ru.hexlet.io/courses'];
    const domain = 'https://ru.hexlet.io';
    const expected = ['https://ru.hexlet.io/courses'];
    const received = filterTheSameDomain(urls, domain);
    expect(received).toEqual(expected);
  });

  it('should generate name by link name', () => {
    const origin = 'https://ru.hexlet.io';
    const path = '/courses';
    const expected = 'ru-hexlet-io-courses.html';
    const received = generateNameByLinkName(origin, path);
    expect(received).toBe(expected);
  });
});
