import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BannerComponent]
})
export class SharedModule { }
