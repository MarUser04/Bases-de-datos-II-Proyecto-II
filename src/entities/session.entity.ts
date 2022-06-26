import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  public player: Player;

  @ManyToOne(() => Platform, (platform: Platform) => platform.session)
  public platform: Platform;
}
