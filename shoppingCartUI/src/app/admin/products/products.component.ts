import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginService } from '../../users/models/login.service';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[LoginService]
})
export class ProductsComponent implements OnInit {

  products:any;
  productSoftStatus;
  constructor(private _loginService:LoginService,private router: Router) { 

  }

  ngOnInit() {
    this.getAllProducts();
  }

  softDelete(productid:string){
    let productAaction = {product_id:productid}
    this._loginService.adminDeleteProduct(productAaction).subscribe(
      resp=>{
        alert('Product has been deleted successfully.');
        this.getAllProducts();
      },
      err=>{
        alert('Something went wrong');
        this.getAllProducts();
      }
    )
  }
  chengeType(actionType:boolean,productid:string){
    let productAaction = {product_id:productid,active_status:!actionType}
    this._loginService.adminChangeProductStatus(productAaction).subscribe(
      resp=>{
        this.productSoftStatus = resp;
        alert(this.productSoftStatus.msg);
        this.getAllProducts();
      },
      err=>{
        alert('Something went wrong');
        this.getAllProducts();
      }
    )
  }
  getAllProducts(){
    let userEmail = appSettingFunctions.getLocalStorage('user_email');  
    let productsData = {limit:20,offset:1,user_email:userEmail};
    this._loginService.adminProducts(productsData).subscribe(
      resp=>{
        this.products = resp;     
      },error=>{
        console.log(error);
      }
    ) 
  }
}
