import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class ValueEntity {
  @Column({ unique: true })
  @Index({ unique: true })
  @PrimaryColumn()
  replica: string;

  @Column()
  value: string;
}
