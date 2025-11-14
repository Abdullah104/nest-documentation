import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller({ path: 'cats' })
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findOne(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    const cat = this.catsService.findOne(id);

    if (cat) return cat;

    throw new NotFoundException('Cat not found');
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
