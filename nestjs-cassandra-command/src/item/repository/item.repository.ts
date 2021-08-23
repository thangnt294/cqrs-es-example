import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Item } from '../model/item.model';
import { ItemDto } from '../dto/item.dto';
import { CassandraService } from '../../core/cassandra/cassandra.service';
import { mapping } from 'cassandra-driver';
import { ItemDispatchedEvent } from '../event/impl/item-dispatched.event';
import { ItemCreatedEvent } from '../event/impl/item-created.event';
import { ItemRestockedEvent } from '../event/impl/item-restocked.event';
import { ItemDeletedEvent } from '../event/impl/item-deleted.event';
import { ItemEvent } from '../event/item.event';

@Injectable()
export class ItemRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  itemMapper: mapping.ModelMapper<ItemEvent>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        ItemEvent: {
          tables: ['item_event'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.itemMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('ItemEvent');
  }

  async createItem(itemDto: ItemDto): Promise<Item> {
    const item = new Item();
    item.setData(itemDto);

    const itemCreatedEvent = new ItemCreatedEvent(itemDto);
    await this.itemMapper.insert(itemCreatedEvent); // Insert event to DB
    Logger.log('Persisted event ' + itemCreatedEvent.id + ' to DB');
    item.createItem(itemCreatedEvent);

    return item;
  }

  async dispatchItem(itemDto: ItemDto): Promise<Item> {
    const item = new Item();
    item.setData(itemDto);

    const itemDispatchedEvent = new ItemDispatchedEvent(itemDto);
    await this.itemMapper.insert(itemDispatchedEvent); // Insert event to DB
    Logger.log('Persisted event ' + itemDispatchedEvent.id + ' to DB');
    item.dispatchItem(itemDispatchedEvent);

    return item;
  }

  async restockItem(itemDto: ItemDto): Promise<Item> {
    const item = new Item();
    item.setData(itemDto);

    const itemRestockedEvent = new ItemRestockedEvent(itemDto);
    await this.itemMapper.insert(itemRestockedEvent); // Insert event to DB
    Logger.log('Persisted event ' + itemRestockedEvent.id + ' to DB');
    item.restockItem(itemRestockedEvent);

    return item;
  }

  async deleteItem(itemDto: ItemDto): Promise<Item> {
    const item = new Item();
    item.setData(itemDto);

    const itemDeletedEvent = new ItemDeletedEvent(itemDto);
    await this.itemMapper.insert(itemDeletedEvent); // Insert event to DB
    Logger.log('Persisted event ' + itemDeletedEvent.id + ' to DB');
    item.deleteItem(itemDeletedEvent);

    return item;
  }
}
