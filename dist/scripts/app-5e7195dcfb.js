!function(){"use strict";angular.module("app",["ngAnimate","ngTouch","ngAria","ui.router","ui.bootstrap","agGrid","ui-leaflet"])}(),function(){"use strict";function e(){function e(e,t,n,i){function l(t){var n=[];c.clearLayers();for(var i=0;i<t.length;i++){var l=t[i];if(l.latitude&&l.longitude){var a=l.name,r=new L.Marker(new L.LatLng(l.latitude,l.longitude),{title:a});r.bindPopup(a),n.push(r)}}console.time("clustering"),c.addLayers(n),c.on("click",function(t){e.info("click > ",t)}),s.addLayer(c),console.timeEnd("clustering")}function a(e,t,i,l){var a=$("#progress",n)[0],r=$("#progress-bar",n)[0];console.log("progress > ",a),i>1e3&&(a.style.display="block",r.style.width=Math.round(e/t*100)+"%",console.log(Math.round(e/t*100)+"%")),e===t&&(a.style.display="none")}var r="http://{s}.tile.osm.org/{z}/{x}/{y}.png",o="Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade, Points &copy 2012 LINZ",d=new L.TileLayer(r,{maxZoom:21,attribution:o}),u=new L.LatLng(45.755658,4.834432),s=new L.Map("map",{center:u,zoom:13,layers:[d]}),c=new L.MarkerClusterGroup({chunkedLoading:!0,chunkProgress:a});i.list.subscribe(function(e){l(e)})}var t={restrict:"E",templateUrl:"app/components/map/erMap.tpl.html",scope:{},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["$log","$timeout","$element","MapService"],t}angular.module("app").directive("erMap",e)}(),function(){"use strict";function e(){function e(e,t){var n=this;n.gridOptions=t.gridOptions,e.list.subscribe(function(e){n.gridOptions.rowData=e})}var t={restrict:"E",templateUrl:"app/components/grid/erGrid.tpl.html",scope:{},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["MapService","GridService"],t}angular.module("app").directive("erGrid",e)}(),function(){"use strict";function e(e){var t=this;t.filter={name:{enabled:!1,value:""},date:{enabled:!1,startValue:"",endValue:""},gender:{enabled:!1,value:""},position:{enabled:!1,startLatValue:"",endLatValue:"",startLngValue:"",endLngValue:""}}}angular.module("app").controller("ErFilterController",e),e.$inject=["$modalInstance"]}(),function(){"use strict";function e(e,t,n){function i(){function i(e){o=e.data,n(function(){a.onNext(e.data)},1e3)}function l(t){e.error("XHR Failed for getData."+angular.toJson(t.data,!0))}t.get(r).then(i)["catch"](l)}function l(){}var a,r="assets/data/positions.json",o=[];L.Icon.Default.imagePath="/bower_components/leaflet/dist/images";var d={loadData:i,filterData:l,list:Rx.Observable.create(function(e){a=e,a.onNext(o)})};return d}angular.module("app").factory("MapService",e),e.$inject=["$log","$http","$timeout"]}(),function(){"use strict";function e(){function e(e,n){var i=t(e),l=t(n);return null===i&&null===l?0:null===i?-1:null===l?1:i-l}function t(e){if(void 0===e||null===e||10!==e.length)return null;var t=e.substring(6,10),n=e.substring(3,5),i=e.substring(0,2),l=1e4*t+100*n+i;return l}var n=[{headerName:"Nom",field:"name"},{headerName:"Date",field:"registered",width:110,comparator:e},{headerName:"Genre",field:"gender",width:90},{headerName:"Téléphone",field:"phone"},{headerName:"Lat",field:"latitude",width:90},{headerName:"Lon",field:"longitude",width:90},{headerName:"Id",field:"id"}],i={columnDefs:n,enableSorting:!0,pinnedColumnCount:1,rowData:[]},l={gridOptions:i};return l}angular.module("app").factory("GridService",e)}(),function(){"use strict";function e(e,t,n){function i(){return"Aucun filtre"}function l(){var n=e.open({animation:!0,templateUrl:"app/components/filter/erFilter.tpl.html",controller:"ErFilterController",size:"lg"});n.result.then(function(e){t.info(">>: "+e)},function(){t.info("Modal dismissed at: "+new Date)})}var a={getDisplay:i,openModal:l};return a}angular.module("app").factory("FilterService",e),e.$inject=["$modal","$log","MapService"]}(),function(){"use strict";function e(e,t){var n=this;n.filter=t,n.totalItems=0,e.list.subscribe(function(e){n.totalItems=e.length}),e.loadData()}angular.module("app").controller("MainController",e),e.$inject=["MapService","FilterService"]}(),function(){"use strict";function e(e,t){e.state("home",{url:"/map",templateUrl:"app/main/main.tpl.html",controller:"MainController",controllerAs:"vm"}),t.otherwise("/map")}angular.module("app").config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function e(e){e.debugEnabled(!0)}angular.module("app").config(e),e.$inject=["$logProvider"]}(),angular.module("app").run(["$templateCache",function(e){e.put("app/main/main.tpl.html",'<div class="container-fluid"><div class="col-md-12"><h2>Visualisation des données: {{ vm.totalItems }} items</h2><p><strong>Filtres:</strong> {{ vm.filter.getDisplay() }} <button ng-click="vm.filter.openModal()" class="btn btn-sm btn-primary">Ajouter/Modifier</button> <button ng-click="deleteFilter()" class="btn btn-sm btn-danger">Supprimer</button></p></div><h1 ng-if="vm.totalItems == 0" class="text-center">Chargement des positions..</h1><div ng-if="vm.totalItems > 0"><div class="col-md-6 col-sm-12"><er-grid></er-grid></div><div class="col-md-6 col-sm-12"><er-map></er-map></div></div></div>'),e.put("app/components/filter/erFilter.tpl.html",'<div class="modal-header"><h3 class="modal-title">Filtrage des résultats:</h3></div><div class="modal-body"><form name="mainForm"><div><label><input type="checkbox" ng-model="vm.filter.gender.enabled"> Genre:</label><form name="genderForm"><label><input type="radio" ng-model="vm.filter.gender.value = \'male\'"> Homme</label> <label><input type="radio" ng-model="vm.filter.gender.value = \'female\'"> Femme</label></form></div><div><label><input type="checkbox" ng-model="vm.filter.date.enabled"> Date:</label><form name="dateForm"><label>Début:<input type="text" ng-model="vm.filter.date.startValue"></label> <label>Fin: <input type="text" ng-model="vm.filter.date.endValue"></label></form></div><div><label><input type="checkbox" ng-model="vm.filter.name.enabled">Nom:</label><form name="nameForm"><input type="text" ng-model="vm.filter.name.value"></form></div><div><label><input type="checkbox" ng-model="vm.filter.position.enabled">Position:</label><form name="positionForm"><label>Latitude min: <input type="text" ng-model="vm.filter.position.startLatValue"></label> <label>Latitude max: <input type="text" ng-model="vm.filter.position.endLatValue"></label> <label>Longitude min: <input type="text" ng-model="vm.filter.position.startLngValue"></label> <label>Longitude max: <input type="text" ng-model="vm.filter.position.endLngValue"></label></form></div></form></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button> <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button></div>'),e.put("app/components/map/erMap.tpl.html",'<div><p>erGrid directive</p><div id="progress"><div id="progress-bar"></div></div><div id="map"></div></div>'),e.put("app/components/grid/erGrid.tpl.html",'<div><p>erMap directive</p><div ag-grid="vm.gridOptions" class="ag-fresh"></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-5e7195dcfb.js.map
