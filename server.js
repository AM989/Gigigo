#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */
  const morgan = require('morgan');
  const express = require('express');
  const cors = require('./utils/cors');
  const bodyParser = require('body-parser');
  const database = require('./database/mongodb');
  const interfaces = require('./utils/interfaces')();

  /* Instances */
  const app = express();
  const server = require('http').createServer(app);

  /* Connection database */
  database('teams');

  /* Middleares */
  app.use(cors);
  app.use(morgan('combined'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

  /* APIS */
  let INSTALL_APP = [
    {prefix: 'teams', app: 'modulos/teams'}
  ];

  INSTALL_APP.forEach((elemento, indice) => {
    let prefix;
    let app_pro = require('./'+ elemento.app +'/urls');

    prefix = elemento.prefix;
    if(elemento.prefix === '') prefix = elemento.app;
    else prefix = '/' + elemento.prefix;

    app.use(prefix, app_pro);
    app.set('views', __dirname + elemento.app.replace(/\//g, '\\'));
  });

  /* Events */
  server.listen(interfaces.port).on('error', (error) => {
		if(error) throw new Error(error);
	});

	server.on('listening', () => console.log('Servidor http corriendo en: http://%s:%s', interfaces.host, interfaces.port));
})();
