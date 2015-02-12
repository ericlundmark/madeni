'use strict';

var _ = require('lodash');
var Debt = require('./debt.model');


// Creates a new debt in the DB.
exports.create = function(req, res) {
	Debt.create(req.body, function(err, debt) {
		if(err) { return handleError(res, err); }
		return res.json(201, debt);
	});
};

exports.debtor = function(req, res, next) {
	var userId = req.user._id;
	Debt.find({
		debtor: userId
	}, function(err, debts) {
		if (err) return next(err);
		if (!debts) return res.json(401);
		res.json(debts);
	});
};

exports.creditor = function(req, res, next) {
	var userId = req.user._id;
	Debt.find({
		creditor: userId
	}, function(err, debts) {
		if (err) return next(err);
		if (!debts) return res.json(401);
		res.json(debts);
	});
};

// Updates an existing debt in the DB.
exports.update = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	Debt.findById(req.params.id, function (err, debt) {
		if (err) { return handleError(res, err); }
		if(!debt) { return res.send(404); }
		var updated = _.merge(debt, req.body);
		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.json(200, debt);
		});
	});
};

// Deletes a debt from the DB.
exports.destroy = function(req, res) {
	Debt.findById(req.params.id, function (err, debt) {
		if(err) { return handleError(res, err); }
		if(!debt) { return res.send(404); }
		debt.remove(function(err) {
			if(err) { return handleError(res, err); }
			return res.send(204);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}
