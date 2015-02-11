'use strict';

var app = angular.module('myApp',['ngRoute','ngTouch','ui.bootstrap.tabs','ui.bootstrap.tpls','angularFileUpload']);

app.config(['$routeProvider','$locationProvider','$httpProvider',function($routeProvider,$locationProvider,$httpProvider) {
	$routeProvider
		.when('/register',{
			controller: 'registerController',
			templateUrl: '/partials/register.html'
		})
		.otherwise({
			redirectTo: '/register'
		});

	$locationProvider.html5Mode(true);
}]);

app.controller('registerController', ['$scope','$http', '$upload', function($scope,$http,$upload){
	$scope.bio = {
		fullname:undefined,
		email:undefined,
		phone:undefined,
		address:undefined,
		avatar: undefined
	}

	$scope.getAvatar = function(){
		return $scope.bio.avatar !== undefined ? $scope.bio.avatar : '/images/default.jpg';		
	}

	$scope.upload = function(files){
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				$upload.upload({
					url: 'upload/avatar',
					fields: {},
					file : file
				})
				.progress(function(evt){
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('Progress '+ progressPercentage + '% ' + evt.config.file.name );
				})
				.success(function(data,status,header,config){
					console.log(config);
					$scope.bio.avatar = config.url;
				});
			};
		};
	}

}]);