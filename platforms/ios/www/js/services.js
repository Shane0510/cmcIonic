angular.module('cmcIonic.services', [])

	.service('LoginService', function (Backand) {
        var service = this;

        service.signin = function (email, password, appName) {
            //call Backand for sign in
            return Backand.signin(email, password);
        };

        service.anonymousLogin= function(){
            // don't have to do anything here,
            // because we set app token att app.js
        };

        service.signout = function () {
            return Backand.signout();
        };

        service.signup = function(username, email, password, confirmPassword){
            return Backand.signup(username, email, password, confirmPassword);
        }
    })

    .service('AuthService', function($http, Backand){

    var self = this;
    var baseUrl = Backand.getApiUrl() + '/1/objects/';
    self.appName = '';//CONSTS.appName || '';
    self.currentUser = {};

    loadUserDetails();

    function loadUserDetails() {
        self.currentUser.name = Backand.getUsername();
        if (self.currentUser.name) {
            getCurrentUserInfo()
                .then(function (data) {
                    self.currentUser.details = data;
                });
        }
    }

    self.signIn = function (username, password, appName) {
        return Backand.signin(username, password, appName)
            .then(function (response) {
                loadUserDetails();
                return response;
            });
    };

    self.signUp = function (email, username, password, conmfirmPassword, parameters) {
        return Backand.signup(email, username, password, confirmPassword, parameters)
            .then(function (signUpResponse) {

                if (signUpResponse.data.currentStatus === 1) {
                    return self.signIn(username, password)
                        .then(function () {
                            return signUpResponse;
                        });

                } else {
                    return signUpResponse;
                }
            });
    }

});