'use strict';

var app = angular.module('myApp',['ngMessages','ngRoute','ngTouch','ui.bootstrap.tabs','ui.bootstrap.datepicker','ui.bootstrap.tpls','angularFileUpload','unique','temporarydata']);

app.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider,$httpProvider) {
	$routeProvider
		.when('/register',{
			controller: 'registerController',
			templateUrl: '/partials/register.html'
		})
		.when('/select-template', {
			controller: 'selectTemplateController',
			templateUrl: '/partials/select-template.html'
		})
		.when('/template-editable/:template', {
			controller: 'editableTemplateController',
			templateUrl: '/templates/digitalcv/index.html'
		})
		.otherwise({
			redirectTo: '/register'
		});

	$locationProvider.html5Mode(true);
}]);

app.controller('registerController', ['$scope', '$http', '$upload', '$timeout', '$location', 'storage', function($scope,$http,$upload,$timeout,$location,storage){	

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
		$scope.counterDate = $scope.counterDate + 1 ;
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
    $scope.counterDate = 1;
	$scope.datePickerState = {};
	$scope.open = function($event,OpenedState){
		$event.preventDefault();
	    $event.stopPropagation();
	    $scope.datePickerState[OpenedState] = !$scope.datePickerState[OpenedState];
	    console.log(OpenedState);
	}

	/* Configure datepicker */
	$scope.finishRegistration = function(){		
		$http.post('/register/save_register', 
			{ bio: $scope.bio,
			colleges: $scope.colleges,
			skills : $scope.skills,
			experiences: $scope.experiences,
			portfolios: $scope.portfolios }
		)
		.success(function(data,status,header,config){
			storage.insertBiodata($scope.bio);			
			storage.insertEducations($scope.colleges);
			storage.insertSkills($scope.skills);
			storage.insertExperience($scope.experiences);
			storage.insertPortfolio($scope.portfolios);
			console.log(storage.biodata);
			$location.path("select-template");
		})
		.error(function(data,status,header,config){
			console.log(status);
		});		
	}

}]);

app.controller('selectTemplateController', ['$scope', function($scope){
	
}]);

app.controller('editableTemplateController', ['$scope', '$q', 'storage', '$timeout', function($scope,$q,storage,$timeout){
	var tmpdata = storage.getData();
	for (var i = 0; i < tmpdata.experiences.length; i++) {
		var sdate = new Date(tmpdata.experiences[i].end_date);
		tmpdata.experiences[i].end_date = sdate.getFullYear();
	};

	$scope.datauser = tmpdata;

}]);