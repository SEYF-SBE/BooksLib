import { AfterViewInit, Directive, ElementRef } from '@angular/core';

declare var $:any;

@Directive({
  selector: '[appDatepicker]'
})
export class DatepickerDirective {

  constructor(private el: ElementRef) { }

}
