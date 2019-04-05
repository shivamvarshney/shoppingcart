import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { FrontinfoComponent } from './users/frontinfo/frontinfo.component';
import { HomeComponent } from './common/home/home.component';
import { SignupComponent } from './users/signup/signup.component';
import { ProfileComponent } from './users/profile/profile.component';
import { PaidproductsComponent } from './users/paidproducts/paidproducts.component';
import { ProductsComponent } from './common/products/products.component';
import { UsercartComponent } from './users/usercart/usercart.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { RatingComponent } from './users/rating/rating.component';
import { AuthoticityGuard } from './auth/authoticity.guard';
export const Routing = RouterModule.forRoot([
    
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'history',
        component: DashboardComponent,
        canActivate: [AuthoticityGuard]
    },
    {
        path: 'karthistory',
        component: UsercartComponent,
        canActivate: [AuthoticityGuard]
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthoticityGuard]
    },
    {
        path: 'paid',
        component: PaidproductsComponent,
        canActivate: [AuthoticityGuard]
    },
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthoticityGuard]
    },
    {
        path: 'rating/:productid',
        component: RatingComponent,
        canActivate: [AuthoticityGuard]
    },
    {
        path:'admin',
        loadChildren:'./admin/admin.module#AdminModule',
        //canActivate: [AuthoticityGuard]
    },
    {
        path: '',  
        component: HomeComponent,
        pathMatch:'full'
    },
    {
        path: '**',
        component: HomeComponent
      }
    // {
    //     path: 'f',
    //     component: FrontinfoComponent,
    //     children : [
    //         {
    //             path: '',
    //             component: HomeComponent
    //         },
    //         {
    //             path: 'login',
    //             component: LoginComponent
    //         }
    //     ]
    // }
]);

