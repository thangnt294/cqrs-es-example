import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemDto } from '../dto/item.dto';
import { ItemService } from '../service/item.service';

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiResponse({ status: 200, description: 'Create Item' })
  @Post()
  async createItem(@Body() itemDto: ItemDto): Promise<ItemDto> {
    return this.itemService.createItem(itemDto);
  }

  @ApiResponse({ status: 200, description: 'Dispatch Item' })
  @Put('/dispatch')
  async dispatchItem(@Body() itemDto: ItemDto): Promise<ItemDto> {
    return this.itemService.dispatchItem(itemDto);
  }

  @ApiResponse({ status: 200, description: 'Restock Item' })
  @Put('/restock')
  async restockItem(@Body() itemDto: ItemDto): Promise<ItemDto> {
    return this.itemService.restockItem(itemDto);
  }

  @ApiResponse({ status: 200, description: 'Delete Item' })
  @Delete('/:id')
  async deleteItem(@Param('id') itemId: string): Promise<string> {
    return this.itemService.deleteItem(itemId);
  }
}
