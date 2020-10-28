import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {APP_CONFIG} from 'src/shared/config'


@Controller(`${APP_CONFIG.apiVersion}/`)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
