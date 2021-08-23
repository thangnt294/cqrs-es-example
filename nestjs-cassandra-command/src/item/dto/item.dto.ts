export class ItemDto {
  public id!: string;
  public name!: string;
  public quantity!: number;

  constructor(itemId: string, name: string, quantity: number) {
    this.id = itemId;
    this.name = name;
    this.quantity = quantity;
  }
}
