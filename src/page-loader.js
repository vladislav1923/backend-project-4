import axios from 'axios';
import { promises as fs } from 'fs';

const fetchFile = (url) => {
    return axios.get(url);
}

const writeFile = (pathName, data) => {
    return fs.writeFile(pathName, data);
}

const getFileName = (url) => {
    const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
    const urlWithoutSpecialChars = urlWithoutProtocol.replace(/\W/g, '-');
    return `${urlWithoutSpecialChars}.html`;
}

const pageLoader = (url, output) => {
    const fileName = getFileName(url);
    const pathName = `${output}/${fileName}`;

    return fetchFile(url).then((response) => {
            return response.data;
        })
        .then((data) => {
            return writeFile(pathName, data);
        })
        .then(() => {
            return pathName;
        })
        .catch((error) => {
            console.error(error);
        });
};

export default pageLoader;
