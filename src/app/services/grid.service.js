(function() {
  'use strict';

  angular
    .module('app')
    .factory('GridService', GridService);

  /** @ngInject */
  function GridService() {

    var columnDefs = [
      {headerName: "Nom", field: "name"},
      {headerName: "Date", field: "registered", width: 110, comparator: dateComparator},
      {headerName: "Genre", field: "gender", width: 90},
      {headerName: "Téléphone", field: "phone"},
      {headerName: "Lat", field: "latitude", width: 90},
      {headerName: "Lon", field: "longitude", width: 90},
      {headerName: "Id", field: "id"}
    ];

    var gridOptions = {
      columnDefs: columnDefs,
      enableSorting: true,
      pinnedColumnCount: 1,
      rowData: []
    };

    var Service = {
      gridOptions: gridOptions,
      dateComparator: dateComparator
    };

    function dateComparator(date1, date2) {
      var date1Number = monthToComparableNumber(date1);
      var date2Number = monthToComparableNumber(date2);

      if (date1Number===null && date2Number===null) {
        return 0;
      }
      if (date1Number===null) {
        return -1;
      }
      if (date2Number===null) {
        return 1;
      }

      return date1Number - date2Number;
    }

    function monthToComparableNumber(date) {
      if (date === undefined || date === null || date.length !== 10) {
          return null;
      }

      var yearNumber = date.substring(6,10);
      var monthNumber = date.substring(3,5);
      var dayNumber = date.substring(0,2);

      var result = (yearNumber*10000) + (monthNumber*100) + dayNumber;
      return result;
    }


    return Service;
  }
})();
