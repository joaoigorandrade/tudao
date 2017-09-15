angular.module('TudaoApp')
	.controller('QuestionController', ['$scope', 'Question', 'Subject', 'Message', '$localStorage',
		function($scope, Question, Subject, Message, $localStorage) {
			$scope.questions 	= [];
			$scope.subjects 	= [];
			$scope.question 	= {};
			$scope.isFilter 	= true;
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
			};

			var _refresh = function() {
				$scope.GetAllQuestions();
				$scope.GetAllSubjects();
			};

			var _saveQuestion = function($event) {
				var element = $event.currentTarget;
				$(element).button('loading');

				if ($scope.question) {
					$scope.question.fkSubject = $scope.question.subject ? $scope.question.subject.id : null;
				}

				if ($scope.question && $scope.question.id) {
					Question.Update(
						$scope.question,
						$scope.question.id,
						CallbackSaveQuestion.bind(this, element)
					);
				} else {
					Question.Create(
						$scope.question,
						CallbackSaveQuestion.bind(this, element)
					);
				}
			};

			var CallbackSaveQuestion = function(element, data, status) {
				$(element).button('reset');

				if (!data.success) {
					Message.Show(data.message, 'Save has Error', 'error');
					return;
				}

				delete $scope.question;

				$scope.GetAllQuestions();

				Message.Show(data.message, 'Success', 'success');

				$('.modal').modal('hide');
			};

			var _confirmDeleteQuestion = function(id) {
				Message.Confirm('Are You Sure You Want to Delete This Question?',
								'Confirmation',
								$scope.DeleteQuestion.bind(this, id),
								function() { });
			};

			var _deleteQuestion = function(id) {
				Question.Delete(
					id,
					callbackDeleteQuestion
				);
			};

			var callbackDeleteQuestion = function(data, status) {
				if (!data.success) {
					Message.Show(data.message, 'Remove has Error', 'error');

					return;
				}

				$scope.GetAllQuestions();

				Message.Show(data.message, 'Success', 'success');
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
				$scope.questions = $localStorage.questions = data.questions;
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
				$scope.subjects = $localStorage.subjects = data.subjects;

				$scope.GridConfiguration();
			};

			var _getByIdQuestion = function(id) {
				Question.FindById(
					id,
					SetByIdQuestion
				);
			};

			var SetByIdQuestion = function(data, status) {
				if (!data.success) {
					Message.Show(data.message, 'Find has Error', 'error');

					return;
				}

				$scope.question = data.question;

				$('#CreateUpdate').modal('show');
			};

			var _getFilter = function() {
				$scope.questions = $localStorage.questions.filter(
					SetFilter
				);
				$scope.GridConfiguration();
			};

			var SetFilter = function(question) {
				var description = $scope.filter.description;
				var answer = $scope.filter.answer;
				var subject = $scope.filter.subject;

				return (!description || (description && question.description.toLowerCase().indexOf(description.toLowerCase()) !== -1)) &&
					   (!answer      || (answer 	 && question.answer.toLowerCase().indexOf(answer.toLowerCase()) !== -1)) &&
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

			var _toggleFilter = function() {
				$scope.isFilter = !$scope.isFilter;
				if ($scope.isFilter) {
					$('#filter').show('slow');
				} else {
					$('#filter').hide('slow');
				}
			};

			var _clearQuestion = function() {
				delete $scope.question;
			};

			$scope.Init 					= _init;
			$scope.Refresh 					= _refresh;
			$scope.SaveQuestion 			= _saveQuestion;
			$scope.ConfirmDeleteQuestion 	= _confirmDeleteQuestion;
			$scope.DeleteQuestion 			= _deleteQuestion;
			$scope.GetByIdQuestion 			= _getByIdQuestion;
			$scope.GetAllQuestions 			= _getAllQuestions;
			$scope.GetAllSubjects 			= _getAllSubjects;
			$scope.GetFilter 				= _getFilter;
			$scope.GridConfiguration 		= _gridConfiguration;
			$scope.SetPage 					= _setPage;
			$scope.ToggleFilter 			= _toggleFilter;
			$scope.ClearQuestion 			= _clearQuestion;
}]);