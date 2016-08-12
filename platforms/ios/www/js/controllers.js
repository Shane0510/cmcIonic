angular.module('cmcIonic.controllers', [])

.controller('AppCtrl', function(Backand, $scope, $rootScope, $ionicModal, $timeout, LoginService) {

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
    LoginService.signin(this.loginData.email, this.loginData.password)
      .then(function(){
          onLogin();
      }, function (error) {
         console.log(error)
      })
  };

  

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
    console.log('Doing login', $scope.loginData);

    // Simulate a signup delay. Remove this and replace with your signup
    // code if using a signup system
    $timeout(function() {
      $scope.closeSignup();
    }, 1000);
  };

//   .controller('SignUpCtrl', function (Backand, $state, $rootScope, LoginService) {
//         var vm = this;

//         vm.signup = signUp;

//         function signUp(){
//             vm.errorMessage = '';

//             LoginService.signup(vm.firstName, vm.lastName, vm.email, vm.password, vm.again)
//                 .then(function (response) {
//                     // success
//                     onLogin();
//                 }, function (reason) {
//                     if(reason.data.error_description !== undefined){
//                         vm.errorMessage = reason.data.error_description;
//                     }
//                     else{
//                         vm.errorMessage = reason.data;
//                     }
//                 });
//         }


//         function onLogin() {
//             $rootScope.$broadcast('authorized');
//             $state.go('tab.dashboard');
//         }


//         vm.email = '';
//         vm.password ='';
//         vm.again = '';
//         vm.firstName = '';
//         vm.lastName = '';
//         vm.errorMessage = '';
//     })
// })

.controller('EventlistsCtrl', function($scope) {
})

.controller('buyTicketslistCtrl', function($scope) {
});
