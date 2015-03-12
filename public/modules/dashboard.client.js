var dashboard = angular.module('dashboard', ['ngCookies','ngMessages','ngRoute','ngTouch','ui.bootstrap.tabs','ui.bootstrap.datepicker','ui.bootstrap.tpls','angularFileUpload','unique','temporarydata','angularLoad','xeditable']);

dashboard.run(function(editableOptions){
	editableOptions.theme = 'bs3';	
});

dashboard.