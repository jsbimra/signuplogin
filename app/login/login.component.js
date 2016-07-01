(function(angular) {

    "use strict";

    /**
     * @memberOf lsLenderApp
     * @name login
     * @param {Service} $scope service to provide scope between controller and view of component
     * @description login controller
     */

    /* @ngInject */
    function loginController($scope, $location, $timeout, appFactory, APP_CONSTANT) {
        var vm = this;
        var OTPTimeOut = undefined;

        vm.OTPTimer              = APP_CONSTANT.COUNT_DOWN_VALUE;
        vm.tempOTP               = 1234;
        vm.regexMobileEmail      = /^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|^[0-9]{10,10}$/;
        vm.user                  = {
            mobOrEmail: '1230',
            password: '1203'
        };
        vm.createPassword        = {
            newPassword: '',
            confirmPasword: ''
        };
        vm.modSignup = {
            mobileno: 15240,
            email: 'test@',
            password: '15420'
        };

        vm.nonTabActive             = false;
        vm.showForgotPwdPanel       = false;
        vm.showCreateNewPwdPanel    = false;
        vm.showSignupOTPPanel       = false;
        vm.changeOTPMobileField     = false;
        vm.showSignupResendOTPPanel = false;
        vm.showVerifyEmailPanel     = false;
        vm.showChangeEmailIdPanel   = false;
        vm.successEmailIdFlag       = false;

        /* method vm definiations */
        vm.backToLoginScreen     = backToLoginScreen;
        vm.forgotPwdTrigger      = forgotPwdTrigger;
        vm.createNewPwdTrigger   = createNewPwdTrigger;
        vm.submitSignup          = submitSignup;
        vm.changeMobileNoTrigger = changeMobileNoTrigger;
        vm.signupOTPVerify       = signupOTPVerify;
        vm.resendSignupOTP       = resendSignupOTP;
        vm.changeEmailIDTrigger  = changeEmailIDTrigger;
        vm.resendEmailAddress    = resendEmailAddress;
        vm.submitChangeEmailId   = submitChangeEmailId;
        vm.resetForm             = resetForm;
        vm.timerCountDown        = timerCountDown;

        vm.$routerOnActivate = function(next, prev) {

            /**
             * @function emit
             * @param {Boolean} true to emit hideNavFlag
             */
            $scope.$emit('hideNavFlag', true);

            /* set setLoadingBar false */
            $scope.$emit('setLoadingBar', false);

            $('#loginSignupModal').modal('show');

            // console.info('login controller loadded');
        };

        vm.$routerOnDeactivate = function() {
            /**
             * @function emit
             * @param {Boolean} false to emit hideNavFlag
             */
            $scope.$emit('hideNavFlag', false);
        };


        /*
        * Login: Take users back to login screen on POPUP modal
        */
        function backToLoginScreen () {
            vm.nonTabActive = false;
            vm.showForgotPwdPanel = false; 
            vm.showCreateNewPwdPanel = false; 
        }


        /*
        * Login: submitLogin take user to the flow
        */
        function submitLogin(form) {
            if(form && form.$valid){
                console.info('Login form submitted ');       
            }
        }


        /*
        * Forgot Password: Invoked when forgot password link triggerd
        */
        function forgotPwdTrigger() {
            vm.nonTabActive = true;
            vm.showForgotPwdPanel = true; 

            /* invoke reset form method */
            vm.resetForm('login');
        }


        /*
        * Create New Password: Invoked when create new password link triggerd
        */
        function createNewPwdTrigger(){
            vm.nonTabActive = true;
            vm.showForgotPwdPanel = false;
            vm.showCreateNewPwdPanel = true; 
        }


        /* Reset form fields navigating between screens */
        function resetForm(form){

            /*Reseting login form */
            if(form && form === 'login'){
                $timeout(function() {
                    vm.frmLogin.$setPristine();
                    vm.user.mobOrEmail = '';
                    vm.user.password = '';
                },0);

            }

            if(form && form === 'signup'){
               $timeout(function() {
                    vm.frmSignup.$setPristine();
                    vm.modSignup.number = '';
                    vm.modSignup.email = '';
                    vm.modSignup.password = '';


                    /* Hide if signup otp form and make visible signup form */
                    vm.frmSignupOTP.$setPristine();
                    vm.modSignupOTP = '';
                    vm.showSignupOTPPanel = false;
                },0);

            }

        }


        /* Register: Show mobile no field on changeMobileNoTrigger link clicked */
        function changeMobileNoTrigger() {
            vm.changeOTPMobileField = true;
        }


        /*
        * Register: Submiting Signup/Register form
        */
        function submitSignup(form){
            if(form.$valid){
                console.info('signup form validated');
                vm.showSignupOTPPanel = true;

                console.info('modSignupOTP ', vm.modSignupOTP);
            }
        }


        /*
        * Register: Verify Signup OTP
        */
        function signupOTPVerify(form) {
            //console.info(form);
            
            if(form.$valid && vm.OTPTimer !== 0){
                
                console.info('signup otp form validated');

                vm.showSignupResendOTPPanel = true;    
                vm.invalidOTPMsgFlag = false;


                /*cancel the OTP timeout before invoking it again */
                $timeout.cancel(OTPTimeOut);

                /*Starting countdown timer */
                startCountDownTimer();   

                console.info(vm.modSignupOTP);

                if(vm.modSignupOTP == '1234'){
                    vm.showVerifyEmailPanel = true;
                    vm.nonTabActive = true;
                    vm.validOTPMsgFlag = true;
                }else{
                    vm.invalidOTPMsgFlag = true;
                }
            }
        }


        /*
        * Register: resend signup otp method
        */
        function resendSignupOTP() {
            console.info('Resend sign-up otp triggered');
            
            /*Starting countdown timer */
            reStartCountDownTimer();

            /*RESET OTP MODEL VALUE */
            vm.modSignupOTP = '';
        }


        /*
        * Register: Allowing to change the email address again
        */
        function changeEmailIDTrigger (form) {        
            console.info('Changed email address triggered ',form);   
            vm.showChangeEmailIdPanel = true;
        }


        /*
        * Register: Submitting changed email address again.
        */
        function submitChangeEmailId(form) {     
            console.info('Change email address form submitted');
            if(form && form.$valid){

                vm.showChangeEmailIdPanel = false;
                vm.successEmailIdFlag = true;

                /*show success sent message and show back the resend email button after some secs*/
                $timeout(function(){
                    vm.showChangeEmailIdPanel = false;
                    vm.successEmailIdFlag = false;
                },1500);

            }
        }

        


        /*
        * Register: Resending email address back to user
        */
        function resendEmailAddress(email) {
            if(email){
                console.info('resend email fired', email);
            }
        }


        /*
        * Register: Method to make the timer count down in start mode
        */
        function startCountDownTimer(){
            OTPTimeOut = $timeout(vm.timerCountDown,1000);
        }

        /*
        * Register: Method to make the restart the timer count down back again
        */
        function reStartCountDownTimer(){
            vm.OTPTimer = APP_CONSTANT.COUNT_DOWN_VALUE;
            OTPTimeOut = $timeout(vm.timerCountDown,1000);
        }


        /* 
        * Register: Timer counter to count down to 0  
        */
        function timerCountDown() {
            vm.OTPTimer--;
            OTPTimeOut = $timeout(vm.timerCountDown,1000);

            if(vm.OTPTimer===0){
                $timeout.cancel(OTPTimeOut);
            }
        }


    };/* controller code end */

    angular.module('lsLenderApp')
        .component('loginComponent', {
            templateUrl: 'app/login/login.html',
            controller: loginController,
            controllerAs: 'loginCtrl',
        });

})(window.angular);
