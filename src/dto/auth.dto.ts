import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        type: String
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'password123',
        type: String
    })
    @IsString()
    password: string;
}
