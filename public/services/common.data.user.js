/**
*  Module
*
* Description
*/
angular.module('temporarydata', [])
.factory('storageData', ['$cookieStore', function($cookieStore){	

	return {		
		set: function(key,value){
			$cookieStore.put(key,value);
		},
		get: function(key){
			return $cookieStore.get(key);
		},
		delete : function(key){
			$cookieStore.remove(key);
		}
	}
	
}])