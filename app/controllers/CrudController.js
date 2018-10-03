var apiURL = "http://localhost:3591";

rwds.controller("FormController", function ($scope, $http) {
    $http.get(apiURL + "/api/form").then(function successCallback(response) {
        $scope.forms = response.data;
    });

    $scope.deleteMessage = function (id) {
        console.log('Pesan Dihapus');
        $http.delete(apiURL + '/api/form/' + id).then(function successCallback(response) {
            $scope.forms = response;
        }, function errorCallback(response) {
            $scope.forms = response;
        });
    };


    $scope.updateMessage = function (id, o) {
        console.log('Message Update');
        $http.put(apiURL + '/api/form/' + id, o).then(function successCallback(response) {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            console.log('Pembaharuan data Berhasil');
            $scope.forms = response;
        })
    };

    $scope.updateMessageFormToggle = function (id) {
        //alert("Message Update with id = " + id);
        console.log('Message Update Form Toggle');
        $(function () {
            var selected = '#updateMessage' + id;
            if ($(selected).is(':hidden')) {
                $(".updateMessageTD").fadeOut(200);
                $(selected).delay(400).fadeIn(400);
            }
            else {
                $(".updateMessageTD").fadeOut(400);
            }
        });
    };
});

rwds.controller("FormInputController", function ($scope, $http) {
    $scope.createMessage = function () {
        console.log('$scope.form.nama_lengkap = ' + $scope.form.nama_lengkap);
        console.log($scope.form);
        $http.post(apiURL + '/api/form', $scope.form).then(function successCallback(data, status) {
            console.log('posted successfully');
            console.log('InvalidateEvent is emit.');
            $scope.$parent.$broadcast('InvalidateEvent', [1, 2, 3]);
        }, function errorCallback(data, err) {
            console.error("error in posting " + data);
            console.log(data);
        });

        $http.get(apiURL + "/api/form").then(function successCallback(response) {
            $scope.LogResult = response;
        });
    };
});
