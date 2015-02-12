'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var ObjectId = require('mongoose').Types.ObjectId;
var User = require('../user/user.model');
var Debt = require('./debt.model');

var debt = {
	debtor: new ObjectId('000000000001'), 
	creditor: new ObjectId('000000000002'),
	sum: 200
};
describe('/api/debts', function(){
	var token;

	before(function (done) {
		User.find({}).remove(function() {
			User.create({
				provider: 'local',
				name: 'Test User',
				email: 'test@test.com',
				password: 'test'
			}, {
				provider: 'local',
				role: 'admin',
				name: 'Admin',
				email: 'admin@admin.com',
				password: 'admin'
			}, function(err) {
				User.find({}, function(err, users){
					Debt.find({}).remove(function() {
						Debt.create({
							debtor: users[0]._id,
							creditor: users[1]._id,
							sum: 200
						},{
							debtor: users[0]._id,
							creditor: users[1]._id,
							sum: 2300
						},{
							debtor: users[1]._id,
							creditor: users[0]._id,
							sum: 2
						}, function(){
							request(app)
							.post('/auth/local')
							.send({ email: 'test@test.com', password: 'test' })
							.end(function(err, res) {
								token = res.body.token; // Or something
								done();
							});
						});
					});

				});
			});
		});
	});

	after(function(done){
		User.find({}).remove(function() {
			done();
		});
	});

	describe('debtor', function() {

		it('should respond with 401 when unauthorized', function(done) {
			request(app)
			.get('/api/debts/debtor')
			.end(function(err, res) {
				should.not.exist(err);
				res.should.have.status(401);
				done();
			});
		});
		it('should respond with JSON array when authenticated', function(done) {
			request(app)
			.get('/api/debts/debtor')
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if (err) return done(err);
				res.body.should.be.instanceof(Array);
				done();
			});
		});
		it('should only return debts where logged in user is debtor', function(done){
			request(app)
			.get('/api/debts/debtor')
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if (err) return done(err);
				res.body.should.have.length(2);
				done();
			});
		});
	});

	describe('creditor', function() {

		it('should respond with 401 when unauthorized', function(done) {
			request(app)
			.get('/api/debts/creditor')
			.end(function(err, res) {
				should.not.exist(err);
				res.should.have.status(401);
				done();
			});
		});
		it('should respond with JSON array when authenticated', function(done) {
			request(app)
			.get('/api/debts/creditor')
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if (err) return done(err);
				res.body.should.be.instanceof(Array);
				done();
			});
		});
		it('should only return debts where logged in user is creditor', function(done){
			request(app)
			.get('/api/debts/creditor')
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if (err) return done(err);
				res.body.should.have.length(1);
				done();
			});
		});
	});
});
