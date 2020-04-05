"use strict";

var HttpStatusCode 		= require('../../config/HttpStatusCode');
var HttpResponseMessage = require('../../config/HttpResponseMessage');
var Test 				= require('../models/Test');
var TestController 		= require('../controllers/TestController');

(function(self) {

	var _create = function(request, response) {
		var httpResponse = {};
		httpResponse.date = new Date();
		try {
			var test = new Test(request.body);
			TestController.Create(test);

			httpResponse.success = true;
			httpResponse.test = test;
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

			var test = new Test(request.body);
			TestController.Update(test, parseInt(request.params.id));

			httpResponse.success = true;
			httpResponse.test = test;
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

			TestController.Delete(parseInt(request.params.id));

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
			var tests = TestController.FindAll();

			httpResponse.success = true;
			httpResponse.tests = tests;
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

			var test = TestController.FindById(parseInt(request.params.id));

			httpResponse.success = true;
			httpResponse.test = test;
			response.status(HttpStatusCode.Success.OK)
				.json(httpResponse);
		} catch(ex) {
			httpResponse.success = false;
			httpResponse.message = ex;
			response.status(HttpStatusCode.Error.UNAUTHORIZED)
				.json(httpResponse);
		}
	};

	var _findByFkSubject = function(request, response) {
		var httpResponse = {};
		httpResponse.date = new Date();
		try {
			var tests = TestController.FindByFkSubject(parseInt(request.params.fkSubject));

			httpResponse.success = true;
			httpResponse.tests = tests;
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
	self.FindByFkSubject 	= _findByFkSubject;

})(this);