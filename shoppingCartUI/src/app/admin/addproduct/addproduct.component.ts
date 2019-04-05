import { Component, OnInit,ViewChild } from '@angular/core';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import { NumericvalueValidator } from '../../config/numericpatterncheck';
import { LoginService } from '../../users/models/login.service'; 
import {Router} from '@angular/router';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  providers:[LoginService]
}) 
export class AddproductComponent implements OnInit {
  productImages:any;
  masterProductCategories:any;
  addProductForm:FormGroup;
  url:any;
  imageErrorMessage:any;
  image_displayError:boolean = false;
  @ViewChild('fileInput') fileInput;
  imageViewAfterUpload:boolean=false;
  supportedFormates = ['png','jpg','jpeg'];
  constructor(private _loginService:LoginService,private router: Router) {    
    this.addProductForm = new FormGroup({
      p_name : new FormControl('',{
        validators : [Validators.required,Validators.minLength(5),Validators.maxLength(50)]
      }),
      p_description : new FormControl('',{
        validators : [Validators.required,Validators.minLength(15),Validators.maxLength(100)]
      }),
      p_amount : new FormControl('',{
        validators : [Validators.required,NumericvalueValidator.numberValidator]
      }),
      p_category:new FormControl('',{
        validators:[Validators.required]
      }),
      fileUpload:new FormControl(''),
      user_id:new FormControl(localStorage.getItem('user_id'))
    });        
  }
  loadImageFailed() {
    // show message
    setTimeout(()=>{   
        this.image_displayError = false;
        this.imageErrorMessage = '';
    },3000);
    this.image_displayError = true;
    this.imageViewAfterUpload = false;
    this.imageErrorMessage = 'Selected file format is not supported';
    this.fileInput.nativeElement.value=null;
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      if (!this.validateImageExtension(event.target.files[0].name)) {
          this.loadImageFailed();
          this.productImages = '';
          return false;
      }
      this.productImages=event.target.files[0];
      this.imageViewAfterUpload = true;
      var reader = new FileReader();
      let file = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event) => { 
        let target: any = event.target;         
        this.url = target.result;        
      }
      //this.addProductForm.get('fileUpload').setValue(file);
    }
  }
  validateImageExtension(name:string){
    let extenstion = name.substring(name.lastIndexOf('.') + 1);
    let convertedExtension = extenstion.toLowerCase();
    if(this.supportedFormates.indexOf(convertedExtension) == 1){
      return true;
    }
    return false;
  }
  prepareToSave():any{
    let input = new FormData();
    console.log(this.productImages);
    input.append("fileUpload",this.productImages);
    input.append('p_name', this.addProductForm.get('p_name').value);
    input.append('p_description', this.addProductForm.get('p_description').value);
    input.append('p_amount', this.addProductForm.get('p_amount').value);
    input.append('p_category', this.addProductForm.get('p_category').value);
    input.append('user_id', this.addProductForm.get('user_id').value);
    //input.append('fileUploadss', this.addProductForm.get('fileUpload').value);
    return input;
  }
  adproductSubmit(){  
    const formModel = this.prepareToSave();
    this._loginService.addProductAdmin(formModel).subscribe(
      data=>{
        alert('Product Added Successfully');
        this.router.navigateByUrl('/products');
      },err=>{
        alert('Something went wrong');
      }
    );
  } 

  ngOnInit() { 
    this.getAllProductCategories();
  }

  getAllProductCategories(){ 
    let userEmail = appSettingFunctions.getLocalStorage('user_email');  
    let categoriesData = {limit:20,offset:1,user_email:userEmail};
    this._loginService.getallProductCategories(categoriesData).subscribe(
      resp=>{
        this.masterProductCategories = resp;        
      },
      err=>{
        alert('Something went wrong');
      }
    )
  }
}
