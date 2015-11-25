/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app')
    .constant('Files', [
      'assets/data/positions.json', 
      'assets/data/positions2.json', 
      'assets/data/positions3.json'
    ]);

})();
