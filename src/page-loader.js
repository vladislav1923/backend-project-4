import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';

const fetchFile = (url) => axios.get(url);

const writeFile = async (pathName, data) => {
  const dir = path.dirname(pathName);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(pathName, data, 'utf-8');
};

const getFileName = (url) => {
  const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
  const urlWithoutSpecialChars = urlWithoutProtocol.replace(/\W/g, '-');
  return `${urlWithoutSpecialChars}.html`;
};

const pageLoader = (url, output) => {
  const fileName = getFileName(url);
  const pathName = `${output}/${fileName}`;

  return fetchFile(url).then((response) => response.data)
    .then((data) => writeFile(pathName, data))
    .then(() => pathName)
    .catch((error) => {
      console.error(error);
    });
};

export default pageLoader;
