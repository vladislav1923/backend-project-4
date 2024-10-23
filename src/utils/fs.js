import path from 'path';
import { promises as fs } from 'fs';

const writeFile = async (pathName, data, extension = 'text') => {
  let file = data;

  if (extension === 'json') {
    file = JSON.stringify(data);
  }

  const dir = path.dirname(pathName);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(pathName, file);

  return file;
};

const checkPathExists = async (output) => fs.access(output)
  .catch(() => {
    throw new Error(`The output directory does not exist: ${output}`);
  });

export { writeFile, checkPathExists };
