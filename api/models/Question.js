"use strict";

var Validator = require('validatorjs');

(function() {

	var _question = function(question) {
		this.id 			= question && question.id 			? question.id 			: 0;
		this.createdAt 		= question && question.createdAt 	? question.createdAt 	: new Date();
		this.updatedAt 		= question && question.updatedAt 	? question.updatedAt 	: new Date();
		this.deletedAt 		= question && question.deletedAt 	? question.deletedAt 	: null;
		this.fkSubject		= question && question.fkSubject	? question.fkSubject	: 0;
		this.description 	= question && question.description 	? question.description 	: '';
		this.answer 		= question && question.answer 		? question.answer 		: '';
		this.subject 		= question && question.subject 		? question.subject 		: {};

		this.validate = function() {
			var valid = new Validator(question, {
				fkSubject 		: 'required',
				description 	: 'required',
				answer 			: 'required'
			});

			if (valid.fails())
				throw valid.errors.errors;
		};
	};

	module.exports = _question;
})();