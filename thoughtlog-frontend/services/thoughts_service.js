(function () {
    'use strict';

    angular
        .module('app')
        .factory('ThoughtsService', ThoughtsService);

    ThoughtsService.$inject = ['$http'];
    function ThoughtsService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('http://localhost:8021/api/thoughts').then(handleSuccess, handleError('Error getting all thoughts'));
        }

        function GetById(id) {
            return $http.get('/api/thoughts/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/thoughts/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(thought, currentUser) {
            // var url = 'http://localhost:8021/api/thoughts';
            // var config = {
            //     headers : {
            //         'Content-Type': 'application/json;charset=utf-8;'
            //     }
            // }
            // var data = thought;
            // return $http.post(url, data, config).then(function(res){
            //  handleSuccess(res)
            // }, 
            // function(error){
            //     handleError(error)
            // });

            // var parameter = JSON.stringify({thought : {description : thought.description}});
            thought.created_by = currentUser.username
            return $http.post('http://localhost:8021/api/thoughts', thought).then(handleSuccess({data:true}), handleError('Error adding thought'));
        }

        function Update(user) {
            return $http.put('/api/thoughts/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/thoughts/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
