"use strict";

var QuestionRoute 	= require('./api/routes/QuestionRoute');
var SubjectRoute 	= require('./api/routes/SubjectRoute');

(function() {

	var _route = function(app) {
		app.use('/api/question', QuestionRoute());
		app.use('/api/subject', SubjectRoute());
	};

	module.exports = _route;
})();