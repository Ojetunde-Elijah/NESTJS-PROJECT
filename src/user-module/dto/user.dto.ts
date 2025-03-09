import { IsDefined, IsEmail, IsString } from "class-validator";

export class UserDto{
    @IsEmail()
    @IsString()
    @IsDefined()
    email: string;

    @IsString()
    @IsDefined()
    username: string;
}

export class userParamDto{
    @IsEmail()
    @IsDefined()
    @IsString()
    email: string
}