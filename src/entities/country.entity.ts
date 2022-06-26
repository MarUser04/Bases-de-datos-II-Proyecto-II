import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text', unique: true })
  public name: string;

  @OneToMany(() => Player, (player) => player.country)
  public players: Player[];
}
