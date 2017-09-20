angular.module('TudaoApp')
	.controller('IndexController', ['$scope', 'Question', 'Subject', 'Test', '$localStorage', '$interval', 'Message',
		function($scope, Question, Subject, Test, $localStorage, $interval, Message) {
			$scope.questions 	= [];
			$scope.subjects 	= [];
			$scope.tests 		= [];
			$scope.test 		= {};
			$scope.testsNotRead = 0;
			$scope.testOpened 	= false;
			$scope.newTest 		= false;
			$scope.filter 		= {};
			$scope.grid 		= {};
			
			var isRefreshedQuestion = false;
			var isRefreshedTest 	= false;
			var isRefreshedSubject 	= false;
			var testInterval 	= null;

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

				if (!$localStorage.tests) {
					$scope.GetAllTests();
				} else {
					$scope.tests = $localStorage.tests;
				}

				$scope.GridConfiguration();
				$scope.GetFilterStorage();
				$scope.GetFilter();
				$scope.GetTestsLoop();
			};

			var _refresh = function() {
				$('#refresh').button('loading');
				$scope.GetAllQuestions();
				$scope.GetAllSubjects();
				$scope.GetAllTests();
			};

			var _getAllQuestions = function() {
				isRefreshedQuestion = true;
				Question.FindAll(
					SetAllQuestions
				);
			};

			var SetAllQuestions = function(data, status) {
				isRefreshedQuestion = false;
				if (!data.success) {
					Message.Show(data.message, 'Find has Error', 'error');

					return;
				}
				$localStorage.questions = data.questions;
				$scope.GetFilter();
				
				if (!isRefreshedQuestion && !isRefreshedTest && !isRefreshedSubject)
					$('#refresh').button('reset');
			};

			var _getAllSubjects = function() {
				isRefreshedSubject = true;
				Subject.FindAll(
					SetAllSubjects
				);
			};

			var SetAllSubjects = function(data, status) {
				isRefreshedSubject = false;
				if (!data.success) {
					Message.Show(data.message, 'Find has Error', 'error');

					return;
				}
				$scope.subjects = data.subjects;
				
				if (!isRefreshedQuestion && !isRefreshedTest && !isRefreshedSubject)
					$('#refresh').button('reset');
			};

			var _getAllTests = function() {
				isRefreshedTest = true;
				if (!$scope.filter.subject) {
					isRefreshedTest = false;
					return;
				}
				
				Test.FindByFkSubject(
					$scope.filter.subject.id,
					SetAllTests
				);
			};

			var SetAllTests = function(data, status) {
				isRefreshedTest = false;
				if (!data.success) {
					Message.Show(data.message, 'Find has Error', 'error');

					return;
				}

				if (data.tests.length === $scope.tests.length)
					return;

				$scope.testsNotRead = $scope.testsNotRead + (data.tests.length - $scope.tests.length);
				$scope.tests 		= $localStorage.tests = data.tests;
				
				if (!isRefreshedQuestion && !isRefreshedTest && !isRefreshedSubject)
					$('#refresh').button('reset');
			};

			var _getTestsLoop = function() {
				SetTestsLoop();
				testInterval = $interval(
					SetTestsLoop,
					3000
				);
			};

			var SetTestsLoop = function() {
				if ($scope.testOpened) {
					$scope.testsNotRead = 0;
				}
				$scope.GetAllTests();
			};

			var _getFilterStorage = function() {
				if ($localStorage.subject)
					$scope.filter.subject = $localStorage.subject;
			};

			var _setFilterStorage = function() {
				$localStorage.subject = $scope.filter.subject;
				$scope.GetFilter();
			};

			var _toggleTest = function() {
				$scope.testOpened 	= !$scope.testOpened;
				if ($scope.testOpened) {
					$scope.testsNotRead = 0;
				}
			};

			var _toggleNewTest = function(test) {
				$scope.newTest = !$scope.newTest;
				$scope.test = test || {};
			};

			var _saveTest = function() {
				$('#send').button('loading');

				if ($scope.filter.subject)
					$scope.test.subject 	= $scope.filter.subject;
					$scope.test.fkSubject 	= $scope.filter.subject.id;

				if ($scope.test && $scope.test.id) {
					Test.Update(
						$scope.test,
						$scope.test.id,
						CallbackSaveTest
					);
				} else {
					Test.Create(
						$scope.test,
						CallbackSaveTest
					);
				}
			};

			var CallbackSaveTest = function(data, status) {
				$('#send').button('reset');

				if (!data.success) {
					Message.Show(data.message, 'Save has Error', 'error');
					return;
				}

				delete $scope.test;

				$scope.GetAllTests();
				$scope.ToggleNewTest();
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

			$scope.$on('$destroy', function() {
			    if(testInterval)
			        $interval.cancel(testInterval);   
			});

			$scope.Init 				= _init;
			$scope.Refresh 				= _refresh;
			$scope.GetAllQuestions 		= _getAllQuestions;
			$scope.GetAllSubjects 		= _getAllSubjects;
			$scope.GetAllTests 			= _getAllTests;
			$scope.GetTestsLoop 		= _getTestsLoop;
			$scope.GetFilterStorage 	= _getFilterStorage;
			$scope.SetFilterStorage 	= _setFilterStorage;
			$scope.ToggleTest 			= _toggleTest;
			$scope.ToggleNewTest 		= _toggleNewTest;
			$scope.SaveTest 			= _saveTest;
			$scope.GetFilter 			= _getFilter;
			$scope.GridConfiguration 	= _gridConfiguration;
			$scope.SetPage 				= _setPage;
}]);
