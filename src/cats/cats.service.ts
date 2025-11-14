import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findOne(id: number) {
    return this.cats.find((value) => value.id === id);
  }

  create(createCatDto: CreateCatDto): Cat {
    const newCat = { id: this.cats.length + 1, ...createCatDto };

    this.cats.push(newCat);

    return newCat;
  }
}
