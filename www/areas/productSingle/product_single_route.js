 // productSingle页面子路由
angular.module('productSingle.route', ['productSingle.controller'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('productSingle', {
        url: '/productSingle/:id',
        templateUrl: 'areas/productSingle/product_single.html',
        controller: 'ProductSingleCtrl'
      })
  })