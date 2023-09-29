import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input()
  set color(color: string) {
    this._color = color;
    this.setStyle();
  }

  @Input()
  set errors(errors: ValidationErrors | null | undefined) {
    this._errors = errors;
    this.setErrorMessage();
  }

  private htmlElement?: ElementRef<HTMLElement>;

  constructor(private el: ElementRef<HTMLElement>) {
    console.log('Constructor de la directiva' + el);
    this.htmlElement = el;

    this.htmlElement.nativeElement.innerHTML = 'Hola mundo';
  }

  ngOnInit(): void {
    console.log('Directiva - NgOnInit');
  }

  setStyle(): void {
    if (!this.htmlElement) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage() {
    if (!this.htmlElement) return;

    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido.';
      return;
    }
    if (errors.includes('minlength')) {
      const min = this._errors['minlength']['requiredLength'];
      const current = this._errors['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${min} caracteres.`;
      return;
    }
    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = `No tiene formato de correo.`;
      return;
    }
    /**
     *
     * {
  "minlength": {
    "requiredLength": 6,
    "actualLength": 1
  },
  "email": true
}
    */
  }
}
