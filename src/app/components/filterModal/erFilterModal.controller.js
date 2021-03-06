(function() {
  'use strict';

  angular
    .module('app')
    .controller('ErFilterModalController', ErFilterModalController);

  /** @ngInject */
  function ErFilterModalController($uibModalInstance, $log, FilterService) {
    var vm = this;

    vm.filter = FilterService.filter;
    vm.datepickerOptions = FilterService.datepickerOptions;
    vm.date = {
      dateA: {
        opened: false
      },
      dateB: {
        opened: false
      }
    }

    vm.removeAll = function() {
      FilterService.removeAll();
      $uibModalInstance.close(vm.filter);
    };

    vm.filterData = function() {
      $uibModalInstance.close(vm.filter);
    };

    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  }
})();
