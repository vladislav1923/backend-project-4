import * as cheerio from 'cheerio';
import File from './file-model.js';

const IMAGES_EXTENSIONS = ['jpg', 'jpeg', 'png'];

const getImagesPaths = (file) => {
  const $ = cheerio.load(file);

  return $('img')
    .filter((index, image) => {
      const src = $(image).attr('src');
      return IMAGES_EXTENSIONS.some((ext) => src.endsWith(ext));
    })
    .map((index, image) => new File($(image).attr('src'), 'image'))
    .get()
    .filter((image) => File.isRelative(image.getPath()));
};

const getLinksPaths = (file) => {
  const $ = cheerio.load(file);

  return $('link')
    .map((index, link) => new File($(link).attr('href'), $(link).attr('rel')))
    .get()
    .filter((link) => File.isRelative(link.getPath()));
};

const getScriptsPaths = (file, domain) => {
  const $ = cheerio.load(file);

  return $('script')
    .filter((index, script) => !!$(script).attr('src'))
    .map((index, script) => new File($(script).attr('src'), 'script'))
    .get()
    .filter((script) => File.isTheSameDomain(script.getPath(), domain));
};

const rewriteAssetsPaths = (file, images, assets, origin, assetsDir) => {
  let newFile = file;

  images.forEach((image) => {
    newFile = newFile.replace(image.getPath(), image.getNewPath(origin, assetsDir));
  });

  assets.forEach((link) => {
    newFile = newFile.replace(link.getPath(), link.getNewPath(origin, assetsDir));
  });

  return newFile;
};

export {
  getImagesPaths, rewriteAssetsPaths, getLinksPaths, getScriptsPaths,
};
