// home页面子路由
angular.module('dainty.route', ['dainty.controller'])
.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tab.dainty', {
      url: '/dainty',
      views: {
        'tab-dainty': {
          templateUrl: 'areas/dainty/dainty.html',
          controller: 'DaintyCtrl'
        }
      }
    })

});
