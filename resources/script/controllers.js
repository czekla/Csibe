var welcomeCtrl = function () {
};
welcomeCtrl.$inject = [];

var roomsCtrl = function ($http, expandDetailService, slidingHeaderLayoutService) {
    slidingHeaderLayoutService.open();
    expandDetailService.Grid().init();
};
roomsCtrl.$inject = ["$http", "expandDetailService", "slidingHeaderLayoutService"];

var roomDetailsCtrl = function ($http, $stateParams, $sce, slidingHeaderLayoutService) {
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

    $http.post("./backend/timelinedata.json", {
        roomid: roomid
    }).success(function (data, status, headers, config) {
        $vm.timeline = data.timeline;
    });
    
    $vm.printHtml = function (content) {
        return $sce.trustAsHtml(content);
    };

    $vm.closePanel = function () {
        var radios = angular.element('.timeline-event input[type="radio"]');
        angular.forEach(radios, function (el) {
            el.checked = false;
        });
    };

};
roomDetailsCtrl.$inject = ["$http", "$stateParams", "$sce", "slidingHeaderLayoutService"];