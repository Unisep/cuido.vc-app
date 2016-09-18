App.controller('PersonInformationController', function($scope, $http) {

  $scope.getPersonInformations = function(){
    $http.get('http://localhost:3000/api/person_information.json')
      .then(function successCallback(response) {
        $scope.infos = response.data;
      });
  };

  $scope.getPersonInformations();
});
