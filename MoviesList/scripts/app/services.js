angular.module('thoughtworksstudio').factory('moviesService',['$http',
function ($http) {
	
	function genres(title,value){
		this.title = title;
		this.value =value;
	}
	
	function mpaaRating(title,value){
		this.title = title;
		this.value = value;
	}
	
	function language(title,value){
		this.title = title;
		this.value = value;
	}
	
	function country(title,value){
		this.title = title;
		this.value = value;
	}
	
	function movie(args){
	  this.movieTitle 	= args.movie_title || "";
      this.directorName = args.director_name || "";
      this.actorName_1 	= args.actor_1_name || "";
      this.actorName_2  = args.actor_2_name || "";
      this.genres		=	args.genres || "";
      this.language 	= args.language || "";
      this.country		= args.country || "";
      this.contentRating = args.content_rating || "";
      this.budget 		= parseInt(args.budget) || 0;
      this.titleYear 	= parseInt(args.title_year) || "";
      this.plotKeywords = args.plot_keywords || "";
      this.movieImdbLink = args.movie_imdb_link || "";
	}
	
	  moviesService = {
        getMoviesList: function () {
          return $http({
				method : "GET",
				url : "http://starlord.hackerearth.com/movieslisting"
				}).then(function success(response) {
					var moviesList = [];
					response.data.forEach(function(item){
						moviesList.push(new movie(item));	
					})	
					return moviesList;					
				});
		},
	  generateFilterList: function(){
		  var genreList = [];
		  var mpaaRatingList = [];
		  var languageList = [];
		  var countryList = [];
		  
		  genreList.push(new genres("Adventure","Adventure"));
		  genreList.push(new genres("Drama","Drama"));
		  genreList.push(new genres("Sci-Fi","Sci-Fi"));
		  genreList.push(new genres("Comedy","Comedy"));
		  genreList.push(new genres("Action","Action"));
		  genreList.push(new genres("Romance","Romance"));
		  genreList.push(new genres("Thriller","Thriller"));
		  genreList.push(new genres("Crime","Crime"));
		  genreList.push(new genres("Mystery","Mystery"));
		  genreList.push(new genres("Fantasy","Fantasy"));
		  genreList.push(new genres("Biography","Biography"));
		  genreList.push(new genres("History","History"));
		  genreList.push(new genres("Western","Western"));
		  genreList.push(new genres("Family","Family"));
		  genreList.push(new genres("Musical","Musical"));
		  
		  mpaaRatingList.push(new mpaaRating("Un Rated","Un Rated"));
		  mpaaRatingList.push(new mpaaRating("G","G"));
		  mpaaRatingList.push(new mpaaRating("PG","PG"));
		  mpaaRatingList.push(new mpaaRating("PG-13","PG-13"));
		  mpaaRatingList.push(new mpaaRating("R","R"));
		  mpaaRatingList.push(new mpaaRating("NC-17","NC-17"));
		  
		  languageList.push(new language("English","English"));
		  languageList.push(new language("Spanish","Spanish"));
		  languageList.push(new language("Mandarin","Mandarin"));
		  
		  countryList.push(new country("India","India"));
		  countryList.push(new country("USA","USA"));
		  countryList.push(new country("Australia","Australia"));
		  countryList.push(new country("China","China"));
		  countryList.push(new country("New Zealand","New Zealand"));
		  
		  return {genreList:genreList,mpaaRatingList:mpaaRatingList,languageList:languageList,countryList:countryList};		  
	  }
} 
			return moviesService;
}]);