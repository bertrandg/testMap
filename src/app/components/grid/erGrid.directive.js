(function() {
  'use strict';

  angular
    .module('app')
    .directive('erGrid', erGrid);

  /** @ngInject */
  function erGrid() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/grid/erGrid.tpl.html',
      scope: {},
      controller: ErGridController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ErGridController(MapService, GridService) {
      var vm = this;

      vm.gridOptions = GridService.gridOptions;

      MapService.list.subscribe(function(list) {
        vm.gridOptions.rowData = list;
      });
    }
  }

})();
