'use strict';

describe('Service: Debt', function () {

	// load the service's module
	beforeEach(module('madeniApp'));

	// instantiate service
	var Debt;
	beforeEach(inject(function (_Debt_) {
		Debt = _Debt_;
	}));
	it('Should define method debtor', function() {
		expect(Debt.debtor).toBeDefined();
		expect(Debt.debtor).toEqual(any(Function));
	});
	it('Should define method creditor', function() {
		expect(Debt.creditor).toBeDefined();
		expect(Debt.creditor).toEqual(any(Function));
	});
});
