import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @JoinColumn({ name: 'id_item_coin', referencedColumnName: 'id' })
  public itemCoin: ItemCoin;

  @ManyToOne(() => PlayerCoin, (playerCoin) => playerCoin.purchases)
  @JoinColumn({ name: 'id_player_coin', referencedColumnName: 'id' })
  public playerCoin: PlayerCoin;

  @ManyToOne(() => Platform, (platform) => platform.purchases)
  @JoinColumn({ name: 'id_platform', referencedColumnName: 'id' })
  public platform: Platform;
}
