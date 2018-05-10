#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */
  const valida = require('../../utils/validations')();
  const Teams = require('../../modulos/teams/models').Teams;

  function updateTeam(id, name) {
    let actualizar = {};
    let errores = {};

    return new Promise((resolve, reject) => {
      let update_at;
      if(id === undefined || valida.requerido.regex.test(id)){
          errores['id'] = {error: valida.requerido.error};
      } else {
          if(valida.numerico.regex.test(id)){
              delete errores['id'];
              actualizar.id = id;
          } else {
              errores['id'] = {error: valida.numerico.error};
              errores['status'] = 500;
          }
      }

      if(name === undefined || valida.requerido.regex.test(name)){
          errores['name'] = {error: valida.requerido.error};
      } else {
          if(valida.texto.regex.test(name)){
              delete errores['name'];
              actualizar.name = name;
          } else {
              errores['name'] = {error: valida.texto.error};
              errores['status'] = 400;
          }
      }

      if(Object.keys(actualizar).length === 2){
        update_at = new Date();
        Teams.findByIdAndUpdate({_id: actualizar.id}, {'$set': {name: actualizar.name, update_at: update_at}}, (err, doc) => {
          if(err) return reject(err);
          if(doc === null) return reject({error: 'Registro no encontrado', status: 404});
          return resolve({data: doc, status: 200});
        });
      } else {
          return reject(errores);
      }
    });
  };

  module.exports = updateTeam;
})();
