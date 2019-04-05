import { Directive,Input,ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({
  selector: '[appTitleino]'
})
export class TitleinoDirective {
  private el: HTMLElement;
  @Input('productDataDir') productDir:any;
  constructor(private _elemRef:ElementRef, private _renderer:Renderer) { 

  }
  @HostListener('mouseover') onMouseOver(){
      let titleString = '';
      if(this.productDir.productData.length > 0){
        for(let category of this.productDir.productData){
          titleString = titleString +category.name+ ', ';
        }
        titleString = titleString.replace(/(^[,\s]+)|([,\s]+$)/g, '');        
      }else{
        titleString = 'No Product is added in this category';
      }
      this._elemRef.nativeElement.title = titleString;
  }
  @HostListener('mouseleave') onmouseleave(){
      this._elemRef.nativeElement.title = '';
  }
}
 