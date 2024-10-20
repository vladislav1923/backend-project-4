const generateNameByUrl = (url) => {
  const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
  const urlWithoutSpecialChars = urlWithoutProtocol.replace(/\W/g, '-');
  return `${urlWithoutSpecialChars}`;
};

const generateNameByFileName = (fileName) => {
  const fileNameArr = fileName.split('.');
  const extension = fileNameArr[fileNameArr.length - 1];
  const name = fileNameArr.slice(0, -1).join('.');
  return `${generateNameByUrl(name)}.${extension}`;
};

const getOrigin = (url) => new URL(url).origin;

const getPaths = (urls) => urls.map((url) => (url.startsWith('/') ? url : new URL(url).pathname));

export {
  generateNameByUrl, generateNameByFileName, getOrigin, getPaths,
};
