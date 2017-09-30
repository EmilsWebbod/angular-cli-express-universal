'use strict';

import {Folders} from '../utils/files';
const gzipStatic = require('connect-gzip-static');
const router = require('express').Router();

router.get('*.*', gzipStatic(Folders.dist));

router.get('*', (req, res) => {
  res.render('index', {req, res});
});

module.exports = router;
