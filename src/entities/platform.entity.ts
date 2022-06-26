import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import { OperatingSystem } from './operating-system.entity';
import { Session } from './session.entity';
import { Purchase } from './purchase.entity';

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
  @JoinColumn({ name: 'id_operating_system', referencedColumnName: 'id' })
  public operatingSystem: OperatingSystem;

  @OneToMany(() => Session, (session) => session.platform)
  public session: Session[];

  @OneToMany(() => Purchase, (purchase) => purchase.platform)
  public purchases: Purchase[];
}
