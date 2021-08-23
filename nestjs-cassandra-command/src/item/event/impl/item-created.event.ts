import { IEvent } from '@nestjs/cqrs';
import { ItemEventEnum } from '../../constants/item.constant';
import { ItemEvent } from '../item.event';

export class ItemCreatedEvent extends ItemEvent implements IEvent {
  readonly eventType: ItemEventEnum = ItemEventEnum.ItemCreated;
}
