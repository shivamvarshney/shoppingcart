import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddcategoryComponent } from './addcategory/addcategory.component'
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'addproduct',
    component:AddproductComponent
  },
  {
    path:'addcategory',
    component:AddcategoryComponent
  },
  {
    path:'categories',
    component:CategoriesComponent
  },
  {
    path:'users',
    component:UsersComponent
  },
  {
    path:'products',
    component:ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
