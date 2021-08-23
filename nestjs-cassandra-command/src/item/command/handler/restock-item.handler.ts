import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ItemRepository } from '../../repository/item.repository';
import { RestockItemCommand } from '../impl/restock-item.command';
import { Item } from '../../model/item.model';

@CommandHandler(RestockItemCommand)
export class RestockItemHandler implements ICommandHandler<RestockItemCommand> {
  constructor(
    private readonly repository: ItemRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RestockItemCommand): Promise<Item> {
    Logger.log(
      'Processing RestockItemCommand for item ' + command.itemDto.id,
      'RestockItemCommand',
    );

    const { itemDto } = command;
    const item: Item = this.publisher.mergeObjectContext(
      await this.repository.restockItem(itemDto),
    );
    item.commit();

    return item;
  }
}
