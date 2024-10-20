import process from 'node:process';
import { Command } from 'commander';
import Page from './page.js';

const cli = new Command();

cli
  .version('1.0.0')
  .usage('[options] <url>')
  .description('Page loader utility.')
  .option('-o, --output [dir]', 'output dir', process.cwd());

cli
  .arguments('<url>')
  .action((url, { output }) => {
    const page = new Page(url);
    page.load(output)
      .then((filePath) => {
        console.log(`open ${filePath}`);
      })
      .catch((error) => {
        console.error(error);
        process.exit();
      });
  });

cli.parse();

export default cli;
