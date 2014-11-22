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
	
		for(var i = 0; i < $scope.citiesStats.length; ++i){
			avgTemp += parseInt($scope.citiesStats[i].main.temp); 
			highTemp = highTemp > parseInt($scope.citiesStats[i].main.temp) ? highTemp : parseInt($scope.citiesStats[i].main.temp);
			avgHum += parseInt($scope.citiesStats[i].main.humidity);
			highHum = highHum > parseInt($scope.citiesStats[i].main.humidity) ? highHum : parseInt($scope.citiesStats[i].main.humidity);
//			city[i] = (parseInt($scope.citiesStats[i].main.temp) - 25) / 25; 
//			city[i] += (parseInt($scope.citiesStats[i].main.humidity) - 20) / 25;
//			city[i] += (parseInt($scope.citiesStats[i].main.
			
		}
		avgTemp = avgTemp / $scope.citiesStats.length;
		avgHum = avgHum / $scope.citiesStats.length;
		
		
		$scope.averageTemperature = avgTemp;
		$scope.highestTemperature = highTemp;
		$scope.averageHumidity = avgHum;
		$scope.highestHumidity = highHum;

	}
	
	$scope.updateCity = function(index) {
		$http.get('http://api.openweathermap.org/data/2.5/weather?q='+$scope.citiesStats[index].name).success(function(data){
			$scope.citiesStats[index] = data;
			$scope.citiesStats[index].main.temp -= 273.15;
		});
	}
	
	$scope.$watch('citiesStats', $scope.calculateStats, true);
}

	