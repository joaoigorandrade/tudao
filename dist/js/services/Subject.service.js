angular.module('TudaoApp')
	.service('Subject', ['Web',
		function(Web) {

			var _create = function(subject, callback) {
				Web.Post(
					'/api/subject',
					subject,
					callback
				);
			};

			var _update = function(subject, id, callback) {
				Web.Put(
					'/api/subject/' + id,
					subject,
					callback
				);
			};

			var _delete = function(id, callback) {
				Web.Delete(
					'/api/subject/' + id,
					callback
				);
			};

			var _findAll = function(callback) {
				Web.Get(
					'/api/subject',
					callback
				);
			};

			var _findById = function(id, callback) {
				Web.Get(
					'/api/subject/' + id,
					callback
				);
			};

			this.Create 	= _create;
			this.Update 	= _update;
			this.Delete 	= _delete;
			this.FindAll 	= _findAll;
			this.FindById 	= _findById;
}]);