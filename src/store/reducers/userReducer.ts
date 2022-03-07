import { Action } from "../../resources/types";
import { UPDATE_USER } from "../types";

const user = (state = null, { type, payload }: Action) => {
  switch (type) {
    case UPDATE_USER:
      return payload;
    default:
      return state;
  }
};

export default user;
