import { Task } from "../../resources/types";
import { UPDATE_TASKS } from "../types";

const updateTasks = (payload: Task[]) => ({ type: UPDATE_TASKS, payload });

export default updateTasks;
