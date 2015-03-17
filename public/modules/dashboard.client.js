var dashboard = angular.module('dashboard', ['ngCookies','ngMessages','ngRoute','ngTouch','ui.bootstrap.tabs','ui.bootstrap.datepicker','ui.bootstrap.tpls','angularFileUpload','unique','temporarydata','xeditable']);

dashboard.run(function(editableOptions){
	editableOptions.theme = 'bs3';	
});

dashboard.config(['$routeProvider','$locationProvider','$httpProvider',function($routeProvider,$locationProvider,$httpProvider) {
	$routeProvider
		.when('/',{
			controller : 'dashboardMainController',
			templateUrl : '/partials/dashboard-home.html'
		})	
		.when('/register', {
			controller: 'registerController',
			templateUrl : '/partials/new-register.html'
		})
		.when('/select-template', {
			controller : 'selectTemplateController',
			templateUrl: '/partials/select-template.html'
		})
		.otherwise({
			redirectTo: '/register'
		});

	$locationProvider.html5Mode(false).hashPrefix('!');
}]);

dashboard.controller('headerController', ['$rootScope', function($rootScope){
	
}]);

dashboard.controller('sideController', ['$scope','$rootScope','$location','$timeout', function($scope, $rootScope, $location, $timeout){
	$rootScope.$on('changeMenuState', function(event,state){
		if (state == 1 ) {
			angular.element("#main-content").css('margin-left','210px');
		}else{
			angular.element("#main-content").css('margin-left','0px');
		};
		$scope.showRightPanel = state;
	});
}]);

dashboard.controller('notifController', ['$rootScope', function($rootScope){
	
}]);

dashboard.controller('dashboardMainController', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.$emit('changeMenuState', 1);
}]);

dashboard.controller('registerController', ['$rootScope','$scope', '$http', '$upload', '$timeout', '$location', 'storageData', function($rootScope,$scope,$http,$upload,$timeout,$location,storageData){	

	$rootScope.$emit('changeMenuState', 0);	

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
	$scope.colleges = [];
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
	$scope.experiences = [];

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
			console.log(status);
		})
		.error(function(data,status,header,config){
			console.log(status);
		});		
		
		$timeout(function(){
			var user = {};
			user.biodata = $scope.bio;
			user.biodata.educations = $scope.colleges;
			user.biodata.skills = $scope.skills;
			user.biodata.experiences = $scope.experiences;
			user.biodata.portfolios = $scope.portfolios;			
			storageData.set('userdata', user);
			$location.path("select-template");
		},200);
	}

}]);