import { ICommand } from '@nestjs/cqrs';

export class DeleteItemCommand implements ICommand {
  readonly itemId!: string;

  constructor(itemId: string) {
    this.itemId = itemId;
  }
}
