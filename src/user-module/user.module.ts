import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {LoggerMiddleware} from "./middleware"

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule{
configure(consumer: MiddlewareConsumer){
  consumer
    .apply(LoggerMiddleware)
    .forRoutes("users");
  }
}
