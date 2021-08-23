import { ICommand } from '@nestjs/cqrs';
import { ItemDto } from '../../dto/item.dto';

export class RestockItemCommand implements ICommand {
  readonly itemDto: ItemDto;

  constructor(itemDto: ItemDto) {
    this.itemDto = itemDto;
  }
}
