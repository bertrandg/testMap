(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(MapService, FilterService) {
    var vm = this;

    vm.filter = FilterService;
    vm.totalItems = 0;

    MapService.list.subscribe(function(list) {
      vm.totalItems = list.length;
    });

    MapService.loadData();
  }
})();
