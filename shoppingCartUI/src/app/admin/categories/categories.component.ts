import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginService } from '../../users/models/login.service';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers:[LoginService]
})
export class CategoriesComponent implements OnInit {

  categories:any;
  constructor(private _loginService:LoginService,private router: Router) { 

  }

  ngOnInit() {
    this.getAllCategories();
  }

  chengeType(actionType:boolean,categoryid:string){
    let productAaction = {category_id:categoryid,active_status:!actionType}
    this._loginService.adminChangeProductCategoryStatus(productAaction).subscribe(
      resp=>{
        let enable = 'Enabled';
        if(actionType){
          enable = 'Disabled';
        }
        alert('Product Category has been '+ enable + ' successfully.');
        this.getAllCategories();
      },
      err=>{
        alert('Something went wrong');
        this.getAllCategories();
      }
    )
  }
  softDelete(categoryid:string){
    let categoryAaction = {category_id:categoryid}
    this._loginService.adminDeleteProductCategory(categoryAaction).subscribe(
      resp=>{
        alert('Product Category has been deleted successfully.');
        this.getAllCategories();
      },
      err=>{
        alert('Something went wrong');
        this.getAllCategories();
      }
    )
  }
  getAllCategories(){
    let userEmail = appSettingFunctions.getLocalStorage('user_email');  
    let categoriesData = {limit:20,offset:1,user_email:userEmail};
    this._loginService.getallProductCategoriesWithProducts(categoriesData).subscribe(
      resp=>{
        this.categories = resp;              
      },
      err=>{
        alert('Something went wrong');
      }
    )    
  }
}
