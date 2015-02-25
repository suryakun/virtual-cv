/**
*  Module
*
* Description
*/
angular.module('temporarydata', []).service('storage', ['$window', function($window){
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
		this.biodata.experiences = ex;		
	}

	this.insertPortfolio = function(port){
		this.biodata.porfolios = port;	
	}

	this.getData = function(){
		return this.biodata;
	}
}]);