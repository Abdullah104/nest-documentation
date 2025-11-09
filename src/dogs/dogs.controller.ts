import { Controller, Get } from '@nestjs/common';
import { CatsService } from '../cats/cats.service';

@Controller('dogs')
export class DogsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }
}
