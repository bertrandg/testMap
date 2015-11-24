(function() {
  'use strict';

  angular
    .module('app')
    .directive('erMap', erMap);

  /** @ngInject */
  function erMap() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/map/erMap.tpl.html',
      scope: {},
      controller: ErMapController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ErMapController($log, $timeout, $element, MapService) {
      var vm = this;

      var cloudmadeUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade, Points &copy 2012 LINZ',
          cloudmade = new L.TileLayer(cloudmadeUrl, { maxZoom: 21, attribution: cloudmadeAttribution }),
          latlng = new L.LatLng(45.755658, 4.834432),
          map = new L.Map('map', { center: latlng, zoom: 13, layers: [cloudmade] }),
          markers = new L.MarkerClusterGroup({ chunkedLoading: true, chunkProgress: updateProgressBar });

      MapService.list.subscribe(function(list) {
        addMarkers(list);
      })

      function addMarkers(list) {
        var markerList = [];
        markers.clearLayers();

        for (var i = 0; i < list.length; i++) {
          var a = list[i];
          if(a.latitude && a.longitude) {
            var title = a.name;
            var marker = new L.Marker(new L.LatLng(a.latitude, a.longitude), { title: title });
            marker.bindPopup(title);
            markerList.push(marker);
          }
        }
        console.time('clustering');

        markers.addLayers(markerList);

        markers.on('click', function (e) {
          $log.info('click > ', e);
        });

        map.addLayer(markers);

        console.timeEnd('clustering');
      }

      function updateProgressBar(processed, total, elapsed, layersArray) {
        var progress = $('#progress', $element)[0];
        var progressBar = $('#progress-bar', $element)[0];

        if (elapsed > 1000) {
          progress.style.display = 'block';
          progressBar.style.width = Math.round(processed/total*100) + '%';
        }

        if (processed === total) {
          progress.style.display = 'none';
        }
      }
    }
  }

})();
