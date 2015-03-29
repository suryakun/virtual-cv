/**
*  Module
*
* Description
*/
angular.module('contentedit', []).directive('editing', ['$rootScope', '$parse', function($rootScope,$parse){
	// Runs during compile
	return {
		scope: { model : '=ngModel' }, // {} = isolate, true = child, false/undefined = no change
		require: 'ngModel',
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function(scope, iElm, iAttrs, controller) {
			iElm.attr('contenteditable','true');
			iElm.on('hover',function(event){
				iElm.css({
					border: '1px dotted red'
				});
			});
			iElm.on('mouseleave', function(event){
				iElm.css({
					border: '0'
				});
			});

			iElm.on('blur',function(){
				scope.$apply(function(){
					controller.$setViewValue(iElm.html());
				});
			});

			controller.$render = function(){
				iElm.html(controller.$viewValue);
			}
		}
	};
}]).directive('removePanel', ['', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			iElm.append('')
		}
	};
}]);