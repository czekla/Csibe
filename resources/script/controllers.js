var menuCtrl = function ($rootScope, slidingHeaderLayoutService) {
    $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {

                if (toState.name == "welcome") {
                    slidingHeaderLayoutService.close();
                } else {
                    slidingHeaderLayoutService.open();
                    slidingHeaderLayoutService.noscroll();
                }
            });
};
menuCtrl.$inject = ["$rootScope", "slidingHeaderLayoutService"];

var welcomeCtrl = function () {
};
welcomeCtrl.$inject = [];

var roomsCtrl = function ($http, expandDetailService) {
    expandDetailService.Grid().init();
};
roomsCtrl.$inject = ["$http", "expandDetailService"];

var roomDetailsCtrl = function ($http, $stateParams, $sce) {
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

    $http.post("./backend/getTimelineData.php", {
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
roomDetailsCtrl.$inject = ["$http", "$stateParams", "$sce"];

var LoginModalCtrl = function ($scope, UsersApi) {
    this.cancel = $scope.$dismiss;

    this.submit = function (email, password) {
        UsersApi.login(email, password).then(function (user) {
            $scope.$close(user);
        });
    };
};
LoginModalCtrl.$inject = ["$scope", "UsersApi"];