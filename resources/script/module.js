angular.module("Csibe-app", ['ui.router', 'angular-loading-bar'])
        .controller("menuCtrl", menuCtrl)
        .controller("welcomeCtrl", welcomeCtrl)
        .controller("roomsCtrl", roomsCtrl)
        .controller("roomDetailsCtrl", roomDetailsCtrl)
        .factory("expandDetailService", expandDetailService)
        .factory("slidingHeaderLayoutService", slidingHeaderLayoutService)
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $stateProvider
                        .state('welcome', {
                            url: '/welcome',
                            templateUrl: './templates/welcome.html',
                            controller: 'welcomeCtrl',
                            onEnter: function () {
                            }
                        })
                        .state('rooms', {
                            url: '/rooms',
                            templateUrl: './templates/rooms.php',
                            controller: 'roomsCtrl',
                            onExit: function () {
                            }
                        })
                        .state('roomdetails', {
                            url: '/rooms/view/:roomid',
                            templateUrl: './templates/roomDetails.html',
                            controller: 'roomDetailsCtrl',
                            controllerAs: 'details'
                        })
                        .state('menu', {
                            url: '/menu',
                            templateUrl: './menu.html'
                        });

                $urlRouterProvider.otherwise('welcome');
            }])
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
                cfpLoadingBarProvider.includeSpinner = false;
            }])
        .directive("routerhref", function ($compile) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var el = $compile('<a ui-sref="' + attrs.link + '">' + attrs.text + '</a>')(scope);
                    element.children().remove();
                    element.append(el);
                }
            };
        })
        .run(
                ['$rootScope', '$state', '$stateParams', 'slidingHeaderLayoutService',
                    function ($rootScope, $state, $stateParams, slidingHeaderLayoutService) {
                        $rootScope.$state = $state;
                        $rootScope.$stateParams = $stateParams;
                        slidingHeaderLayoutService.init();
                    }
                ]);