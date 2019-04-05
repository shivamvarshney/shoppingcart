import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginService } from '../../users/models/login.service';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store'
import { addToCart,removeFromCart } from '../../store/actions/cartsaction';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[LoginService]
})
export class ProductsComponent implements OnInit {
  products;
  cartCount:number = 0;
  cartProductsCount;
  showItemCounterPopup = false;
  passParentProductInfo;
  
  constructor(private _loginService:LoginService,private router: Router,public store: Store<any>) {
    // this._loginService.noOfCartProductsSource.subscribe(totalTicketCount => {
    //   this.cartCount = totalTicketCount;
    //   console.log('===================totalTicketCount===============');
    //   console.log(totalTicketCount);
    // });

    this._loginService.CartState 
        .subscribe(totalCartProductCount => {
          this.cartCount = totalCartProductCount;
          //console.log('===================totalTicketCountFromHeader===============');
          //console.log(this.cartCount);
        });    
  }
  ngOnInit() {
    this.getAllProducts();
    // this._loginService.announcedNoOfProducts$.subscribe(res => 
    //   {
    //     this.cartCount = res;
    //     console.log('this.cartCount from Product Component');
    //     console.log(this.cartCount);
    //     console.log('Product Component ====================== Product Component');
    //   }
    // );
  }
  getAllProducts(){
    let userEmail = appSettingFunctions.getLocalStorage('user_email');  
    let productsData = {limit:20,offset:1,user_email:userEmail};
    this._loginService.products(productsData).subscribe(
      resp=>{
        this.products = resp;     
      },error=>{
        console.log(error);
      }
    ) 
  }
  
 
  addToCart(dumpProductInfo){
    //let productInfo = {user_id:localStorage.getItem('user_id'),no_of_product:AppConstants.noOfProduct,product_id:productId};     
    //this._loginService.updatenoofproducts(this.cartCount + 1);
    //this.cartCount = this.cartCount + 1;
    //console.log('what the hell!',this.cartCount);    
    //this._loginService.noOfCartProductsSource.next(this.cartCount);    
    this.showItemCounterPopup = true; 
    this.passParentProductInfo =  dumpProductInfo;     
    this.store.dispatch(addToCart());
    // this._loginService.addToCart(productInfo).subscribe(
    //   resp=>{
    //     alert(AppConstants.addedCartSuccess);  
    //     this.cartCount = this.cartCount + 1; 
    //     //updatenoofproducts
    //     this._loginService.updatenoofproducts(this.cartCount);
    //     //this._loginService.noOfCartProductsSource.next(this.cartCount);
    //     this._loginService.addProduct(this.cartCount);
    //     this.getAllProducts();     
    //     if(appSettingFunctions.getLocalStorage('no_of_products')){
    //       this.cartProductsCount = appSettingFunctions.getLocalStorage('no_of_products');        
    //     }
    //     appSettingFunctions.setLocalStorage('no_of_products',+this.cartProductsCount + 1);   
    //     this.showItemCounterPopup = true; 
    //     this.passProductInfo =  dumpProductInfo;               
    //   },err=>{
    //     alert(AppConstants.addedCartFailure);
    //   }
    // )
  }
}
