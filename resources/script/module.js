angular.module("Csibe-app", ['ui.router', 'angular-loading-bar', 'ui.bootstrap', 'ngStorage'])
        .controller("menuCtrl", menuCtrl)
        .controller("welcomeCtrl", welcomeCtrl)
        .controller("roomsCtrl", roomsCtrl)
        .controller("roomDetailsCtrl", roomDetailsCtrl)
        .controller("LoginModalCtrl", LoginModalCtrl)
        .factory("expandDetailService", expandDetailService)
        .factory("slidingHeaderLayoutService", slidingHeaderLayoutService)
        .factory("loginModalService", loginModalService)
        .service("UsersApi", UsersApi)
        .service("AuthService", AuthService)
        .service("TokenHandler", TokenHandler)
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $stateProvider
                        .state('welcome', {
                            url: '/welcome',
                            templateUrl: './templates/welcome.html',
                            controller: 'welcomeCtrl',
                            data: {
                                requireLogin: false
                            }
                        })
                        .state('rooms', {
                            url: '/rooms',
                            templateUrl: './templates/rooms.php',
                            controller: 'roomsCtrl',
                            data: {
                                requireLogin: false
                            }
                        })
                        .state('roomdetails', {
                            url: '/rooms/view/:roomid',
                            templateUrl: './templates/roomDetails.html',
                            controller: 'roomDetailsCtrl',
                            controllerAs: 'details',
                            data: {
                                requireLogin: true
                            }
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
        .config(["$httpProvider", function ($httpProvider) {
//                $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
//                    var AuthService, $http, $state;
//                    // this trick must be done so that we don't receive
//                    // `Uncaught Error: [$injector:cdep] Circular dependency found`
//                    $timeout(function () {
//                        AuthService = $injector.get('AuthService');
//                        $http = $injector.get('$http');
//                        $state = $injector.get('$state');
//                    });
//                    return {
//                        responseError: function (rejection) {
//                            if (rejection.status !== 401) {
//                                return rejection;
//                            }
//
//                            var deferred = $q.defer();
//                            AuthService.claim()
//                                    .then(function () {
//                                        deferred.resolve($http(rejection.config));
//                                    })
//                                    .catch(function () {
//                                        $state.go('welcome');
//                                        deferred.reject(rejection);
//                                    });
//                            return deferred.promise;
//                        }
//                    };
//                });
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
        .run(['$rootScope', '$state', '$stateParams', 'slidingHeaderLayoutService', 'AuthService', 'TokenHandler',
            function ($rootScope, $state, $stateParams, slidingHeaderLayoutService, AuthService, TokenHandler) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                slidingHeaderLayoutService.init();
                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromPatams) {
                    console.info("fromstate", fromState);
                    console.info("tostate", toState);
                    
                    var requireLogin = toState.data.requireLogin;
                    var isStateCancelled = false;
                    if (requireLogin) {

                        if (angular.isUndefined(TokenHandler.getToken())) {
                            console.info("event", event);
                            event.preventDefault();
                            isStateCancelled = true;
                        }

                        AuthService.claim().then(function () {
                            if (isStateCancelled) {
                                
                                return $state.go(toState.name, toParams);
                            }
                        }, function () {
                            
                            if (fromState.abstract)
                                return $state.go("welcome");
                            else
                                return $state.go(fromState.name, fromPatams);
                        });

                    }
                });
            }
        ]);