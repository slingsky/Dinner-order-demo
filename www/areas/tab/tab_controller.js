angular.module('tab.controller', [])

.controller('TabCtrl', function($scope,IndexdbJs) {


	$scope.obj_orderCount={
      count:""
    }

    $scope.$on('$ionicView.beforeEnter', function (e) {
      IndexdbJs.getAll("order",function(data){
        if(data.length>0)
        {
          $scope.obj_orderCount.count= 0;
          for(var i =0;i<data.length;i++){
            $scope.obj_orderCount.count += parseInt(data[i].num);
          }
        }
      },null)
    });

    $scope.$on('add',function(event,data){
      if(typeof $scope.obj_orderCount.count == 'string'){
        $scope.obj_orderCount.count = 0;
      }
      $scope.obj_orderCount.count += data;
    });
    $scope.$on('minus',function(event,data){
      $scope.obj_orderCount.count -= data;
    });

})