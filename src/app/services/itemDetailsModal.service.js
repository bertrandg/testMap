(function() {
  'use strict';

  angular
    .module('app')
    .factory('ItemDetailsService', ItemDetailsService);

  /** @ngInject */
  function ItemDetailsService($uibModal, $log, GeoDataService, FilterService) {

    var Service = {
      openModal: openModal
    };


    function openModal(id) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/components/itemDetailsModal/itemDetailsModal.tpl.html',
        controller: 'ItemDetailsModalController',
        controllerAs: 'vm',
        bindToController: true,
        size: 'lg',
        resolve: {
          item: GeoDataService.getItem(id)
        }
      });

      modalInstance.result.then(function (item) {
        FilterService.isolateItemAndRefresh(item);
      }, function () {
        $log.info('ItemDetailsModal dismissed at: ' + new Date());
      });
    }

    return Service;
  }
})();
