angular.module('TudaoApp')
	.controller('SubjectController', ['$scope', 'Subject', 'Message',
		function($scope, Subject, Message) {
			$scope.subjects = [];
			$scope.subject 	= {};

			var _init = function() {
				$scope.GetAllSubjects();
			};

			var _saveSubject = function($event) {
				var element = $event.currentTarget;
				$(element).button('loading');

				if ($scope.subject.id) {
					Subject.Update(
						$scope.subject,
						$scope.subject.id,
						CallbackSaveSubject.bind(this, element)
					);
				} else {
					Subject.Create(
						$scope.subject,
						CallbackSaveSubject.bind(this, element)
					);
				}
			};

			var CallbackSaveSubject = function(element, data, status) {
				$(element).button('reset');

				if (!data.success) {
					Message.Show(data.message, 'Save has Error', 'error');
					return;
				}

				delete $scope.subject;

				$scope.GetAllSubjects();

				Message.Show(data.message, 'Success', 'success');

				$('.modal').modal('hide');
			};

			var _confirmDeleteSubject = function(id) {
				Message.Confirm('Are You Sure You Want to Delete This Subject?',
								'Confirmation',
								$scope.DeleteSubject.bind(this, id),
								function() { });
			};

			var _deleteSubject = function(id) {
				Subject.Delete(
					id,
					callbackDeleteSubject
				);
			};

			var callbackDeleteSubject = function(data, status) {
				if (!data.success) {
					Message.Show(data.message, 'Remove has Error', 'error');

					return;
				}

				$scope.GetAllSubjects();

				Message.Show(data.message, 'Success', 'success');
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

			var _getByIdSubject = function(id) {
				Subject.FindById(
					id,
					SetByIdSubject
				);
			};

			var SetByIdSubject = function(data, status) {
				if (!data.success) {
					Message.Show(data.message, 'Find has Error', 'error');

					return;
				}

				$scope.subject = data.subject;

				$('#CreateUpdate').modal('show');
			};

			var _clearSubject = function() {
				delete $scope.subject;
			};

			$scope.Init 				= _init;
			$scope.SaveSubject 			= _saveSubject;
			$scope.ConfirmDeleteSubject = _confirmDeleteSubject;
			$scope.DeleteSubject 		= _deleteSubject;			
			$scope.GetAllSubjects 		= _getAllSubjects;
			$scope.GetByIdSubject 		= _getByIdSubject;
			$scope.ClearSubject 		= _clearSubject;
}]);