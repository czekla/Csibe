var welcomeCtrl = function($scope, $http){
    //$http.get("backend/test.php");
};
welcomeCtrl.$inject = ["$scope", "$http"];

var roomsCtrl = function($scope, $http, expandDetailService){
    expandDetailService.Grid.init();
};
roomsCtrl.$inject = ["$scope", "$http", "expandDetailService"];

var roomDetailsCtrl = function($scope, $http, $stateParams){
    //$http.get("backend/test.php");
    console.log($stateParams.roomid);
};
roomDetailsCtrl.$inject = ["$scope", "$http" ,"$stateParams"];