/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app')
    .constant('Files', {
      tab32k: ['assets/data/positions.json'],
      tab64k: ['assets/data/positions.json', 'assets/data/positions2.json'],
      tab102k: ['assets/data/positions.json', 'assets/data/positions2.json', 'assets/data/positions3.json']
    })
    .constant('LocalisationPrecision', {
      lat: .005,
      lng: .01
    });

})();
