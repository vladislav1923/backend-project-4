import axios from 'axios';
import { promises as fs } from 'fs';

const fetchFile = (url) => axios.get(url);

const writeFile = (pathName, data) => fs.writeFile(pathName, data);

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
