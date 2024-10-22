import axios from 'axios';
import 'axios-debug-log';
import logger from './logger.js';

const fetchFile = (url) => {
  logger(`${url} - started fetching a text file`);
  return axios.get(url)
    .then((response) => {
      logger(`${url} - the text file has been fetched successfully`);
      return response;
    });
};

const fetchImage = (url) => {
  logger(`${url} - started fetching an image`);
  return axios.get(url, { responseType: 'arraybuffer' })
    .then((response) => {
      logger(`${url} - the image has been fetched successfully`);
      return response;
    });
};

export {
  fetchFile, fetchImage,
};
