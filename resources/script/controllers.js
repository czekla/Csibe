var welcomeCtrl = function () {
};
welcomeCtrl.$inject = [];

var roomsCtrl = function ($http, expandDetailService, slidingHeaderLayoutService) {
    slidingHeaderLayoutService.open();
    expandDetailService.Grid().init();
};
roomsCtrl.$inject = ["$http", "expandDetailService", "slidingHeaderLayoutService"];

var roomDetailsCtrl = function ($http, $stateParams, slidingHeaderLayoutService) {
    slidingHeaderLayoutService.open();
    slidingHeaderLayoutService.noscroll();
    var $vm = this;
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
            escapetime: data.roomDetails.escapetime,
            min_players: data.roomDetails.min_players,
            max_players: data.roomDetails.max_players
        };
    });

    $vm.uncheckRadio = function(event){
        console.log(event);
        console.log(event.target);
        console.log(event.target.checked);
//        if (event.target.checked) event.target.checked = false;
    };

};
roomDetailsCtrl.$inject = ["$http", "$stateParams", "slidingHeaderLayoutService"];