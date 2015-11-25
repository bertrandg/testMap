(function() {
  'use strict';

  angular
    .module('app')
    .factory('ItemDetailsService', ItemDetailsService);

  /** @ngInject */
  function ItemDetailsService($uibModal, GeoDataService) {

    var Service = {
      openModal: openModal
    };


    function openModal(id) {
      $uibModal.open({
        animation: true,
        templateUrl: 'app/components/itemsDetailsModal/itemsDetailsModal.tpl.html',
        controller: 'ItemDetailsModalController',
        controllerAs: 'vm',
        bindToController: true,
        size: 'lg',
        resolve: {
          item: GeoDataService.getItem(id)
        }
      });
    }

    return Service;
  }
})();
