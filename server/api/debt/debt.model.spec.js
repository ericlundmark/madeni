'use strict';

var should = require('should');
var app = require('../../app');
var Debt = require('./debt.model');
var ObjectId = require('mongoose').Types.ObjectId;

var debt = new Debt({
	debtor: new ObjectId('000000000001'), 
	creditor: new ObjectId('000000000002'),
	sum: 200
});

describe('Debt Model', function() {
	before(function(done) {
		// Clear users before testing
		Debt.remove().exec().then(function() {
			done();
		});
	});

	afterEach(function(done) {
		Debt.remove().exec().then(function() {
			done();
		});
	});

	it('should begin with no users', function(done) {
		Debt.find({}, function(err, debts) {
			debts.should.have.length(0);
			done();
		});
	});

	it('should be created with debtor, creditor and sum', function(done){
		debt.save(function(err, debt){
			should.exist(debt);
			debt.should.have.property('_id');
			debt.debtor.should.equal(debt.debtor);
			debt.creditor.should.equal(debt.creditor);
			debt.sum.should.equal(debt.sum);
			done();
		});
	});

	it('should not be possible to create a debt without a debtor', function(done){
		debt.debtor = null;
		debt.save(function(err){
			should.exist(err);
			debt.debtor= new ObjectId('000000000001');
			done();
		});
	});

	it('should not be possible to create a debt without a creditor', function(done){
		debt.creditor = null;
		debt.save(function(err){
			should.exist(err);
			debt.creditor= new ObjectId('000000000002');
			done();
		});
	});

	it('should not have a creditor and debtor that are equal', function(done){
		debt.creditor = debt.debtor;
		debt.save(function(err){
			should.exist(err);
			debt.creditor= new ObjectId('000000000002');
			done();
		});
	});

	it('should not be possible to have a negative sum', function(done){
		debt.sum = -200;
		debt.save(function(err){
			should.exist(err);
			debt.sum=200;
			done();
		});
	});
});
