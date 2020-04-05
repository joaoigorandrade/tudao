"use strict";

var Express      	= require('express');
var SubjectProvider = require('../providers/SubjectProvider');

(function() {

	var _route = function() {
		var router = Express.Router();

		router.post('/', SubjectProvider.Create);
		router.put('/:id', SubjectProvider.Update);
		router.delete('/:id', SubjectProvider.Delete);
		router.get('/', SubjectProvider.FindAll);
		router.get('/:id', SubjectProvider.FindById);

		return router;
	};

	module.exports = _route;

})();