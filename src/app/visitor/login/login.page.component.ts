import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginUserUseCase } from './domain/login-user.use-case';

@Component({
  imports: [FormsModule],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss'
})
export class LoginPageComponent {

  readonly #loginUserUseCase = inject(LoginUserUseCase)
  readonly email = signal('');
  readonly password = signal('');

  onSubmit() {
    this.#loginUserUseCase.execute(this.email(), this.password())
    }

}
