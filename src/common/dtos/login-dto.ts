import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minLowercase: 0,
    })
    password: string;
    
}