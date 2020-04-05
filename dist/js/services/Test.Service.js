angular.module('TudaoApp')
	.service('Test', ['Web',
		function(Web) {

			var _create = function(test, callback) {
				Web.Post(
					'/api/test',
					test,
					callback
				);
			};

			var _update = function(test, id, callback) {
				Web.Put(
					'/api/test/' + id,
					test,
					callback
				);
			};

			var _delete = function(id, callback) {
				Web.Delete(
					'/api/test/' + id,
					callback
				);
			};

			var _findAll = function(callback) {
				Web.Get(
					'/api/test',
					callback
				);
			};

			var _findById = function(id, callback) {
				Web.Get(
					'/api/test/' + id,
					callback
				);
			};

			var _findByFkSubject = function(fkSubject, callback) {
				Web.Get(
					'/api/test/fkSubject/' + fkSubject,
					callback
				);
			};

			this.Create 			= _create;
			this.Update 			= _update;
			this.Delete 			= _delete;
			this.FindAll 			= _findAll;
			this.FindById 			= _findById;
			this.FindByFkSubject	= _findByFkSubject;
}]);