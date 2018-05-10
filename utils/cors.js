#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */

  /* Variables */

  /* Funcinalidades */

  /* Intercambio de recursos de origen cruzado */
  /*
   * Permite al servidor describir el conjunto
   * de orígenes que tienen permiso de acceder
   * a los recursos seleccionados en un origen
   * distinto al que pertenece.
  */
  function accessControlAllowOrigin(request, response, next) {
  	response.header('Access-Control-Allow-Origin', '*'); /* Origenes */
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS'); /* Recursos */
    response.header('Access-Control-Allow-Headers', '*'); /* Cabecera */
    response.header('Access-Control-Allow-Credentials', true);
  	next();
  };

  module.exports = accessControlAllowOrigin;
})();
