import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    // @Min(6)
    password: string;

    @IsEnum(["Buyer", "Seller", "Admin"], { message: 'role is required' })
    role: "Buyer" | "Seller" | "Admin";
}