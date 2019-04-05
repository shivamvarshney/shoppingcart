import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
  apiUrl = 'localhost:3000/login';
  constructor(private _httpClient:HttpClient) {

  }
  getUserLogin(postData){
    //debugger
    return this._httpClient.post(this.apiUrl,postData);
  }

}
