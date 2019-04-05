import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './common/home/home.component';
import { FrontinfoComponent } from './users/frontinfo/frontinfo.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SignupComponent } from './users/signup/signup.component';
import { ProfileComponent } from './users/profile/profile.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { UsercartComponent } from './users/usercart/usercart.component';
import { ProductsComponent } from './common/products/products.component';
import { PaidproductsComponent } from './users/paidproducts/paidproducts.component';
import { RouterModule} from '@angular/router';
import { LoginService } from './users/models/login.service'; 
import { HeaderviewDirective } from './common/directives/headerview.directive';
import { CheckoutDirective } from './common/directives/checkout.directive';
import { ConfirmaddtocartDirective } from './common/directives/addtocart.directive';
import { AddproducttocartComponent } from './users/addproducttocart/addproducttocart.component';
import { CommoncallsService } from './common/services/commoncalls.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appreducer } from './store/reducers/appreducers';
import { RatingComponent } from './users/rating/rating.component';
import { AuthoticityGuard } from './auth/authoticity.guard';
import {FileUploadModule} from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FrontinfoComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    UsercartComponent,
    ProductsComponent,
    PaidproductsComponent,
    HeaderviewDirective,
    CheckoutDirective,
    ConfirmaddtocartDirective,
    AddproducttocartComponent,
    RatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    EffectsModule,
    StoreModule.forRoot([appreducer]),
    ImageCropperModule,
    FileUploadModule

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
    LoginService,
    CommoncallsService,
    AuthoticityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
