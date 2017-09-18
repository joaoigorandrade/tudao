"use strict";

var Validator = require('validatorjs');

(function() {

	var _test = function(test) {
		this.id 			= test && test.id 			? test.id 			: 0;
		this.createdAt 		= test && test.createdAt 	? test.createdAt 	: new Date();
		this.updatedAt 		= test && test.updatedAt 	? test.updatedAt 	: new Date();
		this.deletedAt 		= test && test.deletedAt 	? test.deletedAt 	: null;
		this.fkSubject		= test && test.fkSubject	? test.fkSubject	: 0;
		this.description 	= test && test.description 	? test.description 	: '';
		this.answer 		= test && test.answer 		? test.answer 		: '';
		this.subject 		= test && test.subject 		? test.subject 		: {};

		this.validate = function() {
			var valid = new Validator(test, {
				fkSubject 		: 'required',
				description 	: 'required',
				answer 			: 'required'
			});

			if (valid.fails())
				throw valid.errors.errors;
		};
	};

	module.exports = _test;
})();