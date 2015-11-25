(function() {
  'use strict';

  angular
    .module('app')
    .factory('FilterService', FilterService);

  /** @ngInject */
  function FilterService($uibModal, $log, $sce, GeoDataService, UtilsService) {
    var _currentFilter = {
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
      }
    };

    var datepickerOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    var Service = {
      filter: _currentFilter,
      datepickerOptions: datepickerOptions,
      filterDisplayText: getDisplay(),
      openModal: openModal,
      removeAll: removeAll,
      removeAllAndRefresh: removeAllAndRefresh
    };


    function openModal() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/components/filter/erFilter.tpl.html',
        controller: 'ErFilterController',
        controllerAs: 'vm',
        bindToController: true,
        size: 'lg'
      });

      modalInstance.result.then(function () {
        refreshData();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    function removeAll() {
      Service.filter.name.enabled = false;
      Service.filter.date.enabled = false;
      Service.filter.gender.enabled = false;
      Service.filter.position.enabled = false;
    }

    function removeAllAndRefresh() {
        removeAll();
        refreshData();
    }

    function refreshData() {
      Service.filterDisplayText = getDisplay();
      GeoDataService.filterData(_currentFilter);
    }

    function getDisplay() {
      var txt = '';

      if(_currentFilter.name.enabled && _currentFilter.name.value != '') {
        txt += '<span>Nom: <span class="val">' + _currentFilter.name.value + '</span></span>';
      }
      if(_currentFilter.gender.enabled && _currentFilter.gender.value != '') {
        txt += '<span>Genre: <span class="val">' + (_currentFilter.gender.value == 'male' ? 'Homme' : 'Femme') + '</span></span>';
      }
      if(_currentFilter.date.enabled) {
        if(_currentFilter.date.startValue != '') txt += '<span>Date début: <span class="val">' + UtilsService.formatDate(_currentFilter.date.startValue) + '</span></span>';
        if(_currentFilter.date.endValue != '') txt += '<span>Date fin: <span class="val">' + UtilsService.formatDate(_currentFilter.date.endValue) + '</span></span>';
      }
      if(_currentFilter.position.enabled) {
        if(_currentFilter.position.startLatValue != '') txt += '<span>Lat min: <span class="val">' + _currentFilter.position.startLatValue + '</span></span>';
        if(_currentFilter.position.endLatValue != '') txt += '<span>Lat max: <span class="val">' + _currentFilter.position.endLatValue + '</span></span>';
        if(_currentFilter.position.startLngValue != '') txt += '<span>Lng min: <span class="val">' + _currentFilter.position.startLngValue + '</span></span>';
        if(_currentFilter.position.endLngValue != '') txt += '<span>Lng max: <span class="val">' + _currentFilter.position.endLngValue + '</span></span>';
      }

      return (txt == '' ? ' <span class="val">Aucun filtre</span>' : $sce.trustAsHtml(txt));
    }

    return Service;
  }
})();
