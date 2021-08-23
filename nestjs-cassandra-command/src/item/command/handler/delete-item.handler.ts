import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ItemRepository } from '../../repository/item.repository';
import { DeleteItemCommand } from '../impl/delete-item.command';
import { ItemDto } from '../../dto/item.dto';
import { Item } from '../../model/item.model';

@CommandHandler(DeleteItemCommand)
export class DeleteItemHandler implements ICommandHandler<DeleteItemCommand> {
  constructor(
    private readonly repository: ItemRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteItemCommand): Promise<Item> {
    Logger.log(
      'Processing DeleteItemCommand for item ' + command.itemId,
      'DeleteItemCommand',
    );

    const { itemId } = command;
    const itemDto: ItemDto = new ItemDto(itemId, null, null);
    const item: Item = this.publisher.mergeObjectContext(
      await this.repository.deleteItem(itemDto),
    );
    item.commit();
    return item;
  }
}
