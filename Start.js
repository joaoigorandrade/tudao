"use strict";

var RouteProvider = require('./RouteProvider');

(function(self) {

	var _init = function(App) {
		RouteProvider(App);
	};

	self.Init = _init;

})(this);