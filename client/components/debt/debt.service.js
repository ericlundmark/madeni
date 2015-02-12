'use strict';

angular.module('madeniApp')
.factory('Debt', function ($resource) {
	return $resource('/api/debts/:id', {
		id: '@_id'
	},
	{
		debtor: {
			method: 'GET',
			params: {
				id:'debtor'
			},
			isArray: true
		},
		creditor: {
			method: 'GET',
			params: {
				id:'creditor'
			},
			isArray: true
		}
	});
});
