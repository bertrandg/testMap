!function(){"use strict";angular.module("app",["ngAnimate","ngTouch","ngSanitize","ngAria","ui.router","ui.bootstrap","agGrid"])}(),function(){"use strict";function e(){function e(e,t,a,n,l){function i(e){if(c&&(s.removeLayer(c),c.clearLayers(),c=null),0!=e.length){n.mapWIP=!0,console.time("clustering");for(var a=[],l=0;l<e.length;l++){var i=e[l];if(i.latitude&&i.longitude){var p=new d(new L.LatLng(i.latitude,i.longitude),{title:i.id,fill:!0,fillColor:"black",color:"#999",stroke:!0,weight:12,opacity:.5,fillOpacity:1});p.on("click",r),a.push(p)}}t(function(){c=new L.MarkerClusterGroup({chunkedLoading:!0,chunkProgress:o}),c.addLayers(a),s.addLayer(c)})}}function o(e,l,i,o){var r=$("#progress",a)[0],s=$("#progress-bar",a)[0];i>1e3&&(r.style.display="block",s.style.width=Math.round(e/l*100)+"%"),e===l&&(r.style.display="none",console.timeEnd("clustering"),t(function(){n.mapWIP=!1}))}function r(e){l.openModal(this.options.title)}var s=new L.Map("map",{center:new L.LatLng(45.755658,4.834432),zoom:13,layers:[new L.TileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{maxZoom:21})]}),d=L.CircleMarker.extend({options:{radius:8}}),c=null;n.list.subscribe(function(t){e.log("Observable subscriber called ---> MAP ",t.length),i(t)})}var t={restrict:"E",templateUrl:"app/components/map/erMap.tpl.html",scope:{},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["$log","$timeout","$element","GeoDataService","ItemDetailsService"],t}angular.module("app").directive("erMap",e)}(),function(){"use strict";function e(){function e(e,t,a){var n=this;n.GeoDataService=t,n.FilterService=a,n.totalDisplayItems=0,t.list.subscribe(function(t){e.log("Observable subscriber called ---> MAIN ",t.length),n.totalDisplayItems=t.length}),t.loadData()}var t={restrict:"E",templateUrl:"app/components/main/erMain.tpl.html",scope:{},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["$log","GeoDataService","FilterService"],t}angular.module("app").directive("erMain",e)}(),function(){"use strict";function e(e,t,a){var n=this;n.GeoDataService=t,n.item=a,n.filterData=function(){e.close(a)},n.cancel=function(){e.dismiss("cancel")}}angular.module("app").controller("ItemDetailsModalController",e),e.$inject=["$uibModalInstance","GeoDataService","item"]}(),function(){"use strict";function e(e,t,a){var n=this;n.filter=a.filter,n.datepickerOptions=a.datepickerOptions,n.date={dateA:{opened:!1},dateB:{opened:!1}},n.removeAll=function(){a.removeAll(),e.close(n.filter)},n.filterData=function(){e.close(n.filter)},n.cancel=function(){e.dismiss("cancel")}}angular.module("app").controller("ErFilterModalController",e),e.$inject=["$uibModalInstance","$log","FilterService"]}(),function(){"use strict";function e(){function e(e,t,a,n,l){function i(e){l.openModal(e.data.id)}var o=this;o.gridOptions=n.gridOptions,a.list.subscribe(function(t){e.log("Observable subscriber called ---> GRID ",t.length),o.gridOptions.api.setRowData(t),o.gridOptions.api.removeEventListener("rowClicked",i),o.gridOptions.api.addEventListener("rowClicked",i)})}var t={restrict:"E",templateUrl:"app/components/grid/erGrid.tpl.html",scope:{},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["$log","$timeout","GeoDataService","GridService","ItemDetailsService"],t}angular.module("app").directive("erGrid",e)}(),function(){"use strict";function e(e){function t(t){return e("date")(t,"dd/MM/yyyy")}var a={formatDate:t};return a}angular.module("app").factory("UtilsService",e),e.$inject=["$filter"]}(),function(){"use strict";function e(e,t,a,n){function l(l){var i=e.open({animation:!0,templateUrl:"app/components/itemDetailsModal/itemDetailsModal.tpl.html",controller:"ItemDetailsModalController",controllerAs:"vm",bindToController:!0,size:"lg",resolve:{item:a.getItem(l)}});i.result.then(function(e){n.isolateItemAndRefresh(e)},function(){t.info("ItemDetailsModal dismissed at: "+new Date)})}var i={openModal:l};return i}angular.module("app").factory("ItemDetailsService",e),e.$inject=["$uibModal","$log","GeoDataService","FilterService"]}(),function(){"use strict";function e(){function e(e,a){var n=t(e),l=t(a);return null===n&&null===l?0:null===n?-1:null===l?1:n-l}function t(e){if(void 0===e||null===e||10!==e.length)return null;var t=e.substring(6,10),a=e.substring(3,5),n=e.substring(0,2),l=1e4*t+100*a+n;return l}function a(e){return"female"==e.value?"Femme":"Homme"}var n=[{headerName:"Nom",field:"name"},{headerName:"Date",field:"registered",width:110,comparator:e},{headerName:"Genre",field:"gender",width:90,cellRenderer:a},{headerName:"Téléphone",field:"phone"},{headerName:"Lat",field:"latitude",width:90},{headerName:"Lon",field:"longitude",width:90},{headerName:"Id",field:"id"}],l={columnDefs:n,enableSorting:!0,pinnedColumnCount:1,rowData:[]},i={gridOptions:l,dateComparator:e};return i}angular.module("app").factory("GridService",e)}(),function(){"use strict";function e(e,t,a,n,l,i,o,r){function s(){function i(e){angular.forEach(e,function(e){m=m.concat(e.data)}),n(function(){v.totalItems=m.length,p.onNext(m)},1e3)}function o(e){t.error("XHR Failed for getData."+angular.toJson(e.data,!0))}var s=r.tab102k;e.search()&&("32k"==e.search().tab&&(s=r.tab32k),"64k"==e.search().tab&&(s=r.tab64k)),l.all(s.map(function(e){return a({method:"GET",url:e})})).then(i)["catch"](o)}function d(e){return _.find(m,function(t){return t.id==e})}function c(e){n(function(){return e.name.enabled||e.gender.enabled||e.position.enabled||e.date.enabled?(u=m.filter(function(t){if(e.name.enabled&&""!=e.name.value&&-1==t.name.indexOf(e.name.value))return!1;if(e.gender.enabled&&""!=e.gender.value&&t.gender!=e.gender.value)return!1;if(e.position.enabled){if(""!=e.position.startLatValue&&t.latitude<e.position.startLatValue)return!1;if(""!=e.position.endLatValue&&t.latitude>e.position.endLatValue)return!1;if(""!=e.position.startLngValue&&t.longitude<e.position.startLngValue)return!1;if(""!=e.position.endLngValue&&t.longitude>e.position.endLngValue)return!1}if(e.date.enabled){if(""!=e.date.startValue&&i.dateComparator(o.formatDate(e.date.startValue),t.registered)>0)return!1;if(""!=e.date.endValue&&i.dateComparator(o.formatDate(e.date.endValue),t.registered)<0)return!1}return!0}),void p.onNext(u)):void p.onNext(m)})}var p,m=[],u=[];L.Icon.Default.imagePath="assets/images/leaflet";var v={totalItems:0,mapWIP:!0,loadData:s,filterData:c,getItem:d,list:Rx.Observable.create(function(e){p=e}).share()};return n(function(){p.onNext(m)}),v}angular.module("app").factory("GeoDataService",e),e.$inject=["$location","$log","$http","$timeout","$q","GridService","UtilsService","Files"]}(),function(){"use strict";function e(e,t,a,n,l,i){function o(){var a=e.open({animation:!0,templateUrl:"app/components/filterModal/erFilterModal.tpl.html",controller:"ErFilterModalController",controllerAs:"vm",bindToController:!0,size:"lg"});a.result.then(function(){c()},function(){t.info("erFilterModal dismissed at: "+new Date)})}function r(){m.name.enabled=!1,m.date.enabled=!1,m.gender.enabled=!1,m.position.enabled=!1}function s(){r(),c()}function d(e){m.name.enabled=!1,m.date.enabled=!0;var t=new Date(e.registered.split("/")[2],e.registered.split("/")[1]-1,e.registered.split("/")[0]);m.date.startValue=t,m.date.endValue=t,m.gender.enabled=!1,m.position.enabled=!0,m.position.startLatValue=Math.floor(1e4*(e.latitude-i.lat))/1e4,m.position.endLatValue=Math.floor(1e4*(e.latitude+i.lat))/1e4,m.position.startLngValue=Math.floor(1e4*(e.longitude-i.lng))/1e4,m.position.endLngValue=Math.floor(1e4*(e.longitude+i.lng))/1e4,c()}function c(){v.filterDisplayText=p(),n.filterData(m)}function p(){var e="";return m.name.enabled&&""!=m.name.value&&(e+='<span>Nom: <span class="val">'+m.name.value+"</span></span>"),m.gender.enabled&&""!=m.gender.value&&(e+='<span>Genre: <span class="val">'+("male"==m.gender.value?"Homme":"Femme")+"</span></span>"),m.date.enabled&&(""!=m.date.startValue&&(e+='<span>Date début: <span class="val">'+l.formatDate(m.date.startValue)+"</span></span>"),""!=m.date.endValue&&(e+='<span>Date fin: <span class="val">'+l.formatDate(m.date.endValue)+"</span></span>")),m.position.enabled&&(m.position.startLatValue&&""!=m.position.startLatValue&&(e+='<span>Lat min: <span class="val">'+m.position.startLatValue+"</span></span>"),m.position.endLatValue&&""!=m.position.endLatValue&&(e+='<span>Lat max: <span class="val">'+m.position.endLatValue+"</span></span>"),m.position.startLngValue&&""!=m.position.startLngValue&&(e+='<span>Lng min: <span class="val">'+m.position.startLngValue+"</span></span>"),m.position.endLngValue&&""!=m.position.endLngValue&&(e+='<span>Lng max: <span class="val">'+m.position.endLngValue+"</span></span>")),""==e?' <span class="val">Aucun filtre</span>':a.trustAsHtml(e)}var m={name:{enabled:!1,value:""},date:{enabled:!1,startValue:"",endValue:""},gender:{enabled:!1,value:""},position:{enabled:!1,startLatValue:"",endLatValue:"",startLngValue:"",endLngValue:""}},u={formatYear:"yy",startingDay:1},v={filter:m,datepickerOptions:u,filterDisplayText:p(),openModal:o,removeAll:r,removeAllAndRefresh:s,isolateItemAndRefresh:d};return v}angular.module("app").factory("FilterService",e),e.$inject=["$uibModal","$log","$sce","GeoDataService","UtilsService","LocalisationPrecision"]}(),function(){"use strict";function e(e,t){e.state("home",{url:"/map",template:"<er-main></er-main>"}),t.otherwise("/map")}angular.module("app").config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("app").constant("Files",{tab32k:["assets/data/positions.json"],tab64k:["assets/data/positions.json","assets/data/positions2.json"],tab102k:["assets/data/positions.json","assets/data/positions2.json","assets/data/positions3.json"]}).constant("LocalisationPrecision",{lat:.005,lng:.01})}(),function(){"use strict";function e(e){e.debugEnabled(!0)}angular.module("app").config(e),e.$inject=["$logProvider"]}(),angular.module("app").run(["$templateCache",function(e){e.put("app/components/filterModal/erFilterModal.tpl.html",'<div class="erFilterModal"><div class="modal-header"><h3 class="modal-title">Critères de filtrage:</h3></div><div class="modal-body"><form name="vm.mainForm" class="form-inline"><table class="table table-hover"><tbody><tr><td><label><input type="checkbox" ng-model="vm.filter.name.enabled"> Nom:</label></td><td ng-class="{\'formOff\': !vm.filter.name.enabled}"><form name="vm.nameForm"><label>Contient: <input type="text" ng-model="vm.filter.name.value" ng-disabled="!vm.filter.name.enabled" class="form-control" required=""></label></form></td></tr><tr><td><label><input type="checkbox" ng-model="vm.filter.gender.enabled"> Genre:</label></td><td ng-class="{\'formOff\': !vm.filter.gender.enabled}"><form name="vm.genderForm" class="form-inline"><label class="radio-inline"><input type="radio" ng-model="vm.filter.gender.value" ng-disabled="!vm.filter.gender.enabled" name="inlineRadioOptions" value="male"> Homme</label> <label class="radio-inline"><input type="radio" ng-model="vm.filter.gender.value" ng-disabled="!vm.filter.gender.enabled" name="inlineRadioOptions" value="female"> Femme</label></form></td></tr><tr><td><label><input type="checkbox" ng-model="vm.filter.date.enabled"> Date:</label></td><td ng-class="{\'formOff\': !vm.filter.date.enabled}"><form name="vm.dateForm" class="form-inline">Début:<div class="input-group"><input type="date" uib-datepicker-popup="dd/MM/yyyy" ng-model="vm.filter.date.startValue" is-open="vm.date.dateA.opened" datepicker-options="vm.datepickerOptions" date-disabled="!vm.filter.date.enabled" ng-disabled="!vm.filter.date.enabled" close-text="Fermer" class="form-control" readonly=""> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="vm.date.dateA.opened = true" ng-disabled="!vm.filter.date.enabled"><i class="glyphicon glyphicon-calendar"></i></button></span></div>- Fin:<div class="input-group"><input type="date" uib-datepicker-popup="dd/MM/yyyy" ng-model="vm.filter.date.endValue" is-open="vm.date.dateB.opened" datepicker-options="vm.datepickerOptions" date-disabled="!vm.filter.date.enabled" ng-disabled="!vm.filter.date.enabled" close-text="Fermer" class="form-control" readonly=""> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="vm.date.dateB.opened = true" ng-disabled="!vm.filter.date.enabled"><i class="glyphicon glyphicon-calendar"></i></button></span></div></form></td></tr><tr><td><label><input type="checkbox" ng-model="vm.filter.position.enabled"> Position:</label></td><td ng-class="{\'formOff\': !vm.filter.position.enabled}"><form name="vm.positionForm"><label>Latitude min: <input type="number" ng-model="vm.filter.position.startLatValue" ng-disabled="!vm.filter.position.enabled" class="form-control" min="-90" max="90" step="0.001" required=""></label> <label>Latitude max: <input type="number" ng-model="vm.filter.position.endLatValue" ng-disabled="!vm.filter.position.enabled" class="form-control" min="-90" max="90" step="0.001" required=""></label><br><label>Longitude min: <input type="number" ng-model="vm.filter.position.startLngValue" ng-disabled="!vm.filter.position.enabled" class="form-control" min="-180" max="180" step="0.001" required=""></label> <label>Longitude max: <input type="number" ng-model="vm.filter.position.endLngValue" ng-disabled="!vm.filter.position.enabled" class="form-control" min="-180" max="180" step="0.001" required=""></label></form></td></tr></tbody></table></form></div><div class="modal-footer"><button class="btn btn-danger pull-left" type="button" ng-click="vm.removeAll()" ng-disabled="vm.GeoDataService.mapWIP"><span class="glyphicon glyphicon-remove"></span> Supprimer</button> <button class="btn btn-primary" type="button" ng-click="vm.cancel()">Fermer</button> <button class="btn btn-primary" type="button" ng-click="vm.filterData()" ng-disabled="vm.GeoDataService.mapWIP"><span class="glyphicon glyphicon-filter"></span> Filtrer</button></div></div>'),e.put("app/components/grid/erGrid.tpl.html",'<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title text-center">Grille</h3></div><div class="panel-body"><div ag-grid="vm.gridOptions" class="ag-fresh"></div></div></div>'),e.put("app/components/itemDetailsModal/itemDetailsModal.tpl.html",'<div class="itemDetailsModal"><div class="modal-header"><h3 class="modal-title">Détails:</h3></div><div class="modal-body"><form name="vm.mainForm" class="form-inline"><table class="table table-hover"><tbody><tr><td>Nom:</td><td>{{ vm.item.name }}</td></tr><tr><td>Genre:</td><td>{{ (vm.item.gender == \'male\' ? \'Homme\' : \'Femme\') }}</td></tr><tr><td>Numéro de téléphone:</td><td>{{ vm.item.phone }}</td></tr><tr><td>Date de localisation:</td><td>{{ vm.item.registered }}</td></tr><tr><td>Position:</td><td>{{ \'LAT: \' + vm.item.latitude + \' - LNG: \' + vm.item.longitude }}</td></tr><tr><td>Info:</td><td>{{ vm.item.desc }}</td></tr><tr><td>Identifiant:</td><td>{{ vm.item.id }}</td></tr></tbody></table></form><p><button ng-click="vm.filterData()" ng-disabled="vm.GeoDataService.mapWIP" class="btn btn-primary"><span class="glyphicon glyphicon-screenshot"></span> Rechercher</button> (Identifier les personnes à proximité à la même date)</p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="vm.cancel()">Fermer</button></div></div>'),e.put("app/components/main/erMain.tpl.html",'<nav class="navbar navbar-inverse"><div class="container-fluid"><p class="navbar-text filter-bloc"><strong>Filtres:</strong> <span ng-bind-html="vm.FilterService.filterDisplayText" class="filter-display"></span> <button ng-click="vm.FilterService.openModal()" ng-disabled="vm.GeoDataService.mapWIP" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-pencil"></span> Modifier</button> <button ng-click="vm.FilterService.removeAllAndRefresh()" ng-disabled="vm.GeoDataService.mapWIP" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-remove"></span> Supprimer</button> <span ng-show="vm.GeoDataService.mapWIP" class="glyphicon glyphicon-time"></span></p><p class="navbar-text navbar-right"><strong>Données affichées:</strong> {{ vm.totalDisplayItems + \' / \' + vm.GeoDataService.totalItems }}<button class="btn btn-sm btn-danger" style="opacity: 0;">X</button></p></div></nav><div class="container-fluid"><div ng-if="vm.GeoDataService.totalItems == 0" class="text-center"><span class="badge">Chargement des fichiers..</span></div><div ng-class="{\'hideMe\': vm.GeoDataService.totalItems == 0}"><div class="col-md-6 col-sm-12"><er-grid></er-grid></div><div class="col-md-6 col-sm-12"><er-map></er-map></div></div></div>'),e.put("app/components/map/erMap.tpl.html",'<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title text-center">Carte</h3></div><div class="panel-body"><div id="progress"><div id="progress-bar"></div></div><div id="map"></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-3ee437c8a9.js.map