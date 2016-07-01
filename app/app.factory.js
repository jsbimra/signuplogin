(function(angular) {

    "use strict";

    /**
     * loansingh Module
     *
     * Description
     */

    function appFactory($timeout) {
        var factory = {
            timerCountDown: timerCountDown,
        };

        return factory;

        /* Timer counter to count down the default value */
        function timerCountDown() {

        }
    };


    angular.module('lsLenderApp').factory('appFactory', ['$timeout', appFactory]);

})(window.angular);
