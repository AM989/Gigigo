#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */
  const express = require('express');
  const views = require('./views');
  const multer = require('multer');

  /* Variables */

  /* Objects */
  const router = express.Router();
  const upload = multer({ dest: './uploads/' });

  /* Funcionalidades */
  router.post('/', views.create);
  router.get('/', views.read);
  router.get('/:id', views.readId);
  router.put('/:id', views.update);
  router.delete('/:id', views.delete);

  /* Exports */
  module.exports = router;
})();
