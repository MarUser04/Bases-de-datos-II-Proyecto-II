import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OperatingSystem } from './operating-system.entity';
import { Session } from './session.entity';

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

  @OneToMany(() => Session, (session) => session.platform)
  public session: Session[];
}
