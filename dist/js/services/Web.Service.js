angular.module('TudaoApp')
	.service('Web', ['$http',
		function($http) {
			var requestCallbackDefault = function(callback, response) {
				callback(response.data, response.status);
			};

			var _post = function(url, form, callback) {
				$http.post(url, form).then(
					requestCallbackDefault.bind(this, callback),
					requestCallbackDefault.bind(this, callback)
				);
			};

			var _put = function(url, form, callback) {
				$http.put(url, form).then(
					requestCallbackDefault.bind(this, callback),
					requestCallbackDefault.bind(this, callback)
				);
			};

			var _delete = function(url, callback) {
				$http.delete(url).then(
					requestCallbackDefault.bind(this, callback),
					requestCallbackDefault.bind(this, callback)
				);
			};

			var _get = function(url, callback) {
				$http.get(url).then(
					requestCallbackDefault.bind(this, callback),
					requestCallbackDefault.bind(this, callback)
				);
			};

			this.Post 	= _post;
			this.Put 	= _put;
			this.Delete = _delete;
			this.Get 	= _get;
}]);