angular.module('home.controller', ['home.service','tab.controller'])

.controller('HomeCtrl', function($scope,$state,$stateParams,$ionicLoading,$window,HomeFty,GlobalVariable,IndexdbJs) {

  

	// 轮播图
    $scope.$on('$ionicView.afterEnter', function (e) {
      var mySwiper = new Swiper('.swiper-container', {
          // autoplay : 3000,
          // pagination : '.swiper-pagination',
          // touchRatio : 0.5,
          // loop : true
          // slidesPerView: 1,
        paginationClickable: true,
        centeredSlides: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        // 改变自动更新
        observer:true,
        observeParents:true
      });

    });
  

  // 搜索框
  headerChangeColor();
  function headerChangeColor(){
  	var bg = $window.document.getElementById('home-content');
    var bgChild = bg.children[0];
  	var curOpacity = 0;
  	bg.onscroll = function(event){
  		var distence = Math.abs(parseFloat(bgChild.style.transform.split(',')[1]));
  		if(distence/150 < 0.85){
  			curOpacity = distence/150;
  		}else{
  			curOpacity = 0.85;
  		}
  		document.getElementById("header").style.background='rgba(230,230,230,'+curOpacity+')';
  	}
  }

  // 下拉刷新
  // 和前台绑定的数据对象
  $scope.obj_goodsListData = [];
  var items = $scope.obj_goodsListData;


  // 判断有没有更多数据可以加载
  $scope.pms_isMoreItemsAvailable=true;


  // 视图监听
  $scope.$on('$ionicView.beforeEnter',function(e){
  	$scope.func_doRefresh();
    func_getAllData();
    
  });

  // 刷新数据方法
  $scope.func_doRefresh = function(){
  	// 分页信息处理，每次刷新的时候让页码变为第一页
  	//$scope.obj_pagingInfo.pageNum=1;
    //$scope.obj_pagingInfo.typeNumber=$stateParams.typeNumber;

    //var massage = JSON.stringify($scope.obj_pagingInfo);

    var promise = HomeFty.refreshGoodsList();

    promise.then(
    	function(data){
    		if (data && $scope.pms_isMoreItemsAvailable) {
          $.each(data, function (i, item) {
            item.num = 0;
            item.onOff = false;
            $scope.obj_goodsListData.push(item);
            $scope.pms_isMoreItemsAvailable = false;
          });

          
        }
        
    	}
  	).finally(function(){
  		// 停止广播ion-refresher
      setTimeout(function(){
        $scope.$broadcast('scroll.refreshComplete');
      },2000)
  	})
  }

  // 下拉刷新
  $scope.func_loadMoreGoodsList = function(){

    // $scope.obj_pagingInfo.pageNum++;
    // $scope.obj_pagingInfo.typeNumber=$stateParams.typeNumber;
    // var message=JSON.stringify($scope.obj_pagingInfo);
    var promise = HomeFty.loadMoreGoodsList();
    promise.then(
      function (data) {
        // 为了代码健壮性做判断
        if (data) {
          $.each(data, function (i, item) {
            item.num = 0;
            item.onOff = false;
            $scope.obj_goodsListData.push(item);
          });
          $scope.pms_isMoreItemsAvailable = false;
        }
        else {
          $scope.pms_isMoreItemsAvailable = true;
        }
      },
      function (reason) {
        console.log(reason);
      }
    ).finally(function() {
      setTimeout(function(){
        // 停止加载更多的广播
        $scope.$broadcast('scroll.infiniteScrollComplete');
      },2000)
    });
  }

  // 点击加1
  $scope.add = function(foodsId){
  	for(var i=0;i<items.length;i++){
      if(items[i].id == foodsId){
        items[i].num ++ ;
        if(items[i].num>0 ){
          items[i].onOff = true ;
        }
        func_putDB(items[i])  
      }
    }
    $scope.$emit('add',1);
  }

  // 点击减1
  $scope.minus = function(foodsId){
    for(var i=0;i<items.length;i++){
      if(items[i].id == foodsId){
        items[i].num -- ;
        if(items[i].num < 1 ){
          items[i].onOff = false ;
          items[i].num = 0;
          func_deleteDB(items[i]);
        }else{
          func_putDB(items[i]);
        }
      }
    }
    $scope.$emit('minus',1);
  }

  // 添加到本地store内
  function func_putDB(item){
    IndexdbJs.get(item.id,'order',function(data){
      if(data == null || data == undefined){

        IndexdbJs.add('order',item,function(){
          //$scope.foods_number = items[i].num;
          $scope.$digest();
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
    IndexdbJs.delete(item.id,'order',function(){
      $scope.$digest();
    });
  }

  // 获取所有数据
  $scope.obj_orderCount = {
    count: ''
  }
  function func_getAllData(){
    var promise = HomeFty.getAllData();
    promise.then(
      function(data){
        if(data.length>0){
          for(var i=0;i<items.length;i++){
            for(var j=0;j<data.length;j++){
              if(items[i].id == data[j].id){
                items[i].num = data[j].num;
                items[i].onOff = true;
              }
            } 
          }
        } 
      }
    )
  };

  $scope.iconList = ['凉菜','家常菜','汤羹','酒水','甜点','主食','特价菜'];
  
})