#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */
  const valida = require('../../utils/validations')();
  const Teams = require('../../modulos/teams/models').Teams;

  function getAllTeams() {
    let registro = {};
    let errores = {};

    return new Promise((resolve, reject) => {
      Teams.find({}, (err, doc) => {
        if(err) return reject(err);
        if(doc.length === 0) return reject({error: 'Registros no encontrados', status: 404});
        return resolve(doc);
      });
    });
  };

  function getById(id) {
    let registros = {};
    let errores = {};

    return new Promise((resolve, reject) => {
      if(valida.requerido.regex.test(id)){
          errores['id'] = {error: valida.requerido.error};
      } else {
          if(valida.numerico.regex.test(id)){
              delete errores['id'];
              registros.id = id;
          } else {
              errores['id'] = {error: valida.numerico.error};
              errores['status'] = 500;
          }
      }

      if(Object.keys(registros).length === 1) {
        Teams.find({_id: registros.id}, (err, doc) => {
          if(err) return reject(err);
          if(doc.length === 0) return reject({error: 'Registro no encontrado', status: 404});
          return resolve({data: doc, status: 200});
        });
      } else {
        return reject(errores);
      }
    });
  };

  module.exports = {
    getAllTeams: getAllTeams,
    getById: getById
  };
})();
