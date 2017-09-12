angular.module('TudaoApp')
	.controller('IndexController', ['$scope', 'Question',
		function($scope, Question) {
			$scope.questions 	= [];
			$scope.filter 		= {};

			var _init = function() {
				$scope.GetAllQuestions();
			};

			var _getAllQuestions = function() {
				Question.FindAll(
					SetAllQuestions
				);
			};

			var SetAllQuestions = function(data, status) {
				if (!data.success) {
					Message.Show(data.message, 'Find has Error', 'error');

					return;
				}
				$scope.questions = data.questions;
			};

			var _getByDescription = function() {
				Question.FindByDescription(
					$scope.filter,
					SetByDescription
				);
			};

			var SetByDescription = function(data, status) {
				if (!data.success) {
					Message.Show(data.message, 'Find has Error', 'error');

					return;
				}
				$scope.questions = data.questions;
			};

			$scope.Init 			= _init;
			$scope.GetAllQuestions 	= _getAllQuestions;
			$scope.GetByDescription = _getByDescription;
}]);