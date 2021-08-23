import { CreateItemHandler } from './create-item.handler';
import { DeleteItemHandler } from './delete-item.handler';
import { DispatchItemHandler } from './dispatch-item.handler';
import { RestockItemHandler } from './restock-item.handler';

export const CommandHandlers = [
  CreateItemHandler,
  DeleteItemHandler,
  DispatchItemHandler,
  RestockItemHandler,
];
