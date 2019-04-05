import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { appSettingFunctions } from '../config/appStaticFunctions';
import { Router } from '@angular/router';

@Injectable()
export class AuthoticityGuard implements CanActivate {
  constructor(private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(appSettingFunctions.getLocalStorage('token')){
        return true;
      }else{
        this.router.navigateByUrl('/login');
        return false;
      }
      
  }
} 
