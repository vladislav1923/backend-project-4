import { join } from 'path';

class FileModel {
  static convertPathToFileName(path) {
    const urlWithoutProtocol = path.replace(/^https?:\/\//, '');
    const urlWithoutSpecialChars = urlWithoutProtocol.replace(/\W/g, '-');

    return `${urlWithoutSpecialChars}`;
  }

  static isTheSameDomain(path, domain) {
    return path.startsWith(domain);
  }

  static isRelative(path) {
    return path.startsWith('/');
  }

  static removeDomain(path, domain) {
    return path.replace(domain, '');
  }

  constructor(path, type) {
    this.path = path;
    this.type = type;
    this.extension = path.split('.').pop() ?? null;
  }

  getPath() {
    return this.path;
  }

  getURL(origin) {
    if (FileModel.isRelative(this.path)) {
      return join(origin, this.path);
    }

    return this.path;
  }

  getExtension() {
    return this.extension;
  }

  getData() {
    return this.data;
  }

  getNewPath(origin, assetsDir) {
    let processingPath = this.path;

    if (this.type === 'canonical') {
      return join(assetsDir, `${FileModel.convertPathToFileName(`${origin}${processingPath}`)}.html`);
    }

    if (FileModel.isTheSameDomain(processingPath, origin)) {
      processingPath = FileModel.removeDomain(processingPath, origin);
    }

    const fileNameArr = processingPath.split('.');
    const extension = fileNameArr[fileNameArr.length - 1];
    const name = fileNameArr.slice(0, -1).join('.');

    return join(assetsDir, `${FileModel.convertPathToFileName(`${origin}${name}`)}.${extension}`);
  }

  setData(data) {
    this.data = data;
  }
}

export default FileModel;
