angular.module('cmcIonic.controllers', [])

.controller('AppCtrl', function(Backand, $state, $scope, $rootScope, $ionicModal, LoginService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.signupData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.oModal1 = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.oModal1.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.oModal1.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    console.log('email is', $scope.loginData.email);
    console.log('password is', $scope.loginData.password);
    LoginService.signin($scope.loginData.email, $scope.loginData.password)
      .then(function(){
          onLogin();
          $scope.oModal1.hide();
      }, function (error) {
         console.log(error)
      })
  };

  function onLogin(){
       $rootScope.$broadcast('authorized');
       $state.go('app.home');
   }



  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.oModal2 = modal;
  });

  // Triggered in the signup modal to close it
  $scope.closeSignup = function() {
    $scope.oModal2.hide();
  };

  // Open the signup modal
  $scope.signup = function() {
    $scope.oModal2.show();
  };

  // Perform the signup action when the user submits the signup form
  $scope.doSignup = function() {
    console.log('Doing signUp', $scope.signupData);
    this.errorMessage = '';
    LoginService.signup($scope.signupData.firstName, $scope.signupData.lastName, 
                        $scope.signupData.email, $scope.signupData.password, 
                        $scope.signupData.again)
                .then(function (response) {
                    // success
                    onLogin();
                    $scope.oModal2.hide();
                }, function (reason) {
                    if(reason.data.error_description !== undefined){
                        this.errorMessage = reason.data.error_description;
                    }
                    else{
                        this.errorMessage = reason.data;
                    }
                })
  };

  //loginData.error = '';
  this.errorMessage = '';
})


.controller('EventlistsCtrl', function($scope) {
})

.controller('buyTicketslistCtrl', function($scope) {
});
