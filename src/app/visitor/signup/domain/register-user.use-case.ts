import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User, Visitor } from '@app/core/entity/user.interface';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';
import { EmailAlreadyTakenError } from './email-already-taken.error';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserUseCase {
  readonly #authenticationService = inject(AuthenticationService);
  readonly #userService = inject(UserService);
  readonly #userStore = inject(UserStore);
  readonly #router = inject(Router);

  async execute(visitor: Visitor): Promise<void>{

    // 1. Authenticate new visitor
    const name = visitor.name;
    const email = visitor.email;
    const password = visitor.password;
    const registerResponse = await firstValueFrom(this.#authenticationService.register(email, password));

    if(registerResponse instanceof EmailAlreadyTakenError){
      throw registerResponse;
    }
    
    // 2. Add credentials information in session storage
    const {userId : id, jwtToken} = registerResponse;

    localStorage.setItem("jwtToken", jwtToken);

    // 3. Create new user in database
    const user:User = {id, name, email};
    await firstValueFrom(this.#userService.create(user, jwtToken));

    // 4. Add user in app store
    this.#userStore.load(user);

    // 5. Redirect user to dashboard
    this.#router.navigate(['/app/dashboard']);
  }
}
