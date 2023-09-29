import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  // Injección de dependencia de forma nueva
  //  constructor( private fb: FormBuilder) {}
  private fb = inject(FormBuilder);

  public color: string = 'green';

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6), Validators.email]]
  });

  changeColor(): void {
    this.color = '#XXXXXX'.replace(/X/g, y => (Math.random() * 16 | 0).toString(16));
  }
}
