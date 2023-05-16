import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput, SignupInputGqlType } from './auth.types';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Boolean)
  async signup(
    @Args({ name: 'signUpInput', type: () => SignupInputGqlType })
    signupInput: SignupInput,
  ): Promise<boolean> {
    return this.authService.signup(signupInput);
  }
}
