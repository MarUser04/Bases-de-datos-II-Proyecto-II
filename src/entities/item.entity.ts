import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemCoin } from './item-coin.entity';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  public name: string;

  @Column({ type: 'integer' })
  public level: number;

  @OneToMany(() => ItemCoin, (itemCoin: ItemCoin) => itemCoin.id_item)
  public itemCoin: ItemCoin[];
}
