import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateItemCommand } from '../impl/create-item.command';
import { ItemRepository } from '../../repository/item.repository';
import { Item } from '../../model/item.model';

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
  constructor(
    private readonly repository: ItemRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateItemCommand): Promise<Item> {
    Logger.log(
      'Processing CreateItemCommand for item ' + command.itemDto.id,
      'CreateItemCommand',
    );

    const { itemDto } = command;
    const item: Item = this.publisher.mergeObjectContext(
      await this.repository.createItem(itemDto),
    );
    item.commit();

    return item;
  }
}
