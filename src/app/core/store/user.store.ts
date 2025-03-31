import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { User, Visitor } from '../entity/user.interface';
import { RegisterUserUseCaseService } from '../use-case/register-user.use-case.service';


interface UserStoreState {
  user : User | undefined
};



export const UserStore = signalStore(
  {providedIn : 'root'},
  withState<UserStoreState>({user : undefined}),
  withComputed((store) => {
    const isGoogleUser = computed(() => store.user()?.email.endsWith('@google.com'));
    return {isGoogleUser};
  }),
  withMethods(
    (store, registerUserUseCase = inject(RegisterUserUseCaseService)) => {
      const register = (visitor : Visitor):void => {
        registerUserUseCase.execute(visitor).then((user) => {patchState(store, {user})})
      }
      return {register}
    }
  )
);