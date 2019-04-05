import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../users/models/login.service';
import { Router } from '@angular/router';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
@Component({
  selector: 'app-addproducttocart',
  templateUrl: './addproducttocart.component.html',
  styleUrls: ['./addproducttocart.component.css'],
  providers:[LoginService]
})
export class AddproducttocartComponent implements OnInit {

  @Input() passChildProductInfo :any;
  
  constructor(private _loginService:LoginService,private router: Router) {

   }

  cartProductsCount;
  noOfItem:number = 1;
  toBeAddProductId :any;
  ngOnInit() {
    
  }

  nevigateToProducts(){
    this.router.navigateByUrl('/karthistory');
  }

  onAddToCart(flowWithProduct: NgForm){
    let createdProductId = this.passChildProductInfo._id;
    let createdNoOfProducts = flowWithProduct.value.noOfItem;
    this.commonAddToCart(createdNoOfProducts,createdProductId);
  }

  checkout(flowWithProduct: NgForm){
    let createdProductId = this.passChildProductInfo._id;
    let createdNoOfProducts = flowWithProduct.value.noOfItem;
    this.commonCheckOut(createdNoOfProducts,createdProductId);
  }
 
  commonCheckOut(noOfProducts,passedProductId){
    let productInfo = {user_id:localStorage.getItem('user_id'),no_of_product:noOfProducts,product_id:passedProductId};
    this._loginService.addToCart(productInfo).toPromise().then(
      data=>{
        let createdCartId = data['_id'];
        let cartProductData = {kart_id:createdCartId};
        this._loginService.doPayment(cartProductData).subscribe(
          resp=>{
            alert(AppConstants.paymentSuccess);     
            this.router.navigateByUrl('/paid');   
          },
          err=>{
            alert(AppConstants.paymentFailure);
          }
        )
      }
    );     
  }
  commonAddToCart(noOfProducts,passedProductId){
    let productInfo = {user_id:localStorage.getItem('user_id'),no_of_product:noOfProducts,product_id:passedProductId};
    this._loginService.addToCart(productInfo).subscribe(resp=>{
      alert(AppConstants.addedCartSuccess);  
      if(appSettingFunctions.getLocalStorage('no_of_products')){
        this.cartProductsCount = appSettingFunctions.getLocalStorage('no_of_products');        
      }
      appSettingFunctions.setLocalStorage('no_of_products',+this.cartProductsCount + +noOfProducts);
      this.router.navigateByUrl('/karthistory');
    });     
  }
}
