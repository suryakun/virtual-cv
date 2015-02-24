/**
*  Module
*
* Description
*/
angular.module('tempolarydata', []).service('storage', ['$window', function($window){
	this.biodata = {};
	
	this.insertBiodata = function(bio){
		this.biodata = bio;
	}

	this.insertEducations = function(edu){
		this.biodata.educations = edu;
	}

	this.insertSkills = function(skil){
		this.biodata.skills = skil;
	}

	this.insertExperience = function(ex){
		this.biodata.experiences = {};		
	}

	this.getData = function(){
		return this.biodata;
	}
}]);