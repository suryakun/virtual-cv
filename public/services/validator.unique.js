/**
*  Module
*
* Description
*/
angular.module('unique', []).factory('checker', ['$http','$q', function($http,$q){
	var serviceBase = '/api',
		checking = {};

	checking.searchExistEmail = function(email){
		return $http.get(serviceBase + '/checkingemail/' + escape(email))
			.then(function(result){
				return result;
			});
	};

	return checking;

}]).directive('uniqueEmail', ['$q','checker', function($q, checker){	
	return {	
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment	
		link: function($scope, iElm, iAttrs, controller) {
			controller.$asyncValidators.uniquemail = function(modelValue, viewValue){
				var deferer = $q.defer(),
					currentValue = modelValue || viewValue;
				checker.searchExistEmail(currentValue)
				.then(function(result){					
					if (result.data == true) {
						deferer.resolve();
					}else{
						deferer.reject();
					}
				});
				return deferer.promise;
			}			
		}
	};
}]);