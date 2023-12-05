import { createContext } from "react";
import { ActionType } from "../types";

export const ActionContext = createContext({
  actions: [] as ActionType[],
  setActions: (actions: ActionType[]) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
});
