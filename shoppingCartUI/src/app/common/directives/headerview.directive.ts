import { Directive, ElementRef, Renderer, HostListener, Host } from '@angular/core';
@Directive({
    selector:'[headerview]'
})
export class HeaderviewDirective{
    constructor(private _elemRef:ElementRef, private _renderer:Renderer){
        //_renderer.setElementStyle(_elemRef.nativeElement,'backgroundColor','orange');
    }
    @HostListener('mouseover') onMouseOver(){
        this.changeHoverColor('#fff','#32c5d2');
    }
    @HostListener('mouseleave') onmouseleave(){
        this.changeHoverColor('#007bff','transparent');
    }
    private changeHoverColor(textColor,backGroundColor){
        this._elemRef.nativeElement.style.color = textColor;
        this._elemRef.nativeElement.style.background = backGroundColor;
    }  
    
}