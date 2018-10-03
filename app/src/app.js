var rwds = angular.module('RWDSApp', ['ngRoute']);

rwds.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);