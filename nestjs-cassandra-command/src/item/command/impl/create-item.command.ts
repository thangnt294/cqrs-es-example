import { ICommand } from '@nestjs/cqrs';
import { ItemDto } from 'src/item/dto/item.dto';

export class CreateItemCommand implements ICommand {
  readonly itemDto: ItemDto;

  constructor(itemDto: ItemDto) {
    this.itemDto = itemDto;
  }
}
