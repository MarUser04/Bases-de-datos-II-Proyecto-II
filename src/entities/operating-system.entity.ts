import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OperatingSystem {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  public name: string;
}
