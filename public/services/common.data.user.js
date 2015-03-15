/**
*  Module
*
* Description
*/
angular.module('temporarydata', [])
.factory('storageData', ['$cookieStore', function($cookieStore){	

	return {		
		set: function(key,value){
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem(key,JSON.stringify(value));
				console.log("browser support");
			}else{
				console.log("browser unsupport");
				$cookieStore.put(key,value);
			}
		},
		get: function(key){
			return typeof(Storage) !== "undefined" ? localStorage.getItem(key) : $cookieStore.get(key);			
		},
		delete : function(key){
			if (typeof(Storage) !== "undefined") {
				localStorage.removeItem(key);
			}else{
				$cookieStore.remove(key);
			}
		}
	}
	
}])