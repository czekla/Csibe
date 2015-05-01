var welcomeCtrl = function ($scope, $http) {
    //$http.get("backend/test.php");
};
welcomeCtrl.$inject = ["$scope", "$http"];

var roomsCtrl = function ($http, expandDetailService) {
    expandDetailService.Grid().init();
};
roomsCtrl.$inject = ["$http", "expandDetailService"];

var roomDetailsCtrl = function ($http, $stateParams) {
    var $vm = this;
    console.log($stateParams.roomid);
    var roomid = $stateParams.roomid;
    
    $http.post("./backend/getRoomDetails.php", {
        roomid: roomid
    }).success(function (data, status, headers, config) {
        $vm.room = {
            name: data.roomDetails.name,
            description: data.roomDetails.description,
            thumbnail: data.roomDetails.thumbnail,
            stars: data.roomDetails.stars,
            difficulty: data.roomDetails.difficulty,
            min_players: data.roomDetails.min_players,
            max_players: data.roomDetails.max_players,
            votes: data.roomDetails.votes
        };
    });


};
roomDetailsCtrl.$inject = ["$http", "$stateParams"];