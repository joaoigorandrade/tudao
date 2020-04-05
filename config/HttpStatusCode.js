"use strict";

(function(self) {
	var _success = {
		OK		 : 200,
		CREATED	 : 201,
		ACCEPTED : 202
	};

	var _error = {
		BAD_REQUEST 	: 400,
		UNAUTHORIZED 	: 401,
		NOT_FOUND 		: 404
	};

	self.Success 	= _success;
	self.Error 		= _error;

})(this);