import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { CommoncallsService } from '../../common/services/commoncalls.service';
import { LoginService } from '../../users/models/login.service';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css'],
  providers:[LoginService]
})
export class UsercartComponent implements OnInit {
  userCartProducts;
  totalCArtCount:boolean = true;
  constructor(private _loginService:LoginService,private router: Router,private _commonaService:CommoncallsService) { 
     
  }

  ngOnInit() {
    this.getAllCartProducts();
  } 

  getAllCartProducts(){
    let userEmail = appSettingFunctions.getLocalStorage('user_email');  
    let userCartProductsData = {limit:20,offset:1,user_email:userEmail};
    this._loginService.cartproducts(userCartProductsData).subscribe(
      resp=>{
        this.userCartProducts = resp;
        if(Object.keys(resp).length > 0){
          this.totalCArtCount = false;
        }            
      },error=>{
        console.log(error);
      }
    )
  }
  payNow(kartId:string){
    let cartProductData = {kart_id:kartId};
    this._loginService.doPayment(cartProductData).subscribe(
      resp=>{
        alert(AppConstants.paymentSuccess);
        if(appSettingFunctions.getLocalStorage('no_of_products')){
          let globalDataCount = +appSettingFunctions.getLocalStorage('no_of_products');
          appSettingFunctions.setLocalStorage('no_of_products', globalDataCount-1);      
        } 
        this.getAllCartProducts();
      },
      err=>{
        alert(AppConstants.paymentFailure);
      }
    )
  }
  payInBulkNow(){
    let userInfo = {user_id:localStorage.getItem('user_id')};
    this._commonaService.doCommonBulkPayment(userInfo);
  }
}
