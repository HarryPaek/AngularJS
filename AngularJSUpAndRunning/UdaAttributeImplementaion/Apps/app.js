'use strict';

var app = angular.module('udaAttributeApp', [])

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.udaData = [{ id: 1, name: 'One', value: 'One Value', required: true, definition: { name: 'One', description: 'One Description', type: 'TEXT' }  },
                      { id: 2, name: 'Two', value: 'Two Value', required: false, definition: { name: 'Two', description: 'Two Description', type: 'TEXT' } },
                      { id: 3, name: 'Three', value: 'Three Value', required: false, definition: { name: 'Three', description: 'Three Description', type: 'TEXT' } },
    ];

    $scope.doUDASomething = function (id) {
        alert('UDA Attribute Alert = [' + id + ']');
    }
}]);

app.directive('udaDirective', ['$http', '$templateCache', '$compile', function ($http, $templateCache, $compile) {
    return {
        restrict: 'EA',

        scope: {
            myUDAdatum: "=udaattr",
            myUDAcallback: "&clickcallback"
        },

        link: function (scope, element) {
            var templateName = 'udaDirectiveDefaultTemplate.html';

            switch (scope.myUDAdatum.definition.type) {
                case "NUMBER":
                case "DATE":
                case "TEXT":
                case "LIST":
                case "MEMO":
                    templateName = 'udaDirectiveDefaultTemplate.html';
                    break;

                default:
                    templateName = 'udaDirectiveDefaultTemplate.html';
            }

            var templateUrl = 'Apps/Templates/' + templateName;
            scope.udaAttribute = scope.myUDAdatum;
            scope.doSomething = scope.myUDAcallback;

            $http({ method: 'GET', url: templateUrl, cache: $templateCache }).
                then(function (response) {
                    scope.data = response.data;
                    scope.status = response.status;

                    // element.html(response.data);
                    element.append($compile(response.data)(scope));

                    // return $compile(element.contents())(scope);
                }, function (response) {
                    scope.data = response.data || "Request failed";
                    scope.status = response.status;
                });
        }
    }
}]);
