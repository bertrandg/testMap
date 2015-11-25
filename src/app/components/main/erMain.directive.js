(function() {
  'use strict';

  angular
    .module('app')
    .directive('erMain', erMain);

  /** @ngInject */
  function erMain() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/main/erMain.tpl.html',
      scope: {},
      controller: ErMainController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ErMainController($log, GeoDataService, FilterService) {
      var vm = this;

      vm.GeoDataService = GeoDataService;
      vm.FilterService = FilterService;
      vm.totalDisplayItems = 0;

      GeoDataService.list.subscribe(function(list) {
        $log.log('Observable subscriber called ---> MAIN ', list.length);
        vm.totalDisplayItems = list.length;
      });

      GeoDataService.loadData();
    }
  }

})();
