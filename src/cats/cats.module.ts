import { Global, Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Global()
@Module({
  providers: [CatsService],
  controllers: [CatsController],
  exports: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}
