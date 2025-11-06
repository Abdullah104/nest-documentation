import {
  Body,
  Controller,
  Get,
  Header,
  HostParam,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';

class Cat {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly age: number,
    readonly breed: string,
  ) {}
}

@Controller({ path: 'cats' })
export class CatsController {
  cats: Cat[] = [];

  @Get('ab{*splash}cd')
  findAll(
    @Query('filter[where][age]') age: number,
    @Query('filter[where][breed]') breed: string,
  ): Observable<Cat[]> {
    const cats: Cat[] = [];
    const stream: Observable<Cat[]> = of(cats);

    for (const cat of this.cats) {
      if (
        (!age && !breed) ||
        (age && cat.age == age) ||
        (breed && cat.breed == breed)
      ) {
        cats.push(cat);
      }
    }

    return stream;
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  create(@Body() createCatDto: CreateCatDto) {
    const newCat = new Cat(
      this.cats.length,
      createCatDto.name,
      createCatDto.age,
      createCatDto.breed,
    );

    this.cats.push(newCat);

    return newCat;
  }

  @Get(':id')
  findOne(@Param('id') id: number, @HostParam('host') host: string) {
    return `This actions returns a #${id} cat from host ${host}`;
  }
}
