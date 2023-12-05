import { ActionType, ConditionType } from "../types";

export const addAction = async (
  name: string,
  inputReplica: string,
  outputReplica: string,
  inputValue: string,
  outputValue: string,
  condition: ConditionType,
  actions: ActionType[],
  setActions: (actions: ActionType[]) => void,
): Promise<void> => {
  const newAction = {
    name,
    inputReplica,
    outputReplica,
    inputValue,
    outputValue,
    condition,
  };
  const res = await fetch(`${process.env.REACT_APP_API_URL}/action`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newAction),
  });
  const data = await res.json();

  setActions([
    ...actions,
    {
      name,
      id: data.id,
      inputReplica,
      outputReplica,
      inputValue,
      outputValue,
      condition,
      enabled: true,
    },
  ]);
};

export const getActions = async (
  setActions: (actions: ActionType[]) => void,
): Promise<void> => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/action`);
  const data = await res.json();

  console.log(data);

  setActions(data);
};

export const deleteAction = async (
  id: number,
  actions: ActionType[],
  setActions: (actions: ActionType[]) => void,
): Promise<void> => {
  await fetch(`${process.env.REACT_APP_API_URL}/action/${id}`, {
    method: "DELETE",
  });
  const newActions = actions.filter((action) => action.id !== id);

  setActions(newActions);
};

export const updateAction = async (
  id: number,
  name: string,
  inputReplica: string,
  outputReplica: string,
  inputValue: string,
  outputValue: string,
  condition: ConditionType,
  enabled: boolean,
  actions: ActionType[],
  setActions: (actions: ActionType[]) => void,
): Promise<void> => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/action/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      inputReplica,
      outputReplica,
      inputValue,
      outputValue,
      enabled,
      condition,
    }),
  });
  const data = await res.json();
  console.log(data);

  const newActions = actions.map((action) => {
    if (action.id === id) {
      return {
        id,
        name,
        inputReplica,
        outputReplica,
        inputValue,
        outputValue,
        condition,
        enabled,
      };
    }
    return action;
  });

  setActions(newActions);
};
