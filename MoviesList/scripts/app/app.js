var appRoot = angular.module('thoughtworksstudio', []);
	

appRoot.controller('RootController',
    ['$scope', '$rootScope','moviesService','$filter',
function ($scope, $rootScope,moviesService,filter) {
	$scope.selectedFilterList = [];
	$scope.filteredMoviesList = [];
	$scope.selectedRatingFilterList = [];
	$scope.selectedLanguageFilterList = [];
	$scope.selectedCountryFilterList = [];
	
	var init = function(){
		console.log("APP STARTED");
		$scope.filterList = moviesService.generateFilterList();
		moviesService.getMoviesList().then(function(data){
			$scope.moviesList = data;
			$scope.filteredMoviesList = angular.copy($scope.moviesList); 
		});
	}
	
	$scope.filterSelected = function(filter,isRatingFilter){
		var filteredMoviesList = [];
		if(filter){
			if(!isRatingFilter){
				var idx = $scope.selectedFilterList.indexOf(filter.value);
				// Is currently selected
				if (idx > -1) {
					$scope.selectedFilterList.splice(idx,1);
				}
				// Is newly selected
				else {
					$scope.selectedFilterList.push(filter.value);
				}	
				
			}else{
			
				 var idx = $scope.selectedRatingFilterList.indexOf(filter.value);
				 // Is currently selected
				 if (idx > -1) {
				 $scope.selectedRatingFilterList.splice(idx,1);
				 }
				 // Is newly selected
				 else {
				 $scope.selectedRatingFilterList.push(filter.value);
				 }
			}
		}
			
			if($scope.selectedFilterList.length == 0 && $scope.selectedRatingFilterList.length == 0){
				$scope.filteredMoviesList = angular.copy($scope.moviesList); 
				$scope.filterWithLanguage(null,false);
				$scope.filterWithCountry(null,false);
			}else{		
					var filterList = [];
						$scope.moviesList.forEach(function(item){
								if($scope.selectedFilterList.length > 0 && $scope.selectedFilterList.filter(function(obj) { return (item.genres.split('|').indexOf(obj) != -1 ) }).length > 0){
									if($scope.selectedRatingFilterList.length == 0){
										filterList.push(item);
									}else if($scope.selectedRatingFilterList.length == 1 && $scope.selectedRatingFilterList[0] == "Un Rated"){
										if(item.contentRating == ""){
											filterList.push(item);
										}
									}else{
										if($scope.selectedRatingFilterList.filter(function(obj) { return (item.contentRating.split('|').indexOf(obj) != -1 ) }).length > 0){
											filterList.push(item);
										}
									}
								}else{
									if($scope.selectedRatingFilterList.length == 1 && $scope.selectedRatingFilterList[0] == "Un Rated"){
										if(item.contentRating == ""){
											filterList.push(item);
										}
									}else{
										if($scope.selectedRatingFilterList.filter(function(obj) { return (item.contentRating.split('|').indexOf(obj) != -1 ) }).length > 0){
											filterList.push(item);
										}
									}
								}						
						});
						$scope.filteredMoviesList = filterList;
						$scope.filterWithLanguage(null,false);
						$scope.filterWithCountry(null,false);
						
				}
		}
		
		$scope.filterWithLanguage = function(filter,fromui){
			if(fromui){
				var idx = $scope.selectedLanguageFilterList.indexOf(filter.value);
				// Is currently selected
				if (idx > -1) {
					$scope.selectedLanguageFilterList.splice(idx,1);
				}
				// Is newly selected
				else {
					$scope.selectedLanguageFilterList.push(filter.value);
				}	
			}
			if($scope.selectedLanguageFilterList.length == 0){
				if(fromui){
					$scope.filterSelected(null,false);
				}
			}else{			
				$scope.filteredMoviesList = $scope.filteredMoviesList.filter(function(item){
					return $scope.selectedLanguageFilterList.indexOf(item.language) != -1;
				});
			}
		}
		
		$scope.filterWithCountry = function(filter,fromui){
			if(fromui){
				var idx = $scope.selectedCountryFilterList.indexOf(filter.value);
				// Is currently selected
				if (idx > -1) {
					$scope.selectedCountryFilterList.splice(idx,1);
				}
				// Is newly selected
				else {
					$scope.selectedCountryFilterList.push(filter.value);
				}	
			}
			if($scope.selectedCountryFilterList.length == 0){
				if(fromui){
					$scope.filterSelected(null,false);
				}
			}else{			
				$scope.filteredMoviesList = $scope.filteredMoviesList.filter(function(item){
					return $scope.selectedCountryFilterList.indexOf(item.country) != -1;
				});
			}
		}
			
	init();
}]);