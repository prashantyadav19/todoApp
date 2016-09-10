var myapp= angular.module('todoApp', ['ngRoute']);

    angular.module('todoApp')
        .controller('itemController', function ($scope ,$http , $rootScope) {

            $http.get('http://localhost:80/allData'
            ).success(function(data, status, headers, config) {
                    $rootScope.list1=data;
                    console.log($scope.list1);
                }).error(function(data, status, headers, config) {
                    alert("Error");
                });

            $scope.myFunc=function() {
                 var obj ={todotext:$scope.todotext}
                $http.post('http://localhost:80/test', obj
                ).success(function(data, status, headers, config) {
                        $rootScope.list=data;
                        console.log($scope.list);
                    }).error(function(data, status, headers, config) {
                        alert("Error");
                    });

                $scope.todotext = '';
            }

        });

   myapp.config(['$routeProvider', function($routeProvider) {
                $routeProvider.
                when('/', {
                    templateUrl: 'templates/item.html',
                    controller: 'itemController'
                }).
               otherwise({
                    redirectTo: '/'
                });
        }]);