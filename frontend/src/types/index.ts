export enum ConditionType {
  EQUAL = "equal",
  GREATER = "greater",
  LESS = "less",
}

export type ActionType = {
  id: number;
  name: string;
  inputReplica: string;
  outputReplica: string;
  inputValue: string;
  outputValue: string;
  condition: ConditionType;
  enabled: boolean;
};
