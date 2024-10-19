import process from 'node:process';
import { Command } from 'commander';
import pageLoader from './page-loader.js';

const cli = new Command();

cli
  .version('1.0.0')
  .usage('[options] <url>')
  .description('Page loader utility.')
  .option('-o, --output [dir]', 'output dir', process.cwd());

cli
  .arguments('<url>')
  .action((url, { output }) => {
    pageLoader(url, output).then((fileName) => {
      console.log(`open ${fileName}`);
    });
  });

cli.parse();

export default cli;
