import {
  Controller,
  Get,
  Header,
  HostParam,
  HttpCode,
  Logger,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common';
import type { Request } from 'express';

@Controller({ host: ':host.onrender.com', path: 'cats' })
export class CatsController {
  @Get('ab{*splash}cd')
  findAll(): HttpRedirectResponse {
    return { url: 'http://localhost:8080', statusCode: 300 };
  }

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'no-store')
  create() {
    return 'This action adds a cat';
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Req() request: Request,
    @HostParam('host') host: string,
  ) {
    Logger.log(request.host);
    Logger.debug(request.hostname);

    return `This actions returns a #${id} cat from host ${host}`;
  }
}
