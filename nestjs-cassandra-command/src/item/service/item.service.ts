import { CommandBus } from '@nestjs/cqrs';
import { ItemDto } from '../dto/item.dto';
import { CreateItemCommand } from '../command/impl/create-item.command';
import { DispatchItemCommand } from '../command/impl/dispatch-item.command';
import { RestockItemCommand } from '../command/impl/restock-item.command';
import { DeleteItemCommand } from '../command/impl/delete-item.command';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService {
  constructor(private readonly commandBus: CommandBus) {}

  async createItem(item: ItemDto) {
    item.id = uuidv4();
    return await this.commandBus.execute(new CreateItemCommand(item));
  }

  async dispatchItem(item: ItemDto) {
    return await this.commandBus.execute(new DispatchItemCommand(item));
  }

  async restockItem(item: ItemDto) {
    return await this.commandBus.execute(new RestockItemCommand(item));
  }

  async deleteItem(itemId: string) {
    return await this.commandBus.execute(new DeleteItemCommand(itemId));
  }
}
