import * as cheerio from 'cheerio';
import { filterAbsolutes, filterTheSameDomain } from './url.js';

const IMAGES_EXTENSIONS = ['jpg', 'jpeg', 'png'];

const getImagesPaths = (file) => {
  const $ = cheerio.load(file);

  const urls = $('img')
    .filter((index, image) => {
      const src = $(image).attr('src');
      return IMAGES_EXTENSIONS.some((ext) => src.endsWith(ext));
    })
    .map((index, image) => $(image).attr('src')).get();

  return filterAbsolutes(urls);
};

const rewriteAssetsPaths = (file, assets) => {
  let newFile = file;

  assets.images.forEach((image) => {
    newFile = newFile.replace(image.path, image.newPath);
  });

  assets.links.forEach((link) => {
    newFile = newFile.replace(link.path, link.newPath);
  });

  assets.scripts.forEach((script) => {
    newFile = newFile.replace(script.path, script.newPath);
  });

  return newFile;
};

const getLinksPaths = (file) => {
  const $ = cheerio.load(file);

  const urls = $('link')
    .map((index, link) => $(link).attr('href')).get();

  return filterAbsolutes(urls);
};

const getScriptsPaths = (file, domain) => {
  const $ = cheerio.load(file);

  const urls = $('script')
    .map((index, script) => $(script).attr('src')).get();

  return filterTheSameDomain(urls, domain);
};

export {
  getImagesPaths, rewriteAssetsPaths, getLinksPaths, getScriptsPaths,
};
