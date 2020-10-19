import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

enum Gender {
    MALE= 'Male',
    FEMALE= 'Female',
}

export class UserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

    @IsNotEmpty()
    readonly role: number;
    
    @IsNotEmpty()
    @IsEnum(Gender, {
        message: "Gender must be either Male or Female"
    })
    readonly gender: Gender;

}