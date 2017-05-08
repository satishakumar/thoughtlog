(function () {
    'use strict';

    angular
        .module('app')
        .controller('ThoughtsController', ThoughtsController);

    ThoughtsController.$inject = ['ThoughtsService', '$location', '$scope', 'FlashService'];
    function ThoughtsController(ThoughtsService, $location, $scope, FlashService) {
        var vm = this;

        vm.ThoughtCreate = Create;
        vm.getThoughts = getThoughts;

        function Create() {
            vm.dataLoading = true;
            ThoughtsService.Create(vm.thought, $scope.globals.currentUser).then(function (response) {
                if (response.data) {
                    var thoughtHash = {created_by: $scope.globals.currentUser.username, description: vm.thought.description, created_at: new Date().toLocaleString(),updated_at: new Date().toLocaleString()};
                    $scope.thoughts.push(thoughtHash)
                    emitThought(thoughtHash)
                    FlashService.Success('Thought added successfully', true);
                    $location.path('/');
                    vm.dataLoading = false;
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }

        function getThoughts() {
            vm.dataLoading = true;
            ThoughtsService.GetAll().then(function (response) {
                if (response) {
                    // $scope.thoughts.push({username: $scope.globals.currentUser.username, description: vm.thought.description, createdAt: new Date().toLocaleString()})
                    // FlashService.Success('Thought added successfully', true);
                    // $location.path('/');
                    $scope.thoughts = response
                    vm.dataLoading = false;
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }

        function emitThought(thoughtHash){
            socket.emit('newThought', {
                channel: "notifications",
                thoughtHash: thoughtHash
            });
        }

        getThoughts();
    }

})();
