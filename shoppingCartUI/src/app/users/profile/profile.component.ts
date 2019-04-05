import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo:any;
  constructor(private router: Router) {

  }
  ngOnInit() {
    this.userInfo = {
      'user_fname':appSettingFunctions.getLocalStorage('user_fname'),
      'user_lname':appSettingFunctions.getLocalStorage('user_lname'),
      'user_email':appSettingFunctions.getLocalStorage('user_email'),
      'user_phone':appSettingFunctions.getLocalStorage('user_phone'),
      'user_role':appSettingFunctions.getLocalStorage('user_role')
    };    
  }
}
