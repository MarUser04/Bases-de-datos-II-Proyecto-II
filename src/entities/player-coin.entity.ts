import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coin } from './coin.entity';
import { Player } from './player.entity';
import { Purchase } from './purchase.entity';

@Entity({ name: 'players_coins' })
export class PlayerCoin {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'integer' })
  public qty: number;

  @ManyToOne(() => Coin, (coin) => coin.coins)
  @JoinColumn({ name: 'id_coin', referencedColumnName: 'id' })
  public coin: Coin;

  @ManyToOne(() => Player, (player) => player.players)
  @JoinColumn({ name: 'id_player', referencedColumnName: 'id' })
  public player: Player;

  @OneToMany(() => Purchase, (purchase) => purchase.playerCoin)
  public purchases: Purchase[];
}
