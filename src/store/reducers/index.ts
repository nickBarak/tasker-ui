import { combineReducers } from "redux";
import user from "./userReducer";
import tasks from "./tasksReducer";

export default combineReducers({ user, tasks });
