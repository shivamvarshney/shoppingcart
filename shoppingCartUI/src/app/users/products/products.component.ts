import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginService } from '../../users/models/login.service';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers:[LoginService]
})
export class ProductsComponent implements OnInit {
  userProducts;
  constructor(private _loginService:LoginService,private router: Router) { 
    
  }
  ngOnInit() {
    this.getAllPaidProducts();
  }
  getAllPaidProducts(){
    let userEmail = appSettingFunctions.getLocalStorage('user_email');  
    let userPaidProductsData = {limit:20,offset:1,user_email:userEmail};
    this._loginService.userPaidProducts(userPaidProductsData).subscribe(
      resp=>{
        this.userProducts = resp;
        //debugger
        console.log(resp);        
      },error=>{
        console.log(error);
      }
    )
  }
}
 