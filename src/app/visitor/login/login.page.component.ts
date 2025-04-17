import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginUserUseCase } from './domain/login-user.use-case';
import { InvalidCredentialError } from './domain/invalid-credential.error';

@Component({
  imports: [FormsModule],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss'
})
export class LoginPageComponent {

  readonly #loginUserUseCase = inject(LoginUserUseCase)
  readonly email = signal('');
  readonly password = signal('');
  readonly invalidCredentialErrorMessage = signal('');
  readonly invalidCredentialError = computed(()=>{
    return !(this.invalidCredentialErrorMessage() === '')
  });

  onSubmit() {
    this.#loginUserUseCase.execute(this.email(), this.password())
    .catch((invalidCredentialError) => (
      this.invalidCredentialErrorMessage.set(invalidCredentialError.message)
    ))
    }

}
