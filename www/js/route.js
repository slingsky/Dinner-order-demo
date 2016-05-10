angular.module('route', ['tab.route','guidePage.route','home.route','productSingle.route','dainty.route','order.route'])


.config(function($stateProvider, $urlRouterProvider) {
  // if none of the above states are matched, use this as the fallback
  // 第一次登陆
    if(localStorage["isFirst"])
    {
      $urlRouterProvider.otherwise('/tab/home');
    }
    else {
      $urlRouterProvider.otherwise('/guidePage');
    }

});