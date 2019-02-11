import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CdkOverlayContainerDirective } from './directives/cdk-overlay-container.directive';
import { BannerComponent } from './components/banner/banner.component';
import { CdkOverlayContainer } from '../core/services/cdkOverlay/cdk-overlay-container';


@NgModule({
  declarations: [
    BannerComponent,
    CdkOverlayContainerDirective,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BannerComponent]
})
export class SharedModule { }
