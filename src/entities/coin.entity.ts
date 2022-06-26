import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'coins' })
export class Coin {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  public name: string;
}
