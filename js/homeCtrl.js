var homeCtrl = function($scope, $http){
    $http.get("backend/test.php");
};
homeCtrl.$inject = ["$scope", "$http"];