import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ItemRestockedEvent } from '../impl/item-restocked.event';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(ItemRestockedEvent)
export class ItemRestockedHandler implements IEventHandler<ItemRestockedEvent> {
  @Inject('ITEM_SERVICE')
  private readonly client: ClientProxy;

  handle(event: ItemRestockedEvent) {
    Logger.log(
      'Processing ItemRestockedEvent: ' + event.id,
      'ItemRestockedEvent',
    );
    this.client.emit('item_restocked', event);
    Logger.log('Emitted event to appropriate queue');
  }
}
