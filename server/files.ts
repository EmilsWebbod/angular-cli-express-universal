const fs = require('fs');
const path = require('path');
const _ = require('ramda');
import { IO } from './utils/functors';

export namespace Folders {
  export const dist = path.join(__dirname, '..', 'dist', 'browser');
  export const server = path.join(__dirname, '..', 'dist', 'server');
}

export namespace Files {

  export const readFile: (filename: string) => IO<any> = filename => {
    return new IO(() => fs.readFileSync(filename, 'utf8'));
  };

  export const readDir: (dir: string) => IO<any> = function(dir) {
    return new IO(() => fs.readdirSync(dir) );
  };

  export const fromServer = file => path.join(__dirname, '..', 'dist', 'server', file);
  export const fromDist = file => path.join(__dirname, '..', 'dist', 'browser', file);

  export const getFileFromDist: (Function) => IO<any> =
    _.compose(Files.readFile, Files.fromDist);
}
