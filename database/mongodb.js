#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */
  const mongoose = require('mongoose');

  /* Funcinalidades */
  function connection(database) {
    /* Closure */
    function pool() {
      /* Variables */

      /* Objects */
      let options = {
        poolSize: 1,
        keepAlive: 10000,
        autoReconnect: true,
        connectTimeoutMS: 10000
      };

      mongoose.connect('mongodb://127.0.0.1:27017/' + database, options);
    };

    pool();
    mongoose.connection.on('connected', () => console.log('Mongoose connection database: ' + database));
    mongoose.connection.on('error', (err) => console.log('Mongoose connection error: ' + err));
    mongoose.connection.on('disconnected', pool);
  };

  /* Exports */
  module.exports = connection;
})();
