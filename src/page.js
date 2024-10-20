import { fetchFile, fetchImages } from './utils/http.js';
import { getImagesPaths, rewriteImagesPaths } from './utils/html.js';
import { generateNameByFileName, generateNameByUrl, getOrigin } from './utils/url.js';
import { writeFile, writeImages } from './utils/fs.js';

class Page {
  url;

  html;

  images;

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

    return fetchFile(this.url)
      .then((response) => {
        this.html = response.data;
        const imagesPaths = getImagesPaths(this.html);

        return fetchImages(origin, imagesPaths);
      })
      .then((images) => {
        const imagesDir = `${generateNameByUrl(this.url)}_files`;
        this.images = images.map((image) => ({
          ...image,
          newPath: `${imagesDir}/${generateNameByFileName(`${origin}${image.path}`)}`,
        }));
      });
  }

  async update() {
    return new Promise((resolve) => {
      this.html = rewriteImagesPaths(this.html, this.images);
      resolve();
    });
  }

  async white(output) {
    const fileName = `${generateNameByUrl(this.url)}.html`;
    const filePath = `${output}/${fileName}`;

    return writeFile(filePath, this.html)
      .then(() => writeImages(output, this.images))
      .then(() => filePath);
  }
}

export default Page;
