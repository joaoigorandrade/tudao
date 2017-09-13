angular.module('TudaoApp').config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
}]);

angular.module('TudaoApp').config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/index.view.html',
			title: 'TudaoApp | Amaro Corp',
			controller:  'IndexController'
		})
		.when('/question', {
			templateUrl: 'views/question.view.html',
			title: 'TudaoApp | Amaro Corp',
			controller:  'QuestionController'
		})
		.when('/subject', {
			templateUrl: 'views/subject.view.html',
			title: 'TudaoApp | Amaro Corp',
			controller:  'SubjectController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);