// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var App = angular.module('starter', ['ionic', 'authApp', 'appServices', 'clientApp']);

App.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: '/pages/login/login.html',
        controller: 'AccountController',
        controllerAs: 'account',
        onEnter: checkLogged
    })
    .state('signup', {
        url: '/signup',
        templateUrl: '/pages/signup/signup.html',
        controller: 'AccountController',
        controllerAs: 'account',
        onEnter: checkLogged
    })
    .state('private', {
        url: "/private",
        abstract: true,
        template: '<ui-view/>',
        onEnter: function($state, AccountService){
          if(!AccountService.currentUser()){
            $state.go('login');
          }
        }
    })
    .state('private.client', {
        url: '/private/client',
        templateUrl: '/pages/client/base.html'
    })
    .state('private.client.home', {
        url: '/private/client/home',
         views: {
            'menuContent': {
              templateUrl: '/pages/client/home/home.html',
              controller: 'ClientHomeController'
            }
          }
    });

  $urlRouterProvider.otherwise('/login');
})

function checkLogged($state, AccountService, $ionicLoading, $rootScope){
  $ionicLoading.show();
  AccountService.currentUser()
    .then(function(value) {
      if(value){
        $rootScope.user = value;
        $state.go('private.client.home');
      }

      $ionicLoading.hide();
    });
  }
