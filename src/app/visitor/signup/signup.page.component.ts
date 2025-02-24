import { Component, computed, inject, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.page.component.html',
  styleUrl: './signup.page.component.scss'
})
export class SignupPageComponent {
  readonly authenticationService = inject(AuthenticationService);
  readonly name = signal("");
  readonly email = signal("");
  readonly password = signal("");
  readonly confirmPassword = signal("");
  readonly isPasswordMatchValid = computed(()=>(this.password() === this.confirmPassword()))
  readonly router = inject(Router);
  

  onSubmit(){
    this.authenticationService.register(this.email(), this.password()).subscribe(response => (
      console.log(response)
    ))
    // this.router.navigate(['dashboard']);
  }
}
