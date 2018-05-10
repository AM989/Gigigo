#!/usr/bin/env node

;(() => {
	'use strict';

	/* Imports */

	/* Instances */

	/* Funcionalidades */
	function patterns() {
		return {
			requerido: {
				regex: /^\s+$/,
				error: 'Campo requerido'
			},
			texto: {
        regex: /^[a-zA-ZÑáéíóúAÉÍÓÚÑñ.]*$/,
        error: "Sólo caracteres de la A a la Z sin espacios."
      },
			numerico: {
	      regex: /^[0-9]*$/,
	      error: "Ingrese un id valido y que sea numérico."
	    },
      ip_v4: {
        regex: /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/,
        error: 'IPv4 No valida'
      }
		};
	};

  /* Export */
  module.exports = patterns;
})();
