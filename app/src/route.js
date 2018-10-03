rwds.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when('/', {
        templateUrl: './views/home.html',
        controller: 'HomeController'
    })
        .when('/about', {
            templateUrl: './views/home.html',
            controller: 'AboutController'
        })
        .when('/contact', {
            templateUrl: './views/home.html',
            controller: 'ContactController'
        })
        .when('/crud', {
            templateUrl: './views/CRUDForm.html',
            controller: 'FormController',
            controller: 'FormInputController'
        })
        .otherwise({
            redirectTo: '/'
        })
});