
(function(angular) {

	"use strict";
    /**
    * lsLenderApp Module
    *
    * Description
    */

    angular.module('lsLenderApp')
        
        // .constant('DOMAIN','http://192.168.200.92:8080/') //NIRANJAN
        // .constant('DOMAIN', 'http://api.loansingh.com/') // FOR PRODUCTION
        .constant('DOMAIN', 'http://staging-api.loansingh.com/') //FOR DEVELOPMENT ENVIORNMENT
     
        .constant('APP_CONSTANT', {
            "COUNT_DOWN_VALUE" : 10
        })

})(window.angular);
