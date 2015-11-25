(function() {
  'use strict';

  angular
    .module('app')
    .controller('ItemDetailsModalController', ItemDetailsModalController);

  /** @ngInject */
  function ItemDetailsModalController($uibModalInstance, item) {
    var vm = this;

    vm.item = item;

    vm.close = function() {
      $uibModalInstance.close();
    };
  }
})();
