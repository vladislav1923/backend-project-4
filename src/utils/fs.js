import path from 'path';
import { promises as fs } from 'fs';

const writeFile = async (pathName, data) => {
  const dir = path.dirname(pathName);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(pathName, data, 'utf-8');
  return data;
};

const writeImages = async (output, images) => {
  const promises = images.map(({ newPath, data }) => writeFile(`${output}/${newPath}`, data));
  await Promise.all(promises);

  return images;
};

export { writeFile, writeImages };
