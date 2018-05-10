#!/usr/bin/env node

;(() => {
  'use strict';

  /* Imports */
  const os = require('os');

  /* Variables */
  const ipv4 = require('./validations')().ip_v4;

  function interfaceNetwork() {
    let network = {port: 3000};
    let interfaces = os.networkInterfaces();
    for(let key in interfaces)
      for(let indice = 0; indice < interfaces[key].length; indice++)
        if(ipv4.regex.test(interfaces[key][indice].address) && interfaces[key][indice].address !== '127.0.0.1') network.host = interfaces[key][indice].address;
        else network.host = interfaces[key][indice].address;

    return network;
  };

  /* Export */
  module.exports = interfaceNetwork;
})();
