import path from 'path';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

export const TEMP_DIR_PATH = path.join(__dirname, 'tmp');

export const MOCKED_URL_ORIGIN = 'https://ru.hexlet.io';
export const MOCKED_URL_PATH = '/courses';
export const MOCKED_FULL_URL = `${MOCKED_URL_ORIGIN}${MOCKED_URL_PATH}`;

export const MOCKED_PNG_FILE_PATH = '/assets/professions/nodejs.png';
export const MOCKED_STYLES_FILE_PATH = '/assets/application.css';
export const MOCKED_CANONICAL_HTML_FILE_PATH = '/courses';
export const MOCKED_RUNTIME_SCRIPT_FILE_PATH = '/packs/js/runtime.js';

export const LOADED_PNG_FILE_PATH = 'ru-hexlet-io-courses_files/ru-hexlet-io-assets-professions-nodejs.png';
export const LOADED_STYLES_FILE_PATH = 'ru-hexlet-io-courses_files/ru-hexlet-io-assets-application.css';
export const LOADED_CANONICAL_HTML_FILE_PATH = 'ru-hexlet-io-courses_files/ru-hexlet-io-courses.html';
export const LOADED_RUNTIME_SCRIPT_FILE_PATH = 'ru-hexlet-io-courses_files/ru-hexlet-io-packs-js-runtime.js';

export const INITIAL_HTML_FILE_PATH = getFixturePath('initial-file.html');
export const LOADED_HTML_FILE_PATH = getFixturePath('processed-file.html');
export const RUNTIME_SCRIPT_FILE_PATH = getFixturePath('runtime.js');
export const STYLES_FILE_PATH = getFixturePath('styles.css');
export const PNG_FILE_PATH = getFixturePath('image.png');
export const JPG_FILE_PATH = getFixturePath('image.jpg');
