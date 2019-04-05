import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { AppConstants } from '../../config/appConstants';
import { PasswordValidator } from '../../config/confirmpassword';
import { LoginService } from '../../users/models/login.service'; 
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[LoginService]
}) 
export class SignupComponent implements OnInit {

  userSignupForm:FormGroup;

  firstNameRequiredValidation = AppConstants.userSignupFirstNameRequiredValidation;
  firstNameMinLengthValidation = AppConstants.userSignupFirstNameMinLengthValidation;
  firstNameMaxLengthValidation = AppConstants.userSignupFirstNameMaxLengthValidation;

  lastNameRequiredValidation = AppConstants.userSignupLastNameRequiredValidation;
  lastNameMinLengthValidation = AppConstants.userSignupLastNameMinLengthValidation;
  lastNameMaxLengthValidation = AppConstants.userSignupLastNameMaxLengthValidation;

  emailFormateValidation = AppConstants.userSignupEmailFormatValidation;
  emailRequiredValidation = AppConstants.userSignupEmailRequiredValidation;

  passwordRequiredValidation = AppConstants.userSignupPasswordRequiredValidation;
  passwordMinLengthValidation = AppConstants.userSignupPasswordMinLengthValidation;
  passwordMaxLengthValidation = AppConstants.userSignupPasswordMaxLengthValidation;
  passwordPatternValidation = AppConstants.userSignupPasswordPatternValidation;

  phonenoRequiredValidation = AppConstants.userSignupPhoneNoRequiredValidation;
  phonenoMinLengthValidation = AppConstants.userSignupPhoneNoMinLengthValidation;
  phonenoMaxLengthValidation = AppConstants.userSignupPhoneNoMaxLengthValidation;
  phonenoPatternValidation = AppConstants.userSignupPhoneNoPatternValidation;

  confirmPasswordRequiredValidation = AppConstants.userSignupConfirmPasswordRequiredValidation;
  confirmPasswordMatchValidation = AppConstants.userSignupConfirmPassworValidation;

  constructor(private _loginService:LoginService,private router: Router) {
    this.userSignupForm = new FormGroup({
      user_fname : new FormControl('',{
        validators : [Validators.required,Validators.minLength(5),Validators.maxLength(8)]
      }),
      user_lname : new FormControl('',{
        validators : [Validators.required,Validators.minLength(5),Validators.maxLength(8)]
      }),
      user_phone : new FormControl('',{
        validators : [Validators.required,Validators.pattern(AppConstants.phonenoPattern),Validators.minLength(10),Validators.maxLength(12)]
      }),
      user_email : new FormControl('',{
        validators : [Validators.required,Validators.pattern(AppConstants.emailPattern)]
      }),
      user_password: new FormControl('',{
        validators : [Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(AppConstants.passwordPattern)]
      }),
      confirm_password: new FormControl('',{
        validators : [Validators.required,PasswordValidator('user_password')]
      }),
      termsAndConditions: new FormControl('',{
        validators :[Validators.required]
      })
    }
    );
  }

  ngOnInit() {

  }
  doSignup(){
    let signUpData = this.userSignupForm.value;
    let userSignupData = {
      user_fname:signUpData.user_fname,
      user_lname:signUpData.user_lname,
      user_phone:signUpData.user_phone, 
      user_password:signUpData.user_password,
      user_email:signUpData.user_email,
      user_role:AppConstants.userRoleId
    };
    this._loginService.doSignup(userSignupData).subscribe(
        data=> { 
          alert(AppConstants.userSignupSuccess); 
          this.router.navigateByUrl('/login');
        },
        error=>{ 
          alert(AppConstants.userSignupFailure); 
          console.log(error) 
        }
    );
  }
}
