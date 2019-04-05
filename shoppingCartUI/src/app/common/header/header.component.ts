import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../users/models/login.service';
import { CommoncallsService } from '../../common/services/commoncalls.service';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[LoginService]
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean;   
  userName;
  noOfProducts : Observable<number>;
  cartCountHeader:number; 
  cartProductsCount;
  userRole:any;
  constructor(private _loginServi :LoginService,private router: Router,private _commonaService:CommoncallsService) {
    //console.log('first  call');
    this._loginServi.CartState.subscribe(totalCartProductCount => {
      this.cartCountHeader = totalCartProductCount;
      //console.log('===================totalTicketCountFromHeader==============='+this.cartCountHeader);
      //console.log(this.cartCountHeader);
      //console.log('===================totalTicketCountFromHeader==============='+this.cartCountHeader);
    });
    //console.log('last  call');
  }
  updateCartInfo(){
    // this._loginServi.noOfCartProductsSource.subscribe(totalCartProductCount => {
    //   this.cartCountHeader = totalCartProductCount;
    //   console.log('===================totalTicketCountFromHeader===============');
    //   console.log(totalCartProductCount);
    // });
    
    if(appSettingFunctions.getLocalStorage('no_of_products')){
      this.cartProductsCount = appSettingFunctions.getLocalStorage('no_of_products');        
    }
    //console.log('this.cartProductsCount is ============'+this.cartProductsCount);
    return true;
  }
  ngOnInit() {
    // this._loginServi.announcedNoOfProducts$.subscribe(res => 
    //   {
    //     this.cartCountHeader = res;
    //     console.log('this.cartCount from header)');
    //     console.log(this.cartCountHeader);
    //     console.log('Header ====================== Header');
    //   }
    // );
  }
  logout(){
    appSettingFunctions.clearLocalStorage();
    let loginFailure:boolean = false;
    this._loginServi.getLoginInfo(loginFailure);    
    this.router.navigateByUrl('/login');
  } 
  checkIsUserLoggedIn(){    
    if(appSettingFunctions.getLocalStorage('token')){
      this.userName = appSettingFunctions.getLocalStorage('user_fname')+' '+localStorage.getItem('user_lname');  
      return true;
    }
    return false;
  }
  getUserRole(){
    if(localStorage.getItem('user_role')){

    }
    return this.userRole = '';
  }
  checkOut(){
    let userInfo = {user_id:localStorage.getItem('user_id')};
    this._commonaService.doCommonBulkPayment(userInfo);
  }
  docheckout(){
    //console.log('Checked-out');
  }
}
