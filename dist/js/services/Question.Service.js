angular.module('TudaoApp')
	.service('Question', ['Web',
		function(Web) {

			var _create = function(question, callback) {
				Web.Post(
					'/api/question',
					question,
					callback
				);
			};

			var _update = function(question, id, callback) {
				Web.Put(
					'/api/question/' + id,
					question,
					callback
				);
			};

			var _delete = function(id, callback) {
				Web.Delete(
					'/api/question/' + id,
					callback
				);
			};

			var _findAll = function(callback) {
				Web.Get(
					'/api/question',
					callback
				);
			};

			var _findById = function(id, callback) {
				Web.Get(
					'/api/question/' + id,
					callback
				);
			};

			var _findByDescription = function(filter, callback) {
				Web.Post(
					'/api/question/findByDescription',
					filter,
					callback
				);
			};

			this.Create 			= _create;
			this.Update 			= _update;
			this.Delete 			= _delete;
			this.FindAll 			= _findAll;
			this.FindById 			= _findById;
			this.FindByDescription 	= _findByDescription;
}]);