var app = angular.module('coffeeMem',[]);
app.controller('coffeeCtrl', function($scope, $sce) {
	
	$scope.coffeeType = ["Original", "Dark Roast", "Decaf"];
	$scope.dairyType = ["Cream", "Milk"];
	$scope.sizes = ["Small", "Medium", "Large", "X-Large"];
	$scope.numbers = [0, 1, 2, 3, 4, 5];
	$scope.modes = ["Easy - 1 Order", "Medium - 3 Orders", "Hard - 5 Orders"];
	
	$scope.difficulty = "Easy - 1 Order"; // Default easy mode
	$scope.coffeeOrders = [];
	$scope.playerOrders = [];
	$scope.result = ""; // Used to send back result of wrong choices
	
	// Generates a integer number between 0 and the given max
	function genRandNum(max) {
		return Math.floor(Math.random() * max);
	}
	
	// Makes a random coffee with random drink modifiers
	function generateRandomCoffee() {
		var drink = {
			"type" : $scope.coffeeType[genRandNum(3)],
			"size" : $scope.sizes[genRandNum(4)],
			"dairy" : $scope.dairyType[genRandNum(2)],
			"sugarAmt" : genRandNum(3),
			"dairyAmt" : genRandNum(3)
		};
		
		return drink;
	}

	// Generates random orders based on difficulty
	$scope.generateOrders = function() {
		var numOfOrders = 0;
		
		switch ($scope.difficulty) {
			case "Easy - 1 Order":
				numOfOrders = 1;
				break;
			case "Medium - 3 Orders":
				numOfOrders = 3;
				break;
			case "Hard - 5 Orders":
				numOfOrders = 5;
				break;
			default:
				numOfOrders = 1;
				break;
		}
		
		for (i = 0; i < numOfOrders; i++) {
			
			// Make random order and push to array
			$scope.coffeeOrders[i] = generateRandomCoffee();
			
			// Make empty order for player to fill out
			$scope.playerOrders[i] = {
				"type" : "",
				"size" : "",
				"dairy" : "",
				"sugarAmt" : "",
				"dairyAmt" : ""
			};
			
		}
	}
	
	// Compares generated orders with player orders and logs any wrong choices	 
	// into $scope.result with html code
	$scope.checkOrders = function() {
		
		var length = $scope.coffeeOrders.length;
		$scope.result = "";
		
		for (i = 0; i < length; i++) {
			$scope.result = $scope.result +"<h3 class=\"text-center\">" + "Order " + (i+1) + ": </h3> <br>";
			$scope.result = $scope.result + "<p class=\"text-center\">";
			
			if ($scope.coffeeOrders[i].type != $scope.playerOrders[i].type) {
				$scope.result = $scope.result + "Wrong drink type: Should be " + $scope.coffeeOrders[i].type + "<br>"; 
			}
			if ($scope.coffeeOrders[i].size != $scope.playerOrders[i].size) {
				$scope.result = $scope.result + "Wrong size: Should be " + $scope.coffeeOrders[i].size + "<br>"; 
			}
			if ($scope.coffeeOrders[i].dairy != $scope.playerOrders[i].dairy) {
				$scope.result = $scope.result + "Wrong dairy type: Should be " + $scope.coffeeOrders[i].dairy + "<br>"; 
			}
			if ($scope.coffeeOrders[i].dairyAmt != $scope.playerOrders[i].dairyAmt) {
				$scope.result = $scope.result + "Wrong dairy amount: Should be " + $scope.coffeeOrders[i].dairyAmt + "<br>"; 
			}
			if ($scope.coffeeOrders[i].sugarAmt != $scope.playerOrders[i].sugarAmt) {
				$scope.result = $scope.result + "Wrong sugar amount: Should be " + $scope.coffeeOrders[i].sugarAmt + "<br>"; 
			}
			$scope.result = $scope.result + "<br>";			
		}
		
		$scope.result = $scope.result + "</p> <div class=\"text-center\"><button ng-click=\"resetGame()\" onClick=\"retry();\"> Play Again </button> <div>";
		
		// Resets scope values
		$scope.coffeeOrders.length = 0;
		$scope.playerOrders.length = 0;
	}
	
	// Returns element as HTML code
	$scope.renderHtml = function(html) {
		return $sce.trustAsHtml(html);
	};
});