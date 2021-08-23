import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ItemDispatchedEvent } from '../impl/item-dispatched.event';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(ItemDispatchedEvent)
export class ItemDispatchedHandler
  implements IEventHandler<ItemDispatchedEvent>
{
  @Inject('ITEM_SERVICE')
  private readonly client: ClientProxy;

  handle(event: ItemDispatchedEvent) {
    Logger.log(
      'Processing ItemDispatchedEvent: ' + event.id,
      'ItemDispatchedEvent',
    );
    this.client.emit('item_dispatched', event);
    Logger.log('Emitted event to appropriate queue');
  }
}
