'use strict';

angular.module('madeniApp')
.controller('MainCtrl', function ($scope, Debt) {
	$scope.creditor = Debt.creditor();
	$scope.debtor = Debt.debtor();
	$scope.addDebt = function() {
		if($scope.newThing === '') {
			return;
		}
		Debt.save();
		$scope.newThing = '';
	};

	$scope.sumOfCredits = function(){
		return sum($scope.creditor);
	};

	$scope.sumOfDebts = function(){
		return sum($scope.debtor);
	};
	var sum = function(debts){
		var sum = 0;
		if(debts){
			debts.forEach(function(entry){
				sum += entry.sum;
			});
		}
		return sum;
	};
});
