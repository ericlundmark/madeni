'use strict';

describe('Service: Debt', function () {

	// load the service's module
	beforeEach(module('madeniApp'));
	var mockDebts, mockCredits;
	beforeEach(function(){
		mockDebts = [
			{
				debtor: 1,
				creditor: 2,
				sum: 202
			},
			{
				debtor: 1,
				creditor: 3,
				sum: 22
			}
		];
		mockCredits = [
			{
				debtor: 2,
				creditor: 1,
				sum: 3232
			},
			{
				debtor: 3,
				creitor: 1,
				sum: 334
			}
		];
	});
	// instantiate service
	var Debt, httpBackend;
	beforeEach(inject(function (_Debt_, $httpBackend) {
		Debt = _Debt_;
		httpBackend = $httpBackend;
	}));
	it('Should define method debtor', function() {
		expect(Debt.debtor).toBeDefined();
	});
	it('Should define method creditor', function() {
		expect(Debt.creditor).toBeDefined();
	});
	it('Should only return a users debts', function(){
		httpBackend.expectGET('/api/debts/debtor').respond(mockDebts);
		var debts = Debt.debtor();
		httpBackend.flush();
		expect(debts.length).toEqual(2);
		expect(debts[0].debtor).toEqual(mockDebts[0].debtor);
	});
	it('Should only return the specified users credits', function(){
		httpBackend.expectGET('/api/debts/creditor').respond(mockCredits);
		var credits = Debt.creditor();
		httpBackend.flush();
		expect(credits.length).toEqual(2);
		expect(credits[0].debtor).toEqual(mockCredits[0].debtor);
	});
});
