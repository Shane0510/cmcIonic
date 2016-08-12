// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cmcIonic', ['ionic', 'backand','cmcIonic.controllers', 'cmcIonic.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function(BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

  var appName = 'cmcwebapp';

  var token = '06c3edbd-6603-482f-9294-4fed85cbe9d9';

  BackandProvider.setAppName(appName);
  BackandProvider.setSignUpToken(token);
  BackandProvider.setAnonymousToken('8d93fc6f-5ae8-4d1b-8a28-c22289afdd7d');

  $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.signup', {
        url: '/signup',
        views: {
          'menuContent': {
            templateUrl: 'templates/signup.html'
          }
        }
      })

      .state('app.home', {
          url: '/home',
          views: {
            'menuContent': {
              templateUrl: 'templates/home.html'
            }
          }
        })
        .state('app.eventlists', {
          url: '/eventlists',
          views: {
            'menuContent': {
              templateUrl: 'templates/eventlists.html',
              controller: 'EventlistsCtrl'
            }
          }
        })

      .state('app.buyTickets', {
        url: '/buyTickets',
        views: {
          'menuContent': {
            templateUrl: 'templates/buyTickets.html',
            controller: 'buyTicketslistCtrl'
          }
        }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
  $httpProvider.interceptors.push('APIInterceptor');
})

.run(function ($rootScope, $state, LoginService, Backand) {

        function unauthorized() {
            console.log("user is unauthorized, sending to login");
            $state.go('templates/login.html');
        }

        function signout() {
            LoginService.signout();
        }

        $rootScope.$on('unauthorized', function () {
            unauthorized();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState.name == 'templates/login.html') {
                signout();
            }
            else if (toState.name != 'templates/login.html' && Backand.getToken() === undefined) {
                unauthorized();
            }
        });

    })