angular.module('dainty.controller', ['dainty.service'])

.controller('DaintyCtrl', function($scope,$state,$stateParams,$ionicLoading,$window,DaintyFty,GlobalVariable,IndexdbJs) {

 
 

  // 下拉刷新
  // 和前台绑定的数据对象
  $scope.obj_goodsListData = [];


  $scope.onOff = true;


  // 视图监听
  $scope.$on('$ionicView.beforeEnter',function(e){
    $scope.func_doRefresh();
    func_getAllData();
  })

  // 刷新数据方法
  $scope.func_doRefresh = function(){

    var promise = DaintyFty.refreshGoodsList();

    promise.then(
      function(data){
        if(data){
         $.each(data, function (i, item) {
            item.num = 0;
            item.onOff = false;
            $scope.obj_goodsListData.push(item);
          });
        }
      }
    )
  }

  // 下拉刷新
  
  $scope.func_loadMoreGoodsList = function(){
    $scope.onOff = false;
    var promise = DaintyFty.loadMoreGoodsList();
    promise.then(
      function (data) {
        
        // 为了代码健壮性做判断
        if (data) {
          $.each(data, function (i, item) {
            $scope.obj_goodsListData.push(item);
          });
          $scope.onOff = true;
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

  // 获取数据
  var items = $scope.obj_goodsListData;
  function func_getAllData(){
    var promise = DaintyFty.getAllData();
    promise.then(
      function(data){
        for(var i=0;i<items.length;i++){
          for(var j=0;j<data.length;j++){
            if(items[i].id == data[j].id){
              items[i].num = data[j].num;
              items[i].onOff = true;
            }
          } 
        }
      }
    )
  };

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
    };
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

  $scope.iconList = ['凉菜','家常菜','汤羹','酒水','甜点','主食','特价菜'];
  
})