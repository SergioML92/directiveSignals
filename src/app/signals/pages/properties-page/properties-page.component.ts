import { User } from './../../interfaces/user-request.interface';
import { Component, signal, computed, effect, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnInit, OnDestroy {

  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  });

  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);

  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update(current => current + 1);
    }, 1000);
  }

  ngOnDestroy(): void {
    this.userChangedEffect.destroy();
  }

  increaseBy(value: number) {
    this.counter.update(current => current + value);
  }

  onFieldUpdate(field: string, value: string): void {
    console.log({ field, value });

    this.user.mutate(current => {
      switch (field) {
        case 'email':
          current.email = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;

        case 'id':
          current.id = Number(value);
          break;
      }
    });

    /*
    this.user.update( current => {
      return {
        ...current,
        [field]: value
      };
    });
    */
    /*
        this.user.set({
          ...this.user(),
          [field]: value
        });
    */
  }
}
