"use strict";

var QuestionRoute 	= require('./api/routes/QuestionRoute');
var SubjectRoute 	= require('./api/routes/SubjectRoute');
var TestRoute 		= require('./api/routes/TestRoute');

(function() {

	var _route = function(app) {
		app.use('/api/question', QuestionRoute());
		app.use('/api/subject', SubjectRoute());
		app.use('/api/test', TestRoute());
	};

	module.exports = _route;
})();