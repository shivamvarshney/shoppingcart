import { Injectable } from '@angular/core';
import { LoginService } from '../../users/models/login.service';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import { Router } from '@angular/router';
@Injectable()
export class CommoncallsService {

  constructor(private _loginService:LoginService,private router: Router) {

  }

  doCommonBulkPayment(userData:any){
    this._loginService.doBulkPayment(userData).subscribe(
      data=>{
        appSettingFunctions.setLocalStorage('no_of_products',0);
        if(data['totalBulkPayment'] < 1){
          alert('No product found in the Cart');
        }else{
          alert(data['message']);
        }
        this.router.navigateByUrl('/paid');
      }
      ,error=>{
          alert(AppConstants.addedCartFailure);
      }
    );    
  }
}
