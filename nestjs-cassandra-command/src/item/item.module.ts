import { Module } from '@nestjs/common';
import { CassandraModule } from '../core/cassandra/cassandra.module';
import { ItemController } from './controller/item.controller';
import { ItemService } from './service/item.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './command/handler';
import { EventHandlers } from './event/handlers';
import { ItemRepository } from './repository/item.repository';
import { config } from '../../config';

@Module({
  imports: [
    CqrsModule,
    CassandraModule,
    ClientsModule.register([
      {
        name: config.AMQP_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [config.AMQP_URL],
          queue: config.AMQP_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ItemController],
  providers: [
    ItemService,
    ItemRepository,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class ItemModule {}
