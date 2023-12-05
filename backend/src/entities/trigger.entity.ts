import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class TriggerEntity {
  @Column({ unique: true })
  @Index({ unique: true })
  @PrimaryColumn()
  replica: string;

  @Column()
  value: string;

  @Column({
    default: true,
  })
  enabled?: boolean;
}
