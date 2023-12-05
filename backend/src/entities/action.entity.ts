import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ConditionType {
  EQUAL = "equal",
  GREATER = "greater",
  LESS = "less",
}

@Entity()
export class ActionEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  inputReplica: string;

  @Column()
  outputReplica: string;

  @Column()
  inputValue: string;

  @Column()
  outputValue: string;

  @Column({
    type: "enum",
    enum: ConditionType,
  })
  condition: ConditionType;

  @Column({
    default: true,
  })
  enabled: boolean;
}