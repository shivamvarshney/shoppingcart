import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../users/models/login.service';
@Component({
  selector: 'app-frontinfo',
  templateUrl: './frontinfo.component.html',
  styleUrls: ['./frontinfo.component.css'],
  providers:[LoginService]
})
export class FrontinfoComponent implements OnInit {

  
  constructor(private _loginService:LoginService) { 
    
  }

  ngOnInit() {
  }

}
