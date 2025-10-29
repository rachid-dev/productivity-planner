import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';
import { firstValueFrom } from 'rxjs';
import { InvalidCredentialError } from './invalid-credential.error';

@Injectable({
  providedIn: 'root',
})
export class LoginUserUseCase {
  readonly #authenticationService = inject(AuthenticationService);
  readonly #userService = inject(UserService);
  readonly #userStore = inject(UserStore);
  readonly #router = inject(Router);

  async execute(email: string, password: string): Promise<void> {
    // 1. Authenticate user
    const authResponse = await firstValueFrom(
      this.#authenticationService.login(email, password),
    );

    // 2. Throw an error if credentials are invalid
    if (authResponse instanceof InvalidCredentialError) {
      throw authResponse;
    }

    // 3. Store user authentication data in webapp storage
    const { jwtToken, jwtRefreshToken, expiresIn, userId } = authResponse;

    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('jwtRefreshToken', jwtRefreshToken);
    localStorage.setItem('expiresIn', expiresIn);

    // 4. Get user data from backend server
    const user = await firstValueFrom(
      this.#userService.fetch(userId, jwtToken),
    );

    // 5. Store response in our global store
    this.#userStore.load(user);

    // 6. redirect user to Dashboard page
    this.#router.navigate(['/app/dashboard']);
  }
}
