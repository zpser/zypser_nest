import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @ApiOperation({ summary: 'Get hello message' })
    @ApiResponse({ status: 200, description: 'Returns a hello message' })
    getHello(): string {
        return this.appService.getHello();
    }
}
