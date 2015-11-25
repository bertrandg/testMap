(function() {
  'use strict';

  angular
    .module('app')
    .controller('ItemDetailsModalController', ItemDetailsModalController);

  /** @ngInject */
  function ItemDetailsModalController($uibModalInstance, GeoDataService, item) {
    var vm = this;

    vm.GeoDataService = GeoDataService;
    vm.item = item;

    vm.filterData = function() {
      $uibModalInstance.close(item);
    };

    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
