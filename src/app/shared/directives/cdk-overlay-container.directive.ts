import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';

import { CdkOverlayContainer } from '../../core/services/cdkOverlay/cdk-overlay-container';

@Directive({
  selector: '[appCdkOverlayContainer]'
})
export class CdkOverlayContainerDirective implements AfterViewInit {

  constructor(private renderer: Renderer2,
              private elementReference: ElementRef,
              private cdkOverlayContainer: CdkOverlayContainer) {

    console.log(this.elementReference.nativeElement);
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.elementReference.nativeElement, 'cdk-overlay-container');
    this.cdkOverlayContainer.setContainerElement(this.elementReference.nativeElement);
  }
}
