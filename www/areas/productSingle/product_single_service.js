angular.module('productSingle.service', [])

.factory('ProductSingleFty', function($q,IndexdbJs) {
	return {
		get: function(id){
			var deferred = $q.defer();
			IndexdbJs.get(Number(id),'order',function(data){
				deferred.resolve(data);
			},function(err){
				defeffed.reject(err);
			});
			return deferred.promise;
		}
	};
})