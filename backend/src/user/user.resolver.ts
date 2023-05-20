import { Query, Resolver } from '@nestjs/graphql';
import { User, UserGqlType } from './user.types';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { GetUser } from 'src/shared/decorators';
import { JwtDto } from 'src/auth/jwt.dto';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserGqlType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserGqlType)
  @UseGuards(GqlAuthGuard)
  async user(@GetUser() user: JwtDto): Promise<User> {
    return await this.userService.getUser(user.id);
  }
}
