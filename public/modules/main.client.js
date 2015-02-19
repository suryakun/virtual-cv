'use strict';

var app = angular.module('myApp',['ngRoute','ngTouch','ui.bootstrap.tabs','ui.bootstrap.datepicker','ui.bootstrap.tpls','angularFileUpload']);

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

app.controller('registerController', ['$scope','$http', '$upload', '$timeout', function($scope,$http,$upload,$timeout){	

	/* Tab Navigation */
	$scope.tab = {
		personal : false,
		education: true,
		experience: true
	}
	$scope.nextToEducation = function(){
		$scope.tab.personal = true;		
		$scope.tab.education = false;
		$scope.tab.experience = true;
		// console.log($scope.bio);
	}
	$scope.nextToPersonal = function(){
		$scope.tab.personal = false;
		$scope.tab.education = true;		
		$scope.tab.experience = true;
	}
	$scope.nextToExperience = function(){
		$scope.tab.personal = true;
		$scope.tab.education = true;		
		$scope.tab.experience = false;
		// console.log($scope.colleges);
		// console.log($scope.skills);
	}

	/* Biodata user model */
	$scope.bio = {
		fullname:undefined,
		email:undefined,
		phone:undefined,
		address:undefined,
		avatar: undefined,
		gender: undefined
	}

	/* College user model */
	$scope.colleges = [{name: undefined, degree: undefined}];
	$scope.addCollege = function(){
		$scope.colleges.push({name: undefined, degree: undefined});		
	}
	$scope.removeCollege = function(){
		$scope.colleges.splice($scope.colleges.length -1,1);
	}

	/* Skill user model */
	$scope.skills = [];
	$scope.addSkill = function(){
		$scope.skills.push({name:undefined,level:undefined});
	}
	$scope.removeSkill = function(){
		$scope.skills.splice($scope.skills -1,1);
	}

	/* Experience user model */
	$scope.experiences = [{company_name:undefined,
							start_date:undefined,
							end_date:undefined,
							job_desc:undefined}];

	$scope.optionExperience = { showTopPanel : false, showQuestionExperience : true, showQuestionPortfolio: true };


	$scope.addExperience = function(){
		$scope.experiences.push({company_name:undefined,
								start_date:undefined,
								end_date:undefined,
								job_desc:undefined});
	}
	$scope.removeExperience = function(){
		$scope.experiences.splice($scope.experiences.length -1,1);
	}	

	/* Portfolio user */
	$scope.showPortfolio = function(){
		$scope.optionExperience.showQuestionPortfolio = false;		
	}

	$scope.portfolios = [];
	$scope.addPortfolio = function(){
		$scope.portfolios.push({ title: undefined, description: undefined});
	}
	
	$scope.removePortfolio = function(){
		$scope.portfolios.splice($scope.portfolios.length -1,1);
	}	

	/* Upload and get avatar */
	$scope.getAvatar = function(){
		return $scope.bio.avatar !== undefined ? $scope.bio.avatar : '/images/default.png';		
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
					console.log(data);
					$scope.bio.avatar = data;
				});
			};
		};
	}

	/* Configure datepicker */
	$scope.datePickerState = {};
	$scope.open = function($event,OpenedState){
		$event.preventDefault();
	    $event.stopPropagation();
	    $scope.datePickerState[OpenedState] = !$scope.datePickerState[OpenedState];
	}

	/* Configure datepicker */
	$scope.finishRegistration = function(){
		console.log($scope.bio);
		console.log($scope.colleges);
		console.log($scope.skills);
		console.log($scope.experiences);
		console.log($scope.portfolios);
	}

}]);