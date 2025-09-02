import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    @Min(0)
    age: number;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Min(6, { message: 'password must be at least 6 characters long' })
    password: string;

    @IsEnum(["Buyer", "Seller", "Admin"], { message: 'role is required' })
    role: "Buyer" | "Seller" | "Admin";
}