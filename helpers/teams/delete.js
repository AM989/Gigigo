#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */
  const valida = require('../../utils/validations')();
  const Teams = require('../../modulos/teams/models').Teams;

  function deleteTeam(id) {
    let eliminar = {};
    let errores = {};

    return new Promise((resolve, reject) => {
      if(valida.requerido.regex.test(id)){
          errores['id'] = {error: valida.requerido.error};
      } else {
          if(valida.numerico.regex.test(id)){
              delete errores['id'];
              eliminar.id = id;
          } else {
              errores['id'] = {error: valida.numerico.error};
              errores['status'] = 400;
          }
      }

      if(Object.keys(eliminar).length === 1){
        Teams.findByIdAndRemove({_id: eliminar.id}, (err, doc) => {
          if(err) return reject(err);
          if(doc === null) return reject({error: 'Registro no encontrado', status: 404});
          return resolve(doc);
        });
      } else {
          return reject(errores);
      }
    });
  };

  module.exports = deleteTeam;
})();
