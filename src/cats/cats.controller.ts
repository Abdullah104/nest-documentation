import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Optional,
  Post,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller({ path: 'cats' })
export class CatsController {
  @Optional()
  @Inject('HTTP_OPTIONS')
  private unexistingOptional: any;

  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    Logger.log(this.unexistingOptional);

    return this.catsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
