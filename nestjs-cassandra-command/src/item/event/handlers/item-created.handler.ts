import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ItemCreatedEvent } from '../impl/item-created.event';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(ItemCreatedEvent)
export class ItemCreatedHandler implements IEventHandler<ItemCreatedEvent> {
  @Inject('ITEM_SERVICE')
  private readonly client: ClientProxy;

  handle(event: ItemCreatedEvent) {
    Logger.log('Processing ItemCreatedEvent: ' + event.id, 'ItemCreatedEvent');
    this.client.emit('item_created', event);
    Logger.log('Emitted event to appropriate queue');
  }
}
