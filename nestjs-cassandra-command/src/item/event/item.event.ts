import { IEvent } from '@nestjs/cqrs';
import { ItemDto } from '../dto/item.dto';
import { v4 as uuidv4 } from 'uuid';

export class ItemEvent implements IEvent {
  readonly id: string;
  readonly itemId: string;
  readonly name: string;
  readonly quantity: number;
  readonly timestamp: Date;

  constructor(itemDto: ItemDto) {
    this.id = uuidv4();
    this.itemId = itemDto.id;
    this.name = itemDto.name;
    this.quantity = itemDto.quantity;
    this.timestamp = new Date();
  }
}
