import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginService } from '../../users/models/login.service';
import { CommoncallsService } from '../../common/services/commoncalls.service';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[LoginService]
})
export class DashboardComponent implements OnInit {

  productHistory;
  constructor(private _loginService:LoginService,private router: Router,private _commonaService:CommoncallsService) { 

  }

  ngOnInit() {
    this.getAllProductHistory();
  } 

  getAllProductHistory(){
    let userEmail = appSettingFunctions.getLocalStorage('user_email');  
    let userProductsHistory = {limit:20,offset:1,user_email:userEmail};
    this._loginService.producthistory(userProductsHistory).subscribe(
      resp=>{
        this.productHistory = resp;
        //debugger        
      },error=>{
        console.log(error);
      }
    )
  }
  payInBulkNow(){
    let userInfo = {user_id:localStorage.getItem('user_id')};
    this._commonaService.doCommonBulkPayment(userInfo);
  }
}
