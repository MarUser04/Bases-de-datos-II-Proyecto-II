import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OperatingSystem } from './operating-system.entity';

@Entity({ name: 'platforms' })
export class Platform {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  public name: string;

  @ManyToOne(
    () => OperatingSystem,
    (operatingSystem: OperatingSystem) => operatingSystem.platform,
  )
  public operatingSystem: OperatingSystem;
}
