export class AppConstants {
    // Role Ids
    public static userRoleId = '5c780963c544bc6507639753';
    public static adminRoleId = '5c780920c544bc6507639736';
    public static noOfProduct = 1;
    // Patterns
    public static emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    public static passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/; 
    public static phonenoPattern = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
    // User Login Page Messages
    public static userLoginSuccess ='User loggedin successfully!!';
    public static userLoginFailure ='Something went wrong, please try after some time!';
    public static userLoginEmailFormatValidation ='Please enter correct email address';
    public static userLoginEmailRequiredValidation ='Email address is required.';
    public static userLoginPasswordMaxLengthValidation ='Please enter maximum 15 digit Password';    
    public static userLoginPasswordPatternValidation ='Password Pattern error';    
    public static userLoginPasswordRequiredValidation ='Password is required.';
    public static userLoginPasswordMinLengthValidation ='Please enter minimum 8 digit Password';   
    // User Signup Page Constant
    public static userSignupSuccess ='User Signup successfully!!';
    public static userSignupFailure ='Something went wrong, please try after some time!';
    public static userSignupEmailFormatValidation ='Please enter correct email address';
    public static userSignupEmailRequiredValidation ='Email address is required.';
    public static userSignupPasswordMaxLengthValidation ='Please enter maximum 15 digit Password';    
    public static userSignupPasswordPatternValidation ='Password Pattern error';    
    public static userSignupPasswordRequiredValidation ='Password is required.';
    public static userSignupPasswordMinLengthValidation ='Please enter minimum 8 digit First Name';
    public static userSignupFirstNameMaxLengthValidation ='Please enter maximum 8 digit First Name'; 
    public static userSignupFirstNameRequiredValidation ='First Name is required.';
    public static userSignupFirstNameMinLengthValidation ='Please enter minimum 5 digit Last Name';
    public static userSignupLastNameMaxLengthValidation ='Please enter maximum 8 digit Last Name';
    public static userSignupLastNameMinLengthValidation ='Please enter minimum 5 digit Last Name';
    public static userSignupLastNameRequiredValidation ='Phone No is required.'; 
    public static userSignupPhoneNoMaxLengthValidation ='Please enter maximum 8 digit Phone No';
    public static userSignupPhoneNoMinLengthValidation ='Please enter minimum 5 digit Phone No';
    public static userSignupPhoneNoRequiredValidation ='Phone No is required.'; 
    public static userSignupPhoneNoPatternValidation ='Valid Phone No is required.';
    public static userSignupConfirmPasswordRequiredValidation ='Confirm Password is required.';
    public static userSignupConfirmPassworValidation ='Both Password does not match.';

    public static paymentSuccess ='Payment has been successfully!';
    public static paymentFailure ='Something went wrong, please try after some time!';

    public static addedCartSuccess ='Product has been added to cart successfully!';
    public static addedCartFailure ='Something went wrong, please try after some time!';

    public static userFeedbackSuccess = "Thankyou for your valuable feedback!"
}