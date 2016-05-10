angular.module('dainty.service', [])

.factory('DaintyFty', function($q,IndexdbJs) {
  return {
  	// 刷新商品列表
  	refreshGoodsList: function(){
  		var obj_goodsListDate = [
	  		{
	  			id: 1,
	  			name: '糖醋排骨',
	  			lastPrice: '16.7',
	  			currentPrice: '15.5',
	  			star: '5',
	  			imgUrl: 'img/gallery/2-th.jpg'
	  		},
	  		{
	  			id: 2,
	  			name: '软炸里脊',
	  			lastPrice: '24.7',
	  			currentPrice: '14.5',
	  			star: '5',
	  			imgUrl: 'img/gallery/3-th.jpg'
	  		},
	  		{
	  			id: 3,
	  			name: '宫爆鸡丁',
	  			lastPrice: '16.7',
	  			currentPrice: '14.5',
	  			star: '5',
	  			imgUrl: 'img/gallery/1-th.jpg'
	  		},
	  		{
	  			id: 4,
	  			name: '土豆炖排骨',
	  			lastPrice: '16.7',
	  			currentPrice: '34.5',
	  			star: '5',
	  			imgUrl: 'img/gallery/4-th.jpg'
	  		},
	  		{
	  			id: 5,
	  			name: '精品甜点',
	  			lastPrice: '16.7',
	  			currentPrice: '26.5',
	  			star: '5',
	  			imgUrl: 'img/gallery/5-th.jpg'
	  		}
  		];
  		var deferred = $q.defer();
      deferred.resolve(obj_goodsListDate);
      return deferred.promise;
  	},

  	// 下拉加载更多列表
  	loadMoreGoodsList: function(){
  		var obj_goodsListDate = [
	  		{
	  			id: 6,
	  			name: '软炸里脊',
	  			lastPrice: '16.7',
	  			currentPrice: '14.5',
	  			star: '5',
	  			imgUrl: 'img/gallery/3-th.jpg'
	  		},
	  		{
	  			id: 7,
	  			name: '糖醋排骨',
	  			lastPrice: '16.7',
	  			currentPrice: '15.5',
	  			star: '5',
	  			imgUrl: 'img/gallery/2-th.jpg'
	  		},
	  		{
	  			id: 8,
	  			name: '宫爆鸡丁',
	  			lastPrice: '16.7',
	  			currentPrice: '24.5',
	  			star: '5',
	  			imgUrl: 'img/gallery/1-th.jpg'
	  		},
	  		{
	  			id: 9,
	  			name: '精品甜点',
	  			lastPrice: '16.7',
	  			currentPrice: '34.5',
	  			star: '5',
	  			imgUrl: 'img/gallery/5-th.jpg'
	  		},
	  		{
	  			id: 10,
	  			name: '土豆炖排骨',
	  			lastPrice: '16.7',
	  			currentPrice: '26.5',
	  			star: '5',
	  			imgUrl: 'img/gallery/4-th.jpg'
	  		}
  		];

  		var deferred = $q.defer();
      deferred.resolve(obj_goodsListDate);
      return deferred.promise;
  	},

  	// 获取本地数据
  	getAllData: function () {
      var deferred = $q.defer();
      IndexdbJs.getAll("order",function(data){
        deferred.resolve(data);
      },function(e){
        deferred.reject(e);
      })
      return deferred.promise;
    } 
  }
});
