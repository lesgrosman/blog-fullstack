import { Query, Resolver } from '@nestjs/graphql';
import { UserGqlType } from './user.types';
import { UserService } from './user.service';

@Resolver(() => UserGqlType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserGqlType])
  async users() {
    return await this.userService.getAllUsers();
  }
}
