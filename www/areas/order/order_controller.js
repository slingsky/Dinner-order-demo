angular.module('order.controller', ['order.service'])

.controller('OrderCtrl', function($scope,$state,$stateParams,$ionicLoading,$window,OrderFty,GlobalVariable,$ionicHistory,IndexdbJs) {

	// 视图监听
  $scope.$on('$ionicView.beforeEnter',function(e){
    func_getAllData();
  });

  // 获取所有数据
	$scope.orderList = {
		totalPrice : 0,
		discount : 0,
		totalNum : 0
	}
  function func_getAllData(){
    var promise = OrderFty.getAllData();
    promise.then(
    	function(data){
    		$scope.orderList.data = data;
    		data.forEach( function(element, index) {
    			$scope.orderList.totalPrice += element.currentPrice * element.num;
    			$scope.orderList.discount += element.lastPrice*element.num - element.currentPrice * element.num;
    			$scope.orderList.totalNum += element.num;

    		});
    		return $scope.orderList.data;
    	}

    ).then(
    	function(items){
    		// 点击加1
			  $scope.add = function(foodsId){
			  	for(var i=0;i<items.length;i++){
			      if(items[i].id == foodsId){
			        items[i].num ++ ;
			        func_putDB(items[i]);
			        $scope.orderList.totalPrice += parseFloat(items[i].currentPrice);
    					$scope.orderList.discount += (items[i].lastPrice - items[i].currentPrice);
    					$scope.orderList.totalNum += 1;
			      } 
			    }
          $scope.$emit('add',1);
			  }

			  // 点击减1
			  $scope.minus = function(foodsId){
			    for(var i=0;i<items.length;i++){
			      if(items[i].id == foodsId){
			      	if(items[i].num == 1){
			      		return;
			      	}
			        items[i].num -- ;
			        func_putDB(items[i]);
			        $scope.orderList.totalPrice -= parseFloat(items[i].currentPrice);
    					$scope.orderList.discount -= (items[i].lastPrice - items[i].currentPrice);
    					$scope.orderList.totalNum -= 1;
			      }
			    }
          $scope.$emit('minus',1);
			  }
    	}
    )
  };

  

  // 添加到本地store内
  function func_putDB(item){
    IndexdbJs.get(item.id,'order',function(data){
      if(data == null || data == undefined){

        IndexdbJs.add('order',item,function(){
          //$scope.foods_number = items[i].num;
        })
      }else{
        IndexdbJs.update('order',item,function(){
          
          $scope.$digest();
        })
      }
    })
  }
  // 删除stroe内 num为0的数据
  function func_deleteDB(item){
    IndexdbJs.delete(item.id,'order');
  }


  $scope.func_goBack = function () {
    //$state.go(_history.stateName);
    // $ionicHistory.goBack();
    window.history.back()
  };

  $scope.func_goHome = function(){
    $state.go('tab.home');
  }




})