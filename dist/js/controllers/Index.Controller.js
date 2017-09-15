angular.module('TudaoApp')
	.controller('IndexController', ['$scope', 'Question', 'Subject', '$localStorage',
		function($scope, Question, Subject, $localStorage) {
			$scope.questions 	= [];
			$scope.subjects 	= [];
			$scope.filter 		= {};
			$scope.grid 		= {};

			var _init = function() {
				if (!$localStorage.questions) {
					$scope.GetAllQuestions();
				} else {
					$scope.questions = $localStorage.questions;
				}

				if (!$localStorage.subjects) {
					$scope.GetAllSubjects();
				} else {
					$scope.subjects = $localStorage.subjects;
				}

				$scope.GridConfiguration();
				$scope.GetFilterStorage();
			};

			var _refresh = function() {
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

				$scope.GridConfiguration();
			};

			var SetFilter = function(question) {
				var description = $scope.filter.description;
				var subject = $scope.filter.subject;

				return (!description || (description && question.description.toLowerCase().indexOf(description.toLowerCase()) !== -1)) &&
					   (!subject     || (subject     && question.subject.id === subject.id));
			};

			var _gridConfiguration = function() {
				$scope.grid.size 		= 10;
				$scope.grid.currentPage = 1;
				$scope.grid.pages 		= [];

				var totalPages = 0;
				if ($scope.questions.length > $scope.grid.size) {
					if ($scope.questions.length % $scope.grid.size === 0) {
						totalPages = $scope.questions.length / $scope.grid.size;
					} else {
						totalPages = parseInt($scope.questions.length / $scope.grid.size) + 1;
					}
				} else {
					totalPages = 1;
				}

				for (var i = 0; i < totalPages; ++i) {
					$scope.grid.pages.push((i + 1));
				}
			};

			var _setPage = function(currentPage) {
				if (currentPage < 1 || currentPage > $scope.grid.pages.length)
					return;

				$scope.grid.currentPage = currentPage;
			};

			$scope.Init 				= _init;
			$scope.Refresh 				= _refresh;
			$scope.GetAllQuestions 		= _getAllQuestions;
			$scope.GetAllSubjects 		= _getAllSubjects;
			$scope.GetFilterStorage 	= _getFilterStorage;
			$scope.SetFilterStorage 	= _setFilterStorage;
			$scope.GetFilter 			= _getFilter;
			$scope.GridConfiguration 	= _gridConfiguration;
			$scope.SetPage 				= _setPage;
}]);