(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/map',
        template: '<er-main></er-main>'
      });

    $urlRouterProvider.otherwise('/map');
  }

})();
