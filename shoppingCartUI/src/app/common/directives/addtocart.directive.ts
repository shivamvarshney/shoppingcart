import { Output, HostListener, EventEmitter, Directive,ElementRef } from '@angular/core';
import { $ } from 'protractor';
@Directive({
    selector:'[confirm]'
})
export class ConfirmaddtocartDirective {
    @Output('confirm-click') click: any = new EventEmitter();

    @HostListener('click', ['$event']) clicked(e) {
        // $.confirm({
        //     buttons: {
        //         confirm: () => this.click.emit(),
        //         cancel: () => {}
        //     }
        // });
    }

}