import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

export enum ReplicaType {
    INPUT = "input",
    OUTPUT = "output",
}

@Entity()
export class ReplicaEntity {
  @Column({ unique: true })
  @Index({ unique: true })
  @PrimaryColumn()
  id: string;

  @Column({
    type: "enum",
    enum: ReplicaType,
  })
  type: ReplicaType;
}
