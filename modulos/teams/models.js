#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */
  const mongoose = require('mongoose');
  const autoIncrement = require('mongoose-auto-increment');

  autoIncrement.initialize(mongoose.connection);

  /* Schema Team */
  const TeamsSchema = mongoose.Schema({
    name: {type: String, required: true},
    create_at: {type: Date, required: true, default: Date.now},
    update_at: {type: Date}
  }, { versionKey: false });

  /* Model Teams */
  const Teams = mongoose.model('Teams', TeamsSchema);
  TeamsSchema.plugin(autoIncrement.plugin, 'Teams');

  /* Schema Members */
  const MembersSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, required: true},
    team_id: { type: Number, ref: 'Teams' },
    create_at: {type: Date, required: true, default: Date.now},
    update_at: {type: Date}
  }, { versionKey: false });

  /* Model Members */
  const Members = mongoose.model('Members', MembersSchema);
  MembersSchema.plugin(autoIncrement.plugin, 'Members');

  /* Exports */
  module.exports = {
    Teams: Teams,
    Members: Members
  };
})();
