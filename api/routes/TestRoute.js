"use strict";

var Express      = require('express');
var TestProvider = require('../providers/TestProvider');

(function() {

	var _route = function() {
		var router = Express.Router();

		router.post('/', TestProvider.Create);
		router.put('/:id', TestProvider.Update);
		router.delete('/:id', TestProvider.Delete);
		router.get('/', TestProvider.FindAll);
		router.get('/:id', TestProvider.FindById);
		router.get('/fkSubject/:fkSubject', TestProvider.FindByFkSubject);

		return router;
	};

	module.exports = _route;

})();