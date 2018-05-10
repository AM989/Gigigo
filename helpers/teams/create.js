#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */
  const valida = require('../../utils/validations')();
  const Teams = require('../../modulos/teams/models').Teams;

  function createTeam(name) {
    let registro = {};
    let errores = {};

    return new Promise((resolve, reject) => {
        if(valida.requerido.regex.test(name)){
            errores['name'] = {error: valida.requerido.error};
        } else {
            if(valida.texto.regex.test(name)){
                delete errores['name'];
                registro.name = name;
            } else {
                errores['name'] = {error: valida.texto.error};
                errores['status'] = 400;
            }
        }

        if(Object.keys(registro).length === 1){
            Teams.findOne({name: registro.name}, (err, doc) => {
                if(err) return reject(err);

                if(doc === null){
                    let nuevoRegistro = new Teams(registro);
                    nuevoRegistro.save((err) => {
                        if(err) return reject(err);
                    });
                    return resolve({name: "Store a team", "request": {
              				"method": "POST",
              				"header": [
              					{
              						"key": "Content-Type",
              						"value": "application/x-www-form-urlencoded"
              					}
              				],
              				"body": {},
              				"url": {
              					"raw": "{{host}}teams",
              					"host": [
              						"{{host}}teams"
              					]
              				}
              			}, status: 'ok', message: 'Se ha creado un nuevo grupo'});
                } else {
                    return reject({status: 'warning', message: 'El grupo ya se encuentra registrado con el id: ' + doc._id});
                }
            });
        } else {
            return reject(errores);
        }
    });
  };

  module.exports = createTeam;
})();
