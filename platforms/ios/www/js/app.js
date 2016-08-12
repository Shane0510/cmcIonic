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

  BackandProvider.setAppName('cmcIonic');
  BackandProvider.setSignUpToken('c84192de-0019-4f8c-aa79-9c4dda98583e');
  BackandProvider.setAnonymousToken('dfae337f-8784-4f2c-a56a-a75ee8899286');

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
});
