import { Component, computed, inject, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { UserStore } from '../../core/store/user.store';
import { Visitor } from '../../core/entity/user.interface';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.page.component.html',
  styleUrl: './signup.page.component.scss'
})
export class SignupPageComponent {
  readonly store = inject(UserStore);
  readonly name = signal("");
  readonly email = signal("");
  readonly password = signal("");
  readonly confirmPassword = signal("");
  readonly isPasswordMatch = computed(()=>(this.password() === this.confirmPassword()))
  readonly router = inject(Router);
  

  onSubmit(){
    const visitor : Visitor = {
      name : this.name(),
      email : this.email(),
      password : this.password()
    }
    this.store.register(visitor);
    
  }
}
