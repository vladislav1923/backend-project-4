import axios from 'axios';
import 'axios-debug-log';

const fetchFile = (url) => axios.get(url);

const fetchImages = (origin, paths) => Promise
  .all(paths.map((path) => axios.get(`${origin}${path}`, { responseType: 'arraybuffer' })))
  .then((responses) => responses.map(({ data }, i) => ({
    data,
    path: paths[i],
  })));

const fetchTextAssets = (origin, paths) => Promise
  .all(paths.map((path) => axios.get(`${origin}${path}`)))
  .then((responses) => responses.map(({ data }, i) => ({
    data,
    path: paths[i],
  })));

export { fetchFile, fetchImages, fetchTextAssets };
