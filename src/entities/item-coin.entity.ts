import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coin } from './coin.entity';
import { Item } from './item.entity';
import { Purchase } from './purchase.entity';

@Entity({ name: 'items_coins' })
export class ItemCoin {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'integer' })
  public price: number;

  @ManyToOne(() => Item, (item: Item) => item.itemCoin)
  public id_item: Item;

  @ManyToOne(() => Coin, (coin: Coin) => coin.itemCoin)
  public id_coin: Coin;

  @OneToMany(() => Purchase, (purchase) => purchase.itemCoin)
  public purchases: Purchase[];
}
