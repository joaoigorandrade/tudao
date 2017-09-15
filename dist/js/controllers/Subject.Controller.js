angular.module('TudaoApp')
	.controller('SubjectController', ['$scope', 'Subject', 'Message', '$localStorage',
		function($scope, Subject, Message, $localStorage) {
			$scope.subjects = [];
			$scope.subject 	= {};
			$scope.isFilter = true;
			$scope.filter 	= {};
			$scope.grid 	= {};

			var _init = function() {
				if (!$localStorage.subjects) {
					$scope.GetAllSubjects();
				} else {
					$scope.subjects = $localStorage.subjects;
				}
				$scope.GridConfiguration();
			};

			var _refresh = function() {
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
				$scope.subjects = $localStorage.subjects = data.subjects;
				$scope.GetFilter();
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

			var _getFilter = function() {
				$scope.subjects = $localStorage.subjects.filter(
					SetFilter
				);
				$scope.GridConfiguration();
			};

			var SetFilter = function(subject) {
				var name = $scope.filter.name;

				return (!name || (name && subject.name.toLowerCase().indexOf(name.toLowerCase()) !== -1));
			};

			var _gridConfiguration = function() {
				$scope.grid.size 		= 10;
				$scope.grid.currentPage = 1;
				$scope.grid.pages 		= [];

				var totalPages = 0;
				if ($scope.subjects.length > $scope.grid.size) {
					if ($scope.subjects.length % $scope.grid.size === 0) {
						totalPages = $scope.subjects.length / $scope.grid.size;
					} else {
						totalPages = parseInt($scope.subjects.length / $scope.grid.size) + 1;
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

			var _clearSubject = function() {
				delete $scope.subject;
			};

			$scope.Init 				= _init;
			$scope.Refresh 				= _refresh;
			$scope.SaveSubject 			= _saveSubject;
			$scope.ConfirmDeleteSubject = _confirmDeleteSubject;
			$scope.DeleteSubject 		= _deleteSubject;			
			$scope.GetAllSubjects 		= _getAllSubjects;
			$scope.GetByIdSubject 		= _getByIdSubject;
			$scope.GetFilter 			= _getFilter;
			$scope.GridConfiguration 	= _gridConfiguration;
			$scope.SetPage 				= _setPage;
			$scope.ToggleFilter 		= _toggleFilter;
			$scope.ClearSubject 		= _clearSubject;
}]);