'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DebtSchema = new Schema({
	debtor: {type: Schema.ObjectId, ref: 'User', required: true},
	creditor: {type: Schema.ObjectId, ref: 'User', required: true},
	sum: { type:Number, min:0 }
});
DebtSchema.pre('save', function (next) {
	if(this.debtor==this.creditor){
		var err = new Error('something went wrong');
		next(err);
	}else{
		next();
	}
});
module.exports = mongoose.model('Debt', DebtSchema);
