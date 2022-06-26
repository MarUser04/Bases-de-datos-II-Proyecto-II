import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  public name: string;
}
