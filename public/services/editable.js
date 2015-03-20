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
}]);