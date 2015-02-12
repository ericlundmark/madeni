'use strict';

describe('Controller: MainCtrl', function () {

	// load the controller's module
	beforeEach(module('madeniApp'));
	beforeEach(module('socketMock'));

	var MainCtrl,
	scope,
	$httpBackend;

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
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
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/api/debts')
		.respond(debts);

		scope = $rootScope.$new();
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));

	it('should attach debts to the scope', function () {
		$httpBackend.flush();
		expect(scope.debts.length).toBe(2);
	});
	describe('when calling the saveDebt function', function() {
		beforeEach(function() {
			scope.saveDocument();
		});

		afterEach(function() {
			expect(scope.sendHTTP.callCount).to.equal(1);
			expect(scope.sendHTTP.args[0][0]).to.equal(scope.document.text);
		});
	});
});
