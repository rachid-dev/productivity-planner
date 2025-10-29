import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Visitor } from '../../core/entity/user.interface';
import { RegisterUserUseCase } from './domain/register-user.use-case';
import { EmailAlreadyTakenError } from './domain/email-already-taken.error';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.page.component.html',
  styleUrl: './signup.page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  readonly #registerUserUseCase = inject(RegisterUserUseCase);
  readonly isLoading = signal(false);
  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');
  readonly isPasswordMatch = computed(
    () => this.password() === this.confirmPassword(),
  );
  readonly emailAlreadyTakenError = signal<EmailAlreadyTakenError | null>(null);
  readonly isEmailAlreadyTaken = computed(
    () => this.emailAlreadyTakenError()?.email === this.email(),
  );

  onSubmit() {
    const visitor: Visitor = {
      name: this.name(),
      email: this.email(),
      password: this.password(),
    };
    this.#registerUserUseCase.execute(visitor).catch((error) => {
      this.isLoading.set(false);
      const isEmailAlreadyTaken = error instanceof EmailAlreadyTakenError;

      if (isEmailAlreadyTaken) {
        this.emailAlreadyTakenError.set(error);
      }
    });
  }
}
