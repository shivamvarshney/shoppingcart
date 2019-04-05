import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { AppSettings } from '../../../apiconfing';
import { BehaviorSubject,Subject } from 'rxjs';
import { appSettingFunctions } from '../../config/appStaticFunctions';

@Injectable()
export class LoginService {

  private cartSubject = new Subject<number>();
  CartState = this.cartSubject.asObservable();
  noOfCartProductsSource:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  //private noOfCartProductsSource = new BehaviorSubject<number>(50);
  //announcedNoOfProducts$ = this.noOfCartProductsSource.asObservable();

 
  //private loggedIn = new Subject<boolean>();
  //cast = this.loggedIn.asObservable();
  constructor(private _httpClient:HttpClient) {

  }
  
  addProduct(productsCount:number) {
    console.log('in service');
    this.cartSubject.next(<number>productsCount);
  }
  updatenoofproducts(productsCount:number){
    //console.log('productsCount is '+productsCount);
    this.noOfCartProductsSource.next(productsCount);
    //console.log('after productsCount is '+productsCount);
  }


  getLoginInfo(loginView){
    //this.loggedIn.next(loginView);
  }
  
  doLogin(loginData){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/login',loginData);
  }
  doSignup(signupData){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/signup',signupData);
  }

  userPaidProducts(paidProductParam){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/getUserPaidProducts',paidProductParam);
  }
 
  products(productParam){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/getProducts',productParam);
  }

  cartproducts(cartproductParam){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/getCartProducts',cartproductParam);
  }

  producthistory(cartproductParam){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/getProductHistory',cartproductParam);
  }

  doPayment(cartProductsParam){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/productPayment',cartProductsParam);
  }

  addToCart(productInfo){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/addProductToHistory',productInfo);
  }

  doBulkPayment(userInfo){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/bulkPayment',userInfo);
  }

  doProductFeedback(feedbackInfo){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/feedback',feedbackInfo);
  }

  getallProductCategories(categoryData){
    return this._httpClient.get(AppSettings.API_ENDPOINT+'/categories',categoryData);
  }

  addProductAdmin(objectData){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/addproduct',objectData);
  }

  adminProducts(adminInfo){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/getAdminProducts',adminInfo);
  }

  adminChangeProductStatus(adminProductInfo){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/productActivation',adminProductInfo);
  }

  adminDeleteProduct(adminProductInfo){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/productDeletion',adminProductInfo);
  }

  getallProductCategoriesWithProducts(categoryData){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/categorieswithproducts',categoryData);
  }

  adminDeleteProductCategory(adminProductCategoryInfo){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/productCategoryDeletion',adminProductCategoryInfo);
  }

  adminChangeProductCategoryStatus(adminProductCategoryInfo){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/productCategoryActivation',adminProductCategoryInfo);
  }

  adminAddCategory(categoryInfo){
    return this._httpClient.post(AppSettings.API_ENDPOINT+'/addcategory',categoryInfo)
  }
}