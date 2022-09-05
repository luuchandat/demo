
var app = angular.module('myapp', ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/sapchieu", {
            templateUrl: "layout/sapchieu.html"
        })
        .when("/dangchieu", {
            templateUrl: "layout/dangchieu.html"
        })
        .when("/info", {
            templateUrl: "layout/info.html"
        })
        .otherwise({
            templateUrl: "layout/trangchu.html"
        });

});

app.controller('ctrl', function ($scope, $http) {
    $scope.item3 = [];
    $http.get("./json/tonghop.json").then(function (response) {
        $scope.item3 = response.data;
        $scope.pagecount = Math.ceil($scope.item3.length / $scope.pagesize);
    }, function (response) {
        alert("Loi");
    });
    $scope.maso = 1;
    $scope.info = function (id) {
        $scope.maso = id;
        return $scope.maso;
    };
    $scope.col = '';
    $scope.flag = false;
    $scope.sapxep = function (col) {
        $scope.col = col;
        if ($scope.flag == true) {
            $scope.flag = false;
        }
        else
            $scope.flag = true;
    };
    $scope.pagesize = 4;
    $scope.begin = 0;
    $scope.pagecount = Math.ceil($scope.item3.length / $scope.pagesize);
    $scope.thugon = false;
    $scope.all = function () {
        if ($scope.thugon == false) {
            $scope.pagesize = $scope.item3.length;
            $scope.thugon = true;
        }
        else {
            $scope.pagesize = 4;
            $scope.thugon = false;
        }

    };
    $scope.first = function () {
        $scope.begin = 0;
    };
    $scope.next = function () {
        if ($scope.begin < ($scope.pagecount - 1) * $scope.pagesize) {
            $scope.begin += $scope.pagesize;
        }
    };
    $scope.previous = function () {
        if ($scope.begin > 0) {
            $scope.begin -= $scope.pagesize;
        }
    };
    $scope.last = function () {
        $scope.begin = ($scope.pagecount - 1) * $scope.pagesize;

    };
});
