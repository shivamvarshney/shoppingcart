import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../users/models/login.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AppConstants } from '../../config/appConstants';
import { appSettingFunctions } from '../../config/appStaticFunctions';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers:[LoginService]
})
export class RatingComponent implements OnInit {

  routeParamsProductId:any;
  constructor(private _loginService:LoginService,private router: Router,private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsProductId = this.activeRoute.snapshot.params.productid;
    
  }

  addRating(rating: NgForm){
    let ratingno = rating.value.radiorating;
    let feedbackcomment = rating.value.feedback;
    let productid = rating.value.id;    
    let feedbackInfo = {user_id:localStorage.getItem('user_id'),product_cart_id:this.routeParamsProductId,feedback_comment:feedbackcomment,rating_no:ratingno};
    this._loginService.doProductFeedback(feedbackInfo).toPromise().then(
      data=>{
        alert(AppConstants.userFeedbackSuccess);
        this.router.navigateByUrl('/paid');
      },
      error=>{
        alert(AppConstants.userFeedbackSuccess);
        this.router.navigateByUrl('/paid');
      }
    );       
  }
} 
