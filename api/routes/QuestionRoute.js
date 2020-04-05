"use strict";

var Express      = require('express');
var QuestionProvider = require('../providers/QuestionProvider');

(function() {

	var _route = function() {
		var router = Express.Router();

		router.post('/', QuestionProvider.Create);
		router.put('/:id', QuestionProvider.Update);
		router.delete('/:id', QuestionProvider.Delete);
		router.get('/', QuestionProvider.FindAll);
		router.get('/:id', QuestionProvider.FindById);

		return router;
	};

	module.exports = _route;

})();