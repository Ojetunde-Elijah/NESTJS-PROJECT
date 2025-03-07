import { Body, Controller, Delete, Get, Param, Post, UsePipes,ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user';
import {UserDto } from "./dto/user.dto.ts"
import {Request} from "express";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(
    @Param("id", ParseIntPipe) id: number,
    @Query("sort") sort: boolean,
    @Body() data: UserDto
  ): User[] {
    return this.userService.getUsers()
  }

  @HttpCode(204)
  @Header("Cache-Control", "none");
  @Get("/:email")
  getUser(@Param() param: UserParamsDto, @Req() req: Request): User{
    return this.userService.getUser(param.email)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async postUser(@Body() user: UserDto): Promise<User>{
    return this.userService.addUser(user)
  }

  @Delete("/:email")
  deleteUser(@Param() params: UserParamsDto): User[]{
    return this.userService.deleteUser(params.email)
  }
}
