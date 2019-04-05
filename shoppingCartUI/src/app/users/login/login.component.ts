import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginService } from '../../users/models/login.service';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  userLoginForm:FormGroup;
  loginSuccess:boolean = true;
  emailFormateValidation = AppConstants.userLoginEmailFormatValidation;
  emailRequiredValidation = AppConstants.userLoginEmailRequiredValidation;
  
  
  passwordRequiredValidation = AppConstants.userLoginPasswordRequiredValidation;
  passwordMinLengthValidation = AppConstants.userLoginPasswordMinLengthValidation;
  passwordMaxLengthValidation = AppConstants.userLoginPasswordMaxLengthValidation;
  passwordPatternValidation = AppConstants.userLoginPasswordPatternValidation;
  constructor(private _loginService:LoginService,private router: Router) { 
    this.userLoginForm = new FormGroup({
      user_email : new FormControl('',{
        validators : [Validators.required,Validators.pattern(AppConstants.emailPattern)]
      }),
      user_password: new FormControl('',{
        validators : [Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(AppConstants.passwordPattern)]
      })
    });
  }
  ngOnInit() {
   
  }
  loginSubmit() {
    let loginData = this.userLoginForm.value;
    let userLoginData = {user_password:loginData.user_password,user_email:loginData.user_email,user_role:AppConstants.userRoleId};

    this._loginService.doLogin(userLoginData).toPromise().then(
      data=> { 
        alert(AppConstants.userLoginSuccess); 
        appSettingFunctions.setLocalStorage('token',data['jwttoken']);
        appSettingFunctions.setLocalStorage('user_fname',data['user_fname']);  
        appSettingFunctions.setLocalStorage('user_id',data['id']);  
        appSettingFunctions.setLocalStorage('user_lname',data['user_lname']);  
        appSettingFunctions.setLocalStorage('user_email',data['user_email']);  
        appSettingFunctions.setLocalStorage('user_phone',data['user_phone']);  
        appSettingFunctions.setLocalStorage('user_role',data['user_role']);  
        let addedCartCpount = 0;
        let addedProducts = '';
        if(data['cart_history'] && data['cart_history'].length > 0){
          addedCartCpount = data['cart_history'].length;
          addedProducts = data['cart_history'];
        }
        this._loginService.noOfCartProductsSource.next(addedCartCpount);
        appSettingFunctions.setLocalStorage('no_of_products',addedCartCpount); 
        appSettingFunctions.setLocalStorage('addedCartProducts',addedProducts);                    
        this.router.navigateByUrl('/profile');
      },
      error=>{ 
         alert(AppConstants.userLoginFailure);           
      }
    )
    
    // this._loginService.doLogin(userLoginData).subscribe(
    //     data=> { 
    //       alert(AppConstants.userLoginSuccess);  
    //       appSettingFunctions.setLocalStorage('token',data['jwttoken']);
    //       appSettingFunctions.setLocalStorage('user_fname',data['user_fname']);  
    //       appSettingFunctions.setLocalStorage('user_id',data['id']);  
    //       appSettingFunctions.setLocalStorage('user_lname',data['user_lname']);  
    //       appSettingFunctions.setLocalStorage('user_email',data['user_email']);  
    //       appSettingFunctions.setLocalStorage('user_phone',data['user_phone']);  
    //       appSettingFunctions.setLocalStorage('user_role',data['user_role']);  
    //       this.cartNoOfProductCount = data['no_of_products'];
    //       appSettingFunctions.setLocalStorage('no_of_products',data['no_of_products']);                    
    //       this.router.navigateByUrl('/profile');
    //     },
    //     error=>{ 
    //       alert(AppConstants.userLoginFailure);           
    //     }
    // );
    //console.log(this.cartNoOfProductCount);
    //this._loginService.updatenoofproducts(this.cartNoOfProductCount);
  }
}
 