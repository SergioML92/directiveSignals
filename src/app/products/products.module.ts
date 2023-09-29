import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductsRoutingModule } from './products-routing.module';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ProductsRoutingModule,
    SharedModule,
  ]
})
export class ProductsModule { }
