import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ItemDeletedEvent } from '../impl/item-deleted.event';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(ItemDeletedEvent)
export class ItemDeletedHandler implements IEventHandler<ItemDeletedEvent> {
  @Inject('ITEM_SERVICE')
  private readonly client: ClientProxy;

  handle(event: ItemDeletedEvent) {
    Logger.log('Processing ItemDeletedEvent: ' + event.id, 'ItemDeletedEvent');
    this.client.emit('item_deleted', event);
    Logger.log('Emitted event to appropriate queue');
  }
}
