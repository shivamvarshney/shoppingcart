import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { appSettingFunctions } from '../config/appStaticFunctions';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        return next.handle(req);
        // const modifiedReq = req.clone({
        //     headers: this.addTokenHeader(req.headers)
        // });
        // const newRequest = req.clone({ headers: req.headers.set('somekey', '11234') });        
        //  console.log('Intercepted HTTP call', newRequest);
        // if(true){            
        //     if (!req.headers.has('Authorization')) {
        //         req = req.clone({ 
        //             setHeaders: {
        //                 'Authorization': 'Bareer '+appSettingFunctions.getLocalStorage('token'),
        //                 'Content-Type': 'application/json'
        //             }       
        //         });
        //     }
        //     console.log(req);
        // }else{
        //     req = req.clone({ 
        //         headers: new HttpHeaders({
        //             'Content-Type': 'application/json'
        //          })
        //     });
        // }
        // console.log(req);
        // return next.handle(req);
        // .do(
        // (event:any)=>{
        //      if(event instanceof HttpResponse){
        //          event = event.clone({body:this.updateRsponseBody(event.body)});
        //      }
        //      return event;
        // },
        // (error:any)=>{
        //     if(error instanceof HttpErrorResponse){
        //         if(error.status == 500){
        //             console.log('Error here');
        //         }
        //     }
        // });
    } 
    private updateRsponseBody(body:any){
        return body;
    }
    // private addTokenHeader(headers: HttpHeaders): HttpHeaders {
    //     if(headers.has('Authorization')){
    //         alert('Shivam22');
    //     }
    //     let headersreq = new HttpHeaders();
    //     headersreq = headersreq.append('Content-Type', 'application/json');
    //     let loginHeaders = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             'noToken': 'noToken'
    //         })
    //     }
    //     headers.append('Content-Typewwww', 'application/json');
    //     console.log(headers);        
    //     if(appSettingFunctions.getLocalStorage('token')){
    //          headers = headers.append('Authorization', 'Bareer '+appSettingFunctions.getLocalStorage('token'));
    //     }else{
    //          headers = headers.append('Content-Type', 'application/json');
    //     }
    //     console.log(loginHeaders);
    //     return headersreq;
    // } 
}