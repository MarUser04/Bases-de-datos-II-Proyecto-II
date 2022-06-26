import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ItemCoin } from './item-coin.entity';
import { PlayerCoin } from './player-coin.entity';
import { Platform } from './platform.entity';

@Entity({ name: 'purchases' })
export class Purchase {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'timestamp without time zone' })
  public date: Date;

  @ManyToOne(() => ItemCoin, (itemCoin) => itemCoin.purchases)
  public itemCoin: ItemCoin;

  @ManyToOne(() => PlayerCoin, (playerCoin) => playerCoin.purchases)
  public playerCoin: PlayerCoin;

  @ManyToOne(() => Platform, (platform) => platform.purchases)
  public platform: Platform;
}
