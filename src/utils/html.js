import * as cheerio from 'cheerio';
import { getPaths } from './url.js';

const EXTENSIONS = ['jpg', 'jpeg', 'png'];

const getImagesPaths = (file) => {
  const $ = cheerio.load(file);

  const urls = $('img')
    .filter((index, image) => {
      const src = $(image).attr('src');
      return EXTENSIONS.some((ext) => src.endsWith(ext));
    })
    .map((index, image) => $(image).attr('src')).get();

  return getPaths(urls);
};

const rewriteImagesPaths = (file, images) => {
  let newFile = file;
  images.forEach((image) => {
    newFile = newFile.replace(image.path, image.newPath);
  });

  return newFile;
};

export { getImagesPaths, rewriteImagesPaths };
