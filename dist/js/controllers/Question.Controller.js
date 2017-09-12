angular.module('TudaoApp')
	.controller('QuestionController', ['$scope', 'Question', 'Message',
		function($scope, Question, Message) {
			$scope.questions 	= [];
			$scope.question 	= {};

			var _init = function() {
				$scope.GetAllQuestions();
			};

			var _saveQuestion = function($event) {
				var element = $event.currentTarget;
				$(element).button('loading');

				if ($scope.question.id) {
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

				$scope.Init();

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

				$scope.Init();

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
				$scope.questions = data.questions;
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

			var _clearQuestion = function() {
				delete $scope.question;
			};

			$scope.Init 					= _init;
			$scope.SaveQuestion 			= _saveQuestion;
			$scope.ConfirmDeleteQuestion 	= _confirmDeleteQuestion;
			$scope.DeleteQuestion 			= _deleteQuestion;
			$scope.GetByIdQuestion 			= _getByIdQuestion;
			$scope.GetAllQuestions 			= _getAllQuestions;
			$scope.ClearQuestion 			= _clearQuestion;
}]);