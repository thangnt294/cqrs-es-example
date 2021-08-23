import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ItemRepository } from '../../repository/item.repository';
import { DispatchItemCommand } from '../impl/dispatch-item.command';
import { Item } from '../../model/item.model';

@CommandHandler(DispatchItemCommand)
export class DispatchItemHandler
  implements ICommandHandler<DispatchItemCommand>
{
  constructor(
    private readonly repository: ItemRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DispatchItemCommand): Promise<Item> {
    Logger.log(
      'Processing DispatchItemCommand for item ' + command.itemDto.id,
      'DispatchItemCommand',
    );

    const { itemDto } = command;
    const item: Item = this.publisher.mergeObjectContext(
      await this.repository.dispatchItem(itemDto),
    );
    item.commit();
    return item;
  }
}
