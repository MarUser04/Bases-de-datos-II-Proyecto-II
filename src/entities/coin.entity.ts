import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemCoin } from './item-coin.entity';

@Entity({ name: 'coins' })
export class Coin {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  public name: string;

  @OneToMany(() => ItemCoin, (itemCoin: ItemCoin) => itemCoin.id_coin)
  public itemCoin: ItemCoin[];
}
