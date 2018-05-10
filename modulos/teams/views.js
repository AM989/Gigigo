#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */
  const createTeam = require('../../helpers/teams/create');
  const getByTeamId = require('../../helpers/teams/read').getById;
  const getAllTeams = require('../../helpers/teams/read').getAllTeams;
  const updateTeam = require('../../helpers/teams/update');
  const deleteTeam = require('../../helpers/teams/delete');

  /* Funcionalidades */
  function create(request, response) {
    let name = request.body.name;
    createTeam(name).then(success, error);

    function success(data) {
        return response.status(200).json({success: data});
    };

    function error(err) {
        return response.status(400).json({error: err});
    };
  };

  function getAll(request, response) {
    getAllTeams().then(success, error);

    function success(data) {
        return response.status(200).json({"name": "Get all teams", request: {"method": "GET",
				"header": [], body: {"mode": "formdata", formdata: data}}});
    };

    function error(err) {
        return response.status(err.status).json({error: err});
    };
  };

  function getById(request, response) {
    let id = request.params.id;

    getByTeamId(id).then(success, error);

    function success(data) {
      return response.status(200).json({success: data});
    };

    function error(err) {
        return response.status(err.status).json({error: err});
    };
  };

  function update(request, response) {
    let id = request.params.id;
    let name = request.body.name;

    updateTeam(id, name).then(success, error);

    function success(data) {
      return response.status(data.status).json({"request": {
				"method": "PUT",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/x-www-form-urlencoded"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"name\": \"QA\"\n}"
				},
				"url": {
					"raw": "{{host}}teams/{{id}}",
					"host": [
						"{{host}}teams"
					],
					"path": [
						"{{id}}"
					]
				}
			}, success: 'Se ha actualizado el registro con el id: ' + data.data._id});
    };

    function error(err) {
      return response.status(err.status).json({error: err});
    };
  };

  function remove(request, response) {
    let id = request.params.id;

    deleteTeam(id).then(success, error);

    function success(data) {
        return response.status(200).json({success: data});
    };

    function error(err) {
        return response.status(401).json({error: err});
    };
  };

  /* Exports */
  module.exports = {
    create: create,
    read: getAll,
    readId: getById,
    update: update,
    delete: remove
  };
})();
