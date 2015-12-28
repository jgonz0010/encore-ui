/*jshint unused:false*/
angular.module('demoApp')
.controller('rxFloatingHeaderCtrl', function ($scope) {
    $scope.searchText = '';
    $scope.data = [
        { name: 'A', value: 1 },
        { name: 'B', value: 2 },
        { name: 'C', value: 3 },
        { name: 'D', value: 4 },
        { name: 'E', value: 5 },
        { name: 'First', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'G', value: 2 },
        { name: 'H', value: 3 },
        { name: 'I', value: 4 },
        { name: 'J', value: 5 },
        { name: 'K', value: 1 },
        { name: 'L', value: 2 }
    ];

    $scope.clearFilter = function () {
        $scope.searchText = '';
    };
});
