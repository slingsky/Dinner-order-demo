// home页面子路由
angular.module('order.route', ['order.controller'])
.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('order', {
      url: '/order',
      templateUrl: 'areas/order/order.html',
      controller: 'OrderCtrl'
    })

});
