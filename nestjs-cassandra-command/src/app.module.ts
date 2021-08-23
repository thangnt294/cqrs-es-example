import { Module } from '@nestjs/common';
import { CassandraModule } from './core/cassandra/cassandra.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [CassandraModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
