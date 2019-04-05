import { Component, OnInit,ViewChild } from '@angular/core';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import { LoginService } from '../../users/models/login.service'; 
import {Router} from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css'],
  providers:[LoginService]
}) 
export class AddcategoryComponent implements OnInit {
  addProductCategoryForm:FormGroup;
  constructor(private _loginService:LoginService,private router: Router) { 
    this.addProductCategoryForm = new FormGroup({
      pc_name : new FormControl('',{
        validators : [Validators.required,Validators.minLength(5),Validators.maxLength(50)]
      }),
      user_id:new FormControl(localStorage.getItem('user_id'))
    }); 
  }
  adproductCategorySubmit(){  
    let productCAtegoryData = this.addProductCategoryForm.value;
    let addProductCAtegoryData = {
      name:productCAtegoryData.pc_name,
      created_by:productCAtegoryData.user_id
    };
    this._loginService.adminAddCategory(addProductCAtegoryData).subscribe(
        data=> { 
          alert('Product Category has been added successfully'); 
          this.router.navigateByUrl('/admin/categories');
        },
        error=>{ 
          alert(AppConstants.userSignupFailure); 
          console.log(error) 
        }
    );
  }

  ngOnInit() {

  }

}
