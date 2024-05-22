import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // http://localhost:3000/
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // http://localhost:3000/test
  @Get('test')
  getTest(): string {
    // return 'test';
    return this.appService.getTest();
  }

  // http://localhost:3000/name/...
  @Get(`name/:name`)
  getName(@Param(`name`) name: string): string {
    return `${name}`;
    // return this.appService.getName();
  }

  // http://localhost:3000/name?name=...
  @Get(`name`)
  getName2(@Query(`name`) name: string): string {
    return `${name}`;
  }
}
