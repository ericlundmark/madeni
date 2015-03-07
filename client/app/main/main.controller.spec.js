'use strict';

describe('Controller: MainCtrl', function () {

	beforeEach(module('madeniApp'));

	var MainCtrl, scope;
	beforeEach(inject(function ($controller, $rootScope) {
		var debts = [{
			debtor: 1,
			creditor: 2,
			sum: 200
		},
		{
			debtor: 2,
			creditor: 1,
			sum: 100
		}];


		scope = $rootScope.$new();
		scope.debts = debts;
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));

	it('should attach debts to the scope', function () {
		expect(scope.debts.length).toBe(2);
	});
	it('should save new debts', function(){
		var debt = {
			debtor: 1,
			creditor: 2,
			sum: 123
		};
		scope.addDebt(debt);
		expect(sendHTTP.callCount).to.equal(1);
		expect(sendHTTP.args[0][0]).to.equal(debt);
	});
});
