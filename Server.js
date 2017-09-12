"use strict";

var BodyParser      = require('body-parser');
var CookieParser    = require('cookie-parser');
var Cors            = require('cors');
var EJS             = require('ejs');
var Express         = require('express');
var Path            = require('path');

(function(self) {
	var _init = function() {
		var App = Express();

		App.engine('html', EJS.renderFile);

		App.use(BodyParser.urlencoded({
			extended: true
		}));
		App.use(BodyParser.json());
		App.use(CookieParser());
		App.use(Cors());
		App.use(Express.static(Path.join(__dirname, 'public_html')));

		App.listen(5011, function() {
			console.log("Server has Started: http://localhost:5011");
		});
	};

	self.Init = _init;
})(this);

this.Init();