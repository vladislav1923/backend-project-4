import Listr from 'listr';
import path from 'path';
import {
  fetchFile, fetchImage,
} from './utils/http.js';
import {
  getImagesPaths, getLinksPaths, getScriptsPaths, rewriteAssetsPaths,
} from './utils/html.js';
import writeFile from './utils/fs.js';
import File from './utils/file.js';

const tasks = new Listr([
  {
    title: 'Uploading the root HTML file',
    task: (ctx) => fetchFile(ctx.url).then((response) => {
      ctx.rootHTML = response.data;
    }).catch((error) => {
      throw new Error(`Failed to download the root HTML file: ${error.message}`);
    }),
  },
  {
    title: 'Uploading nested images hosted on the same domain',
    task: (ctx) => {
      const images = getImagesPaths(ctx.rootHTML);
      return Promise.all(
        images.map((image, i) => fetchImage(`${ctx.origin}${image.getPath()}`)
          .then((response) => {
            images[i].setData(response.data);
          })),
      ).then(() => {
        ctx.images = images;
      }).catch((error) => {
        throw new Error(`Failed to download images: ${error.message}`);
      });
    },
  },
  {
    title: 'Uploading scripts, styles, .etc',
    task: (ctx) => {
      const scriptsPaths = getScriptsPaths(ctx.rootHTML, ctx.origin);
      const linksPaths = getLinksPaths(ctx.rootHTML);
      const assets = [...scriptsPaths, ...linksPaths];

      return Promise.all(
        assets.map((asset, i) => fetchFile(asset.getURL(ctx.origin))
          .then((response) => {
            assets[i].setData(response.data);
          })),
      ).then(() => {
        ctx.assets = assets;
      }).catch((error) => {
        throw new Error(`Failed to download assets: ${error.message}`);
      });
    },
  },
  {
    title: 'Applying paths changes to the root HTML file',
    task: (ctx) => {
      ctx.rootHTML = rewriteAssetsPaths(
        ctx.rootHTML,
        ctx.images,
        ctx.assets,
        ctx.origin,
        ctx.assetsDir,
      );
    },
  },
  {
    title: 'Saving the root HTML file to the file system',
    task: (ctx) => writeFile(path.join(ctx.output, ctx.rootHTMLFileName), ctx.rootHTML)
      .catch((error) => {
        throw new Error(`Failed to write the root HTML file to the file system: ${error.message}`);
      }),
  },
  {
    title: 'Saving additional files to the file system',
    task: (ctx) => {
      const assets = [...ctx.images, ...ctx.assets];

      return Promise.all(
        assets.map((asset) => {
          const newPath = path.join(ctx.output, asset.getNewPath(ctx.origin, ctx.assetsDir));
          return writeFile(newPath, asset.getData(), asset.getExtension());
        }),
      ).catch((error) => {
        throw new Error(`Failed to write additional files to the file system: ${error.message}`);
      });
    },
  },
]);

export default function loader(url, output) {
  const rootHTMLFileName = `${File.convertPathToFileName(url)}.html`;

  return tasks.run({
    url,
    output,
    origin: new URL(url).origin,
    assetsDir: `${File.convertPathToFileName(url)}_files`,
    rootHTMLFileName,
    rootHTML: null,
    images: [],
    assets: [],
  }).then(() => {
    console.log(`open ${path.join(output, rootHTMLFileName)}`);
  }).catch((e) => {
    console.error(e);
    throw e;
  });
}
