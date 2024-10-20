import { fetchFile, fetchImages, fetchTextAssets } from './utils/http.js';
import {
  getImagesPaths, getLinksPaths, getScriptsPaths, rewriteAssetsPaths,
} from './utils/html.js';
import {
  generateNameByFileName, generateNameByLinkName, generateNameByUrl, getOrigin,
} from './utils/url.js';
import { writeAssets, writeFile } from './utils/fs.js';

class Page {
  url;

  html;

  assets = {
    images: [],
    links: [],
    scripts: [],
  };

  constructor(url) {
    this.url = url;
  }

  async load(output) {
    return this.fetch()
      .then(() => this.update())
      .then(() => this.white(output));
  }

  async fetch() {
    const origin = getOrigin(this.url);
    const assetsDir = `${generateNameByUrl(this.url)}_files`;

    return fetchFile(this.url)
      .then((response) => {
        this.html = response.data;
        const imagesPaths = getImagesPaths(this.html);

        return fetchImages(origin, imagesPaths);
      })
      .then((images) => {
        this.assets.images = images.map((image) => ({
          ...image,
          newPath: `${assetsDir}/${generateNameByFileName(`${origin}${image.path}`)}`,
        }));
      })
      .then(() => {
        const linksPaths = getLinksPaths(this.html);

        return fetchTextAssets(origin, linksPaths);
      })
      .then((links) => {
        this.assets.links = links.map((link) => ({
          ...link,
          newPath: `${assetsDir}/${generateNameByLinkName(origin, link.path)}`,
        }));
      })
      .then(() => {
        const scriptsPaths = getScriptsPaths(this.html, origin);

        return fetchTextAssets('', scriptsPaths);
      })
      .then((scripts) => {
        this.assets.scripts = scripts.map((script) => ({
          ...script,
          newPath: `${assetsDir}/${generateNameByFileName(script.path)}`,
        }));
      });
  }

  async update() {
    return new Promise((resolve) => {
      this.html = rewriteAssetsPaths(this.html, this.assets);
      resolve();
    });
  }

  async white(output) {
    const fileName = `${generateNameByUrl(this.url)}.html`;
    const filePath = `${output}/${fileName}`;
    const allAssets = Object.values(this.assets).flat();

    return writeFile(filePath, this.html)
      .then(() => writeAssets(output, allAssets))
      .then(() => filePath);
  }
}

export default Page;
