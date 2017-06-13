(function () {
    'use strict';

    angular
        .module('app')
        .constant('CONSTANTS', {
            REST_URL : 'http://ec2-35-154-178-237.ap-south-1.compute.amazonaws.com',
            // REST_URL : 'http://localhost:8021',
            APP_NAME : 'ThoughtLog'
        });

})();