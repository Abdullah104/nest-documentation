import { BadRequestException, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from '../forbidden.exception';

@Controller({ path: 'cats' })
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Some error description',
    });
  }

  @Post()
  create() {
    throw new ForbiddenException();
  }
}
