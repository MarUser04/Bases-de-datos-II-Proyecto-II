import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';

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
}
