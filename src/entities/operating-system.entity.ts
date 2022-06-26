import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Platform } from './platform.entity';

@Entity()
export class OperatingSystem {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  public name: string;

  @OneToMany(() => Platform, (platform: Platform) => platform.operatingSystem)
  public platform: Platform[];
}
