'use strict'

const _ = require('ramda');

import {Files, Folders} from '../files';
const index = Files.getFileFromDist('index.html').unsafePerformIO();
import {enableProdMode, ValueProvider} from '@angular/core';

export = app => {
  if (app.get('env') === 'production') {
    console.log('Initializing SSR');
    const getFirst    = _.compose(_.split('.'), _.head, _.filter(_.startsWith('main')));
    const serverFiles = _.compose( _.map(getFirst), Files.readDir, Files.fromServer);
    const main        = serverFiles('').unsafePerformIO();

    const { renderModuleFactory } = require('@angular/platform-server');
    const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
    const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(
      `../../dist/server/main.${main.length > 3 ? main[1] + '.' : ''}bundle.js`
    );
    enableProdMode();

    app.engine('html', (_, options, callback) => {
      const opts = {
        document: index,
        url:      options.req.url,
        extraProviders: [<ValueProvider>{
          provide: 'server_url',
          useValue: `${options.req.protocol}://${options.req.get('host')}`,
          multi: true
        }, provideModuleMap(LAZY_MODULE_MAP)]
      };
      renderModuleFactory(AppServerModuleNgFactory, opts).then(html => {
        callback(null, html);
      });
      console.log('SSR Done');
    });
  } else {
    console.log('Initializing html engine');
    app.engine('html', (_, options, callback) => {
      callback(null, index);
    });
    console.log('Engine Done');
  }

  app.set('views', Folders.dist);
  app.set('view engine', 'html');
};
