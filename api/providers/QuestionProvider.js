"use strict";

var HttpStatusCode 		= require('../../config/HttpStatusCode');
var HttpResponseMessage = require('../../config/HttpResponseMessage');
var Question 			= require('../models/Question');
var QuestionController 	= require('../controllers/QuestionController');

(function(self) {

	var _create = function(request, response) {
		var httpResponse = {};
		httpResponse.date = new Date();
		try {
			var question = new Question(request.body);
			QuestionController.Create(question);

			httpResponse.success = true;
			httpResponse.question = question;
			httpResponse.message = HttpResponseMessage.SaveSuccess;
			response.status(HttpStatusCode.Success.CREATED)
				.json(httpResponse);
		} catch(ex) {
			httpResponse.success = false;
			httpResponse.message = ex;
			response.status(HttpStatusCode.Error.UNAUTHORIZED)
				.json(httpResponse);
		}
	};

	var _update = function(request, response) {
		var httpResponse = {};
		httpResponse.date = new Date();
		try {
			if (request.params.id && isNaN(request.params.id))
				throw { id: 'The id field is required.' };

			var question = new Question(request.body);
			QuestionController.Update(question, parseInt(request.params.id));

			httpResponse.success = true;
			httpResponse.question = question;
			httpResponse.message = HttpResponseMessage.SaveSuccess;
			response.status(HttpStatusCode.Success.ACCEPTED)
				.json(httpResponse);
		} catch(ex) {
			httpResponse.success = false;
			httpResponse.message = ex;
			response.status(HttpStatusCode.Error.UNAUTHORIZED)
				.json(httpResponse);
		}
	};

	var _delete = function(request, response) {
		var httpResponse = {};
		httpResponse.date = new Date();
		try {
			if (request.params.id && isNaN(request.params.id))
				throw { id: 'The id field is required.' };

			QuestionController.Delete(parseInt(request.params.id));

			httpResponse.success = true;
			httpResponse.message = HttpResponseMessage.DeleteSuccess;
			response.status(HttpStatusCode.Success.ACCEPTED)
				.json(httpResponse);
		} catch(ex) {
			httpResponse.success = false;
			httpResponse.message = ex;
			response.status(HttpStatusCode.Error.UNAUTHORIZED)
				.json(httpResponse);
		}
	};

	var _findAll = function(request, response) {
		var httpResponse = {};
		httpResponse.date = new Date();
		try {
			var questions = QuestionController.FindAll();

			httpResponse.success = true;
			httpResponse.questions = questions;
			response.status(HttpStatusCode.Success.OK)
				.json(httpResponse);
		} catch(ex) {
			httpResponse.success = false;
			httpResponse.message = ex;
			response.status(HttpStatusCode.Error.UNAUTHORIZED)
				.json(httpResponse);
		}
	};

	var _findByid = function(request, response) {
		var httpResponse = {};
		httpResponse.date = new Date();
		try {
			if (request.params.id && isNaN(request.params.id))
				throw { id: 'The id field is required.' };

			var question = QuestionController.FindById(parseInt(request.params.id));

			httpResponse.success = true;
			httpResponse.question = question;
			response.status(HttpStatusCode.Success.OK)
				.json(httpResponse);
		} catch(ex) {
			httpResponse.success = false;
			httpResponse.message = ex;
			response.status(HttpStatusCode.Error.UNAUTHORIZED)
				.json(httpResponse);
		}
	};

	self.Create 	= _create;
	self.Update 	= _update;
	self.Delete 	= _delete;
	self.FindAll 	= _findAll;
	self.FindById 	= _findByid;

})(this);