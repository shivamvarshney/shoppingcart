import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { TitleinoDirective } from '../common/directives/titleino.directive';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TitleinoDirective,LoginComponent, SignupComponent, HomeComponent, AddproductComponent, AddcategoryComponent, CategoriesComponent, ProductsComponent, UsersComponent]
})
export class AdminModule { }
