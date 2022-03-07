export interface Task {
  id: number;
  content: string;
  date: Date;
  isComplete: boolean;
  author: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface Store {
  user: User | null;
  tasks: Task[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  jwt: string;
  user: User;
}

export interface ErrorResponse {
  response: {
    status: number;
  };
  ["props"]?: any;
}

export interface Action {
  type: string;
  payload?: any;
}
