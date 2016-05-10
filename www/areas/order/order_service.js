angular.module('order.service', [])

.factory('OrderFty', function($q,IndexdbJs) {
  return {
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
