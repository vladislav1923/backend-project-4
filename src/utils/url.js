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

const filterAbsolutes = (urls) => urls.filter((url) => url.startsWith('/'));

const filterTheSameDomain = (urls, domain) => urls.filter((url) => url.startsWith(domain));

export {
  generateNameByUrl, generateNameByFileName, getOrigin, filterAbsolutes, filterTheSameDomain,
};
