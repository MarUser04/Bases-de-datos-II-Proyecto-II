import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coin } from './coin.entity';
import { Player } from './player.entity';

@Entity({ name: 'players_coins' })
export class PlayerCoin {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'integer' })
  public qty: number;

  @ManyToOne(() => Coin, (coin) => coin.coins)
  public coin: Coin;

  @ManyToOne(() => Player, (player) => player.players)
  public player: Player;
}
