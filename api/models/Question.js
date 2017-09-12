"use strict";

var Validator = require('validatorjs');

(function() {

	var _question = function(question) {
		this.id 			= question && question.id 			? question.id 			: 0;
		this.createdAt 		= question && question.createdAt 	? question.createdAt 	: new Date();
		this.updatedAt 		= question && question.updatedAt 	? question.updatedAt 	: new Date();
		this.deletedAt 		= question && question.deletedAt 	? question.deletedAt 	: null;
		this.description 	= question && question.description 	? question.description 	: '';
		this.answer 		= question && question.answer 		? question.answer 		: '';

		this.validate = function() {
			var valid = new Validator(question, {
				description 	: 'required',
				answer 			: 'required'
			});

			if (valid.fails())
				throw valid.errors.errors;
		};
	};

	module.exports = _question;
})();