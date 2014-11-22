function CityController($scope, $http) {
	//initialize citiesStats
	$scope.citiesStats = [];
	
	$http.get('http://api.openweathermap.org/data/2.5/weather?q=London').success(function(data){
		$scope.citiesStats[0] = data;
		$scope.citiesStats[0].main.temp -= 273.15;
		console.log($scope.citiesStats[0].main.temp);
	});
	$http.get('http://api.openweathermap.org/data/2.5/weather?q=Phoenix').success(function(data){
		$scope.citiesStats[1] = data;
		$scope.citiesStats[1].main.temp -= 273.15;
	});
	$http.get('http://api.openweathermap.org/data/2.5/weather?q=Manhattan').success(function(data){
		$scope.citiesStats[2] = data;
		$scope.citiesStats[2].main.temp -= 273.15;
		on = !on;
	});
	
	$scope.calculateStats = function(){
		console.log($scope.citiesStats[0].main.temp);
		var avgTemp = 0;
		var highTemp = 0;
		var avgHum = 0;
		var highHum = 0;
		var city = [];
	
		var nicestCityIndex;
		var worstCityIndex;
		var highestTempCityIndex;
		var highestHumidityCityIndex;
		for(var i = 0; i < $scope.citiesStats.length; ++i){
			avgTemp += parseInt($scope.citiesStats[i].main.temp); 			
			avgHum += parseInt($scope.citiesStats[i].main.humidity);
			$scope.citiesStats[i].main.terribleness = Math.abs((parseInt($scope.citiesStats[i].main.temp) - 25) / 25); 
			$scope.citiesStats[i].main.terribleness += Math.abs((parseInt($scope.citiesStats[i].main.humidity) - 20) / 50);
			$scope.citiesStats[i].main.terribleness += Math.abs((parseInt($scope.citiesStats[i].wind.speed) - 2) / 30);
			$scope.citiesStats[i].main.terribleness += Math.abs((parseInt($scope.citiesStats[i].clouds.all) - 50) / 100);	

			if (isNaN(nicestCityIndex) || $scope.citiesStats[i].main.terribleness < $scope.citiesStats[nicestCityIndex].main.terribleness) {
				nicestCityIndex	= i;
			}
			if (isNaN(worstCityIndex) || $scope.citiesStats[i].main.terribleness > $scope.citiesStats[worstCityIndex].main.terribleness) {
				worstCityIndex	= i;
			}
			if (isNaN(highestTempCityIndex) || $scope.citiesStats[i].main.temp > $scope.citiesStats[highestTempCityIndex].main.temp) {
				highestTempCityIndex = i;
			}
			if (isNaN(highestHumidityCityIndex) || $scope.citiesStats[i].main.humidity > $scope.citiesStats[highestHumidityCityIndex].main.humidity) {
				highestHumidityCityIndex	= i;
			}

		}
		avgTemp = avgTemp / $scope.citiesStats.length;
		avgHum = avgHum / $scope.citiesStats.length;
		
		
		$scope.averageTemperature = avgTemp;
		$scope.averageHumidity = avgHum;
		$scope.nicestWeather = $scope.citiesStats[nicestCityIndex].name;
		$scope.worstWeather = $scope.citiesStats[worstCityIndex].name;
		$scope.highestTemperature = $scope.citiesStats[highestTempCityIndex].name;
		$scope.highestHumidity = $scope.citiesStats[highestHumidityCityIndex].name;
		
	}
	
	$scope.updateCity = function(index) {
		$http.get('http://api.openweathermap.org/data/2.5/weather?q='+$scope.citiesStats[index].name).success(function(data){
			$scope.citiesStats[index] = data;
			$scope.citiesStats[index].main.temp -= 273.15;
		});
	}
	
	$scope.$watch('citiesStats', $scope.calculateStats, true);
}

	