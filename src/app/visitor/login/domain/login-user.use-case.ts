import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';
import { firstValueFrom } from 'rxjs';
import { InvalidCredentialError } from './invalid-credential.error';

@Injectable({
  providedIn: 'root'
})
export class LoginUserUseCase {

  readonly #authenticationService = inject(AuthenticationService);
  readonly #userService = inject(UserService);
  readonly #userStore = inject(UserStore);
  readonly #router = inject(Router);

  async execute(email: string, password: string): Promise<void>{

    // 1. Authenticate user
    const authResponse = await firstValueFrom(this.#authenticationService.login(email, password));

    if(authResponse instanceof InvalidCredentialError){
      throw authResponse;
    }
    const {jwtToken : bearerToken, jwtRefreshToken, userId} = authResponse;

    // 2. Store user authentication data in local storage
    localStorage.setItem("jwtRefreshToken", jwtRefreshToken);

    // 3. Get user data from backend server
    const user = await firstValueFrom(this.#userService.get(userId, bearerToken));

    // 4. Store response in our global store
    this.#userStore.register(user);

    // 5. redirect user to Dashboard page
    this.#router.navigate(['/app/dashboard']);

  }
}
