"use strict";

var HttpStatusCode 		= require('../../config/HttpStatusCode');
var HttpResponseMessage = require('../../config/HttpResponseMessage');
var Subject 			= require('../models/Subject');
var SubjectController 	= require('../controllers/SubjectController');

(function(self) {

	var _create = function(request, response) {
		var httpResponse = {};
		httpResponse.date = new Date();
		try {
			var subject = new Subject(request.body);
			SubjectController.Create(subject);

			httpResponse.success = true;
			httpResponse.subject = subject;
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

			var subject = new Subject(request.body);
			SubjectController.Update(subject, parseInt(request.params.id));

			httpResponse.success = true;
			httpResponse.subject = subject;
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

			SubjectController.Delete(parseInt(request.params.id));

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
			var subjects = SubjectController.FindAll();

			httpResponse.success = true;
			httpResponse.subjects = subjects;
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

			var subject = SubjectController.FindById(parseInt(request.params.id));

			httpResponse.success = true;
			httpResponse.subject = subject;
			response.status(HttpStatusCode.Success.OK)
				.json(httpResponse);
		} catch(ex) {
			httpResponse.success = false;
			httpResponse.message = ex;
			response.status(HttpStatusCode.Error.UNAUTHORIZED)
				.json(httpResponse);
		}
	};

	self.Create 			= _create;
	self.Update 			= _update;
	self.Delete 			= _delete;
	self.FindAll 			= _findAll;
	self.FindById 			= _findByid;

})(this);