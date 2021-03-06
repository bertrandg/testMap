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
    function ErGridController($log, $timeout, GeoDataService, GridService, ItemDetailsService) {
      var vm = this;

      vm.gridOptions = GridService.gridOptions;

      GeoDataService.list.subscribe(function(list) {
        $log.log('Observable subscriber called ---> GRID ', list.length);

        vm.gridOptions.api.setRowData(list);
        
        vm.gridOptions.api.removeEventListener('rowClicked', onRowClicked);
        vm.gridOptions.api.addEventListener('rowClicked', onRowClicked);
      });

      function onRowClicked(e) {
          ItemDetailsService.openModal(e.data.id);
        }
    }
  }

})();
