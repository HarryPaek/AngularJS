'use strict';

var app = angular.module('templateUsageApp', [])

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.mydata = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }, { id: 3, name: 'Three' }];
    $scope.doSomething = function (id) {
        alert(id);
    }
    $scope.doServerSomething = function (id) {
        alert('Server Alert = [' + id + ']');
    }
}]);

app.directive('myDirective', ['$templateCache', '$compile', function ($templateCache, $compile) {
    return {
        restrict: 'EA',
        scope: {
            template: "@",
            mydata: "=",
            mycallback: "&"
        },
        link: function (scope, element) {
            var template = $templateCache.get(scope.template);
            scope.values = scope.mydata;
            scope.doSomething = scope.mycallback;
            element.append($compile(template)(scope));
        }
    }
}]);

app.directive('myServerDirective', ['$http', '$templateCache', '$compile', function ($http, $templateCache, $compile) {
    return {
        restrict: 'EA',

        scope: {
            template: "@",
            mydata: "=",
            mycallback: "&"
        },

        link: function (scope, element) {
            var templateUrl = 'Apps/Templates/' + scope.template;
            scope.values = scope.mydata;
            scope.doSomething = scope.mycallback;

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
