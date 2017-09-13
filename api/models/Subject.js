"use strict";

var Validator = require('validatorjs');

(function() {

	var _subject = function(subject) {
		this.id 		= subject && subject.id 		? subject.id 		: 0;
		this.createdAt 	= subject && subject.createdAt 	? subject.createdAt : new Date();
		this.updatedAt 	= subject && subject.updatedAt 	? subject.updatedAt : new Date();
		this.deletedAt 	= subject && subject.deletedAt 	? subject.deletedAt : null;
		this.name 		= subject && subject.name 		? subject.name 		: '';

		this.validate = function() {
			var valid = new Validator(subject, {
				name : 'required'
			});

			if (valid.fails())
				throw valid.errors.errors;
		};
	};

	module.exports = _subject;
})();