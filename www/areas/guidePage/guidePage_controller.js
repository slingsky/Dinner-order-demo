angular.module('guidePage.controllers', ['guidePage.services'])

.controller('GuidePageCtrl', function($scope,$state) {
  var mySwiper = new Swiper('.swiper-container', {
    pagination : '.swiper-pagination',
    touchRatio : 0.5,
    onSlideChangeEnd: function(swiper){
      var index = mySwiper.activeIndex + 1;
      if(index==2|| index==3){
        var item = $('#tips-'+index);
        if(item.hasClass('hidden')){
          item.removeClass('hidden').addClass('guide-show')
        }
      }
    }
  })
  $scope.func_goHome = function(){
    $state.go('tab.home');
    localStorage["isFirst"]=true;
  }
})


