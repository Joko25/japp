angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('loginCtrl', function($scope, $state, $http, $ionicPopup, $ionicLoading) {
  $ionicLoading.hide();
  //$scope.chat = Chats.get($stateParams.chatId);
  $scope.data = {};
  $scope.face = 'img/iconv.png';
 
  $scope.login = function() {
   // console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    $ionicLoading.show({
      template: '<ion-spinner icon="dots"></ion-spinner>'
      //duration: 1000
    }).then(function(){
       //console.log("The loading indicator is now displayed");
    });
    $url = "http://117.102.106.235/sita/forms/Newfolder/login.php";

    $http.post($url, {username : $scope.data.username, password: $scope.data.password}).then(function (res){
      //$scope.response = res.data;
      console.log(res);
      if (res.data.trim()=='success') {
        $ionicLoading.hide();
        $state.go("tab.dash");
      }else{
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: res.data
        });
        $scope.data.username = '';
        $scope.data.password = '';
      }
    });
    // window.location();
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
