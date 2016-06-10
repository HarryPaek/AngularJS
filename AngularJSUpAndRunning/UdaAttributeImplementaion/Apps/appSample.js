'use strict';

var app = angular.module('sampleApp', [])

app.controller('sampleCtrl', ['$scope', function ($scope) {
    $scope.sampleData = [{ id: 1, name: 'One', value: 'One Value', required: true, definition: { name: 'One', description: 'One Description', type: 'TEXT' }  },
                         { id: 2, name: 'Two', value: 'Two Value', required: false, definition: { name: 'Two', description: 'Two Description', type: 'TEXT' } },
                         { id: 3, name: 'Three', value: 'Three Value', required: false, definition: { name: 'Three', description: 'Three Description', type: 'TEXT' } },
    ];
}]);
