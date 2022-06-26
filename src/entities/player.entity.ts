import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { Session } from './session.entity';
import { PlayerCoin } from './player-coin.entity';

@Entity({ name: 'players' })
export class Player {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  public name: string;

  @Column({ type: 'date' })
  public birthdate: Date;

  @Column({ type: 'text' })
  public gender: string;

  @ManyToOne(() => Country, (country) => country.players)
  public country: Country;

  @OneToMany(() => Session, (session) => session.player)
  public session: Session[];

  @OneToMany(() => PlayerCoin, (playerCoin) => playerCoin.player)
  public players: Player[];
}
