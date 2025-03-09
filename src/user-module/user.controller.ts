import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UseFilters, UseGuards, UsePipes,ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user';
import { UserDto, userParamDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from './filter';
import { AuthGuard } from './guard';

@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService){}

  @Get()
  getUsers( @Param("id", ParseIntPipe) id: number,
  @Query("sort", ParseBoolPipe) sort: boolean,
  @Body() user: UserDto,
  ): User[]{
    return this.userService.getUsers()
  }


  @Get("/:email")
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  async getUser(@Param() params: userParamDto, @Req() req: Request, @Res() res: Response): Promise<User>{
    try{
      return await this.userService.getUser(params.email)
    }catch(err){
      throw new BadRequestException("failed")
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async postUser(@Body() user: UserDto): Promise<User>{
    return this.userService.addUser(user);
  }

  @Delete(":email")
  @UsePipes(new ValidationPipe())
  deleteUser(@Param() params: userParamDto): User[]{
    return this.userService.deleteUser(params.email)
  }
}
