import { AggregateRoot } from '@nestjs/cqrs';
import { ItemDto } from '../dto/item.dto';
import { ItemCreatedEvent } from '../event/impl/item-created.event';
import { ItemDispatchedEvent } from '../event/impl/item-dispatched.event';
import { ItemRestockedEvent } from '../event/impl/item-restocked.event';
import { ItemDeletedEvent } from '../event/impl/item-deleted.event';

export class Item extends AggregateRoot {
  private id!: string;
  private name!: string;
  private quantity!: number;

  [x: string]: any;

  constructor() {
    super();
  }

  setData(itemDto: ItemDto) {
    this.id = itemDto.id;
    this.name = itemDto.name;
    this.quantity = itemDto.quantity;
  }

  createItem(itemCreatedEvent: ItemCreatedEvent) {
    this.apply(itemCreatedEvent);
  }

  dispatchItem(itemDispatchedEvent: ItemDispatchedEvent) {
    this.apply(itemDispatchedEvent);
  }

  restockItem(itemRestockedEvent: ItemRestockedEvent) {
    this.apply(itemRestockedEvent);
  }

  deleteItem(itemDeletedEvent: ItemDeletedEvent) {
    this.apply(itemDeletedEvent);
  }
}
