import { ItemCreatedHandler } from './item-created.handler';
import { ItemDeletedHandler } from './item-deleted.handler';
import { ItemDispatchedHandler } from './item-dispatched.handler';
import { ItemRestockedHandler } from './item-restocked.handler';

export const EventHandlers = [
  ItemCreatedHandler,
  ItemDeletedHandler,
  ItemDispatchedHandler,
  ItemRestockedHandler,
];
