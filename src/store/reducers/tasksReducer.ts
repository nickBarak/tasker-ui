import { Action } from "../../resources/types";
import { UPDATE_TASKS } from "../types";

const tasks = (state = [], { type, payload }: Action) => {
  if (!payload) return [...state];
  switch (type) {
    case UPDATE_TASKS:
      return [...payload];
    default:
      return [...state];
  }
};

export default tasks;
