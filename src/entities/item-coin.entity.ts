import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
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
  @JoinColumn({ name: 'id_item', referencedColumnName: 'id' })
  public id_item: Item;

  @ManyToOne(() => Coin, (coin: Coin) => coin.itemCoin)
  @JoinColumn({ name: 'id_coin', referencedColumnName: 'id' })
  public id_coin: Coin;

  @OneToMany(() => Purchase, (purchase) => purchase.itemCoin)
  public purchases: Purchase[];
}
