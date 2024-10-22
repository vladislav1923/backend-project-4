import File from './file.js';
import { MOCKED_FULL_URL, MOCKED_URL_ORIGIN, MOCKED_URL_PATH } from '../../__tests__/constants.js';

describe('File Class', () => {
  it('should convert path to file name', () => {
    expect(File.convertPathToFileName(MOCKED_FULL_URL)).toBe('ru-hexlet-io-courses');
  });

  it('should check if the path is from the same domain', () => {
    expect(File.isTheSameDomain(MOCKED_FULL_URL, MOCKED_URL_ORIGIN)).toBeTruthy();
    expect(File.isTheSameDomain(MOCKED_FULL_URL, 'https://google.com')).toBeFalsy();
  });

  it('should remove domain from the path', () => {
    expect(File.removeDomain(MOCKED_FULL_URL, MOCKED_URL_ORIGIN)).toBe(MOCKED_URL_PATH);
  });

  it('should generate a new path to the file', () => {
    const cases = [
      {
        instance: new File('/assets/application.css', 'stylesheet'),
        expectedPath: 'ru-hexlet-io-courses_files/ru-hexlet-io-assets-application.css',
      },
      {
        instance: new File('/courses', 'canonical'),
        expectedPath: 'ru-hexlet-io-courses_files/ru-hexlet-io-courses.html',
      },
      {
        instance: new File('https://ru.hexlet.io/packs/js/runtime.js', 'script'),
        expectedPath: 'ru-hexlet-io-courses_files/ru-hexlet-io-packs-js-runtime.js',
      },
    ];

    const assetsDir = `${File.convertPathToFileName(MOCKED_FULL_URL)}_files`;

    // eslint-disable-next-line no-restricted-syntax
    for (const { instance, expectedPath } of cases) {
      expect(instance.getNewPath(MOCKED_URL_ORIGIN, assetsDir)).toBe(expectedPath);
    }
  });
});
