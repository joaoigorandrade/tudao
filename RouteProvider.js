"use strict";

var QuestionRoute = require('./api/routes/QuestionRoute');

(function() {

	var _route = function(app) {
		app.use('/api/question', QuestionRoute());
	};

	module.exports = _route;
})();