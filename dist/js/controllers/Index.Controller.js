angular.module('TudaoApp')
	.controller('IndexController', ['$scope', 'Question', 'Subject', '$localStorage',
		function($scope, Question, Subject, $localStorage) {
			$scope.questions 	= [];
			$scope.subjects 	= [];
			$scope.filter 		= {};

			var _init = function() {
				$scope.GetFilterStorage();
				$scope.GetAllQuestions();
				$scope.GetAllSubjects();
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
				$localStorage.questions = data.questions;
				$scope.GetFilter();
			};

			var _getAllSubjects = function() {
				Subject.FindAll(
					SetAllSubjects
				);
			};

			var SetAllSubjects = function(data, status) {
				if (!data.success) {
					Message.Show(data.message, 'Find has Error', 'error');

					return;
				}
				$scope.subjects = data.subjects;
			};

			var _getFilterStorage = function() {
				if ($localStorage.subject)
					$scope.filter.subject = $localStorage.subject;
			};

			var _setFilterStorage = function() {
				$localStorage.subject = $scope.filter.subject;
				$scope.GetFilter();
			};

			var _getFilter = function() {
				$scope.questions = $localStorage.questions.filter(
					SetFilter
				);
			};

			var SetFilter = function(question) {
				var description = $scope.filter.description;
				var subject = $scope.filter.subject;

				return (!description || (description && question.description.toLowerCase().indexOf(description.toLowerCase()) !== -1)) &&
					   (!subject     || (subject     && question.subject.id === subject.id));
			};

			$scope.Init 			= _init;
			$scope.GetAllQuestions 	= _getAllQuestions;
			$scope.GetAllSubjects 	= _getAllSubjects;
			$scope.GetFilterStorage = _getFilterStorage;
			$scope.SetFilterStorage = _setFilterStorage;
			$scope.GetFilter 		= _getFilter;
}]);