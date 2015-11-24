(function() {
  'use strict';

  angular
    .module('app')
    .controller('ErFilterController', ErFilterController);

  /** @ngInject */
  function ErFilterController($modalInstance) {
    var vm = this;

    vm.filter = {
      name: {
        enabled: false,
        value: ''
      },
      date: {
        enabled: false,
        startValue: '',
        endValue: ''
      },
      gender: {
        enabled: false,
        value: ''
      },
      position: {
        enabled: false,
        startLatValue: '',
        endLatValue: '',
        startLngValue: '',
        endLngValue: ''
      },

    }
  }
})();
