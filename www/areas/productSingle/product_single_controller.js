angular.module('productSingle.controller', ['productSingle.service'])

.controller('ProductSingleCtrl', function($scope,$ionicSideMenuDelegate,$ionicHistory,$stateParams,ProductSingleFty,IndexdbJs) {

  var foodDate = [
    {
      id: 1,
      name: '糖醋排骨',
      lastPrice: '16.7',
      currentPrice: '15.5',
      star: '5',
      imgUrl: 'img/gallery/2-th.jpg',
      introduce: '糖醋排骨(Sweet and Sour Spare Ribs)是糖醋味型中具有代表性的一道大众喜爱的汉族传统名菜，它选用新鲜猪子排作料，肉质鲜嫩，成莱色泽红亮油润。猪排骨具有滋阴润燥、益精补血的功效；适宜于气血不足，阴虚纳差者。',
      food: '糖醋，猪大骨，猪脊骨，猪颈排',
      taste: '酸甜'
    },
    {
      id: 2,
      name: '软炸里脊',
      lastPrice: '24.7',
      currentPrice: '14.5',
      star: '5',
      imgUrl: 'img/gallery/3-th.jpg',
      introduce: '软炸里脊是北京著名的汉族特色美食。属于京菜，口味鲜香，滑嫩可口。主要食材是猪里脊肉和鸡蛋，主要烹饪工艺是炸。可佐餐食，也可作下酒佳肴，是一款老少皆宜的不错菜品。也可做烧烤菜品，烤出来的味道更加美味。',
      food: '猪里脊肉,鸡蛋',
      taste: '鲜香，滑嫩'
    },
    {
      id: 3,
      name: '宫爆鸡丁',
      lastPrice: '16.7',
      currentPrice: '14.5',
      star: '5',
      imgUrl: 'img/gallery/1-th.jpg',
      introduce: '宫保鸡丁，是一道闻名中外的汉族传统名菜。鲁菜、川菜、贵州菜中都有收录，原料、做法有差别。该菜式的起源与鲁菜中的酱爆鸡丁，和贵州菜的胡辣子鸡丁有关，后被清朝山东巡抚、四川总督丁宝桢改良发扬，形成了一道新菜式——宫保鸡丁，并流传至今，此道菜也被归纳为北京宫廷菜。之后宫保鸡丁也流传到国外。',
      food: '鸡肉，辣椒，花生',
      taste: '干，香，甜，辣'      
    },
    {
      id: 4,
      name: '土豆炖排骨',
      lastPrice: '16.7',
      currentPrice: '34.5',
      star: '5',
      imgUrl: 'img/gallery/4-th.jpg',
      introduce: '土豆炖排骨是以土豆和排骨为主要食材的家常菜，味道浓香，补肾养血，滋阴润燥，营养价值丰富。',
      food: '土豆，排骨',
      taste: '浓香'
    },
    {
      id: 5,
      name: '精品甜点',
      lastPrice: '16.7',
      currentPrice: '26.5',
      star: '5',
      imgUrl: 'img/gallery/5-th.jpg',
      introduce: '甜食，是治疗抑郁、放松心情的灵丹妙药，大多人在犒劳自己的时候喜欢来一点甜的，忘记减肥、忘记塑身、忘记那些好看但绷着身体的华丽衣服。一般来说，喜欢吃甜食的人，脾气都不坏，她们的坏情绪可以被巧克力、蛋糕、布丁、奶酪等一切甜美的食物代谢殆尽。',
      food: '面粉，奶油',
      taste: '甜'
    }
  ];

  $scope.$on('$ionicView.enter',function(e){
    randerPage();
  })

  $scope.foodConten = {
    num: 0
  };

  // 初始化页面
  function randerPage(){
    var foodId = $stateParams.id;

    $.each(foodDate,(i,item)=>{
      if(item.id == foodId){
         $scope.foodConten.item = item;
      }
    })


    var promise = ProductSingleFty.get(foodId);
    promise.then(
      function(data){
        if(data){
          $scope.foodConten.num = data.num;
        }
      }
    )
  };

  var items = $scope.foodConten;
  
  $scope.add = function(foodsId){
    items.num ++ ;
    var _data = items.item;
    var _item = {
      id: foodsId,
      name: _data.name,
      lastPrice: _data.lastPrice,
      currentPrice: _data.currentPrice,
      star: _data.star,
      imgUrl: _data.imgUrl,
      num:  items.num,
      onOff: 'true'
    };
    func_putDB(_item); 
  }

  // 点击减1
  $scope.minus = function(foodsId){
    items.num -- ;
    var _data = items.item;
    var _item = {
      id: foodsId,
      name: _data.name,
      lastPrice: _data.lastPrice,
      currentPrice: _data.currentPrice,
      star: _data.star,
      imgUrl: _data.imgUrl,
      num:  items.num,
      onOff: 'true'
    };
    if(items.num <= 0){
      items.num = 0;
      func_deleteDB(_item)
      return;
    }

    func_putDB(_item);
  }

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

  

  $scope.toggleSideMenu = function(){
    $ionicSideMenuDelegate.toggleRight()
  }
  
  $scope.menus = [
    {
      iconName: 'ion-android-home',
      name: '主页',
      url: '#/tab/home'
    },
    {
      iconName: 'ion-android-star',
      name: '推荐',
      url: '#/tab/dainty'
    },
    {
      iconName: 'ion-android-list',
      name: '订单',
      url: '#/order'
    }
  ];

  $scope.func_goBack = function(){

    //$ionicHistory.goBack();
    window.history.back();
  }

})