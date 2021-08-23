import { IEvent } from '@nestjs/cqrs';
import { ItemEventEnum } from '../../constants/item.constant';
import { ItemEvent } from '../item.event';

export class ItemDeletedEvent extends ItemEvent implements IEvent {
  readonly eventType: ItemEventEnum = ItemEventEnum.ItemDeleted;
}
