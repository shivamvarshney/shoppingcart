import { Directive, HostListener, Input } from '@angular/core';
@Directive({
    selector:'[checkOut]'
})
export class CheckoutDirective{
    @Input() checkOut = () => {}; 

    @HostListener('click',['$event']) checkOutConfirm(){
        const confirmation = window.alert('Are you sure you want to checkout?');
        if(confirmation){
            this.checkOut();
            console.log('User has benn confirmed...');
        }
    }
}