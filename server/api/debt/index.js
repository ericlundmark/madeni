'use strict';

var express = require('express');
var controller = require('./debt.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/debtor', auth.isAuthenticated(), controller.debtor);
router.get('/creditor', auth.isAuthenticated(), controller.creditor);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
