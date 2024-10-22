import process from 'node:process';
import { Command } from 'commander';
import loader from './loader.js';

const cli = new Command();

cli
  .version('1.0.0')
  .usage('[options] <url>')
  .description('Page loader utility.')
  .option('-o, --output [dir]', 'output dir', process.cwd());

cli
  .arguments('<url>')
  .action((url, { output }) => {
    loader(url, output)
      .catch((e) => {
        console.error('Something went wrong. \n', e);
        process.exit();
      });
  });

cli.parse();

export default cli;
