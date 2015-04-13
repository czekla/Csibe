angular.module("Csibe-app", ['ui.router'])
        .controller("homeCtrl", homeCtrl)
        .controller("onPageLoadCtrl", onPageLoadCtrl)
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $stateProvider
                        .state('slideToUnlock', {
                            url: '/slideToUnlock',
                            templateUrl: './slideToUnlock.html',
                            controller: 'homeCtrl'
                        })
                        .state('home', {
                            url: '/home',
                            templateUrl: './home.html',
                            controller: 'onPageLoadCtrl'
                        });

                $urlRouterProvider.otherwise('slideToUnlock');
            }]);