import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Platform } from './platform.entity';
import { Player } from './player.entity';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'timestamp without time zone' })
  public session_start: Date;

  @Column({ type: 'timestamp without time zone' })
  public session_end: Date;

  @ManyToOne(() => Player, (player: Player) => player.session)
  @JoinColumn({ name: 'id_player', referencedColumnName: 'id' })
  public player: Player;

  @ManyToOne(() => Platform, (platform: Platform) => platform.session)
  @JoinColumn({ name: 'id_platform', referencedColumnName: 'id' })
  public platform: Platform;
}
