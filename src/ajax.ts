import axios from 'axios';
import { ajaxCaller, api } from "./resources";
import { apiRoutes } from "./resources";
import * as models from './types';


// Authentication

export async function signup(formData: models.LoginRequest) : Promise<models.User>{
    try {
        const { data: { jwt, user } } = await axios.post<models.LoginResponse>(api + apiRoutes.REGISTER, formData);
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (e) {
        console.log(e);
        throw (e as models.ErrorResponse)?.response?.status;
    }
}

export async function login(formData: models.LoginRequest): Promise<models.User> {
    try {
        const { data: { jwt, user } } = await axios.post<models.LoginResponse>(api + apiRoutes.LOG_IN, formData);
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (e) {
        console.log(e);
        throw (e as models.ErrorResponse)?.response?.status;
    }
}

export function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
}


// Users

export async function getUsers() : Promise<models.User[]> {
    try {
        const { data } = await ajaxCaller().get<models.User[]>(apiRoutes.USER);
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getUser(id : number) : Promise<models.User | null> {
    try {
        const { data } = await ajaxCaller().get<models.User>(apiRoutes.USER + '/' + id);
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function editPassword(id: number, formData : models.LoginRequest) : Promise<models.User | null> {
    try {
        const { data } = await ajaxCaller().put<models.User>(apiRoutes.USER + '/' + id, formData);
        return data;
    } catch (e) {
        console.log(e);
        throw new Error('Error updating password');
    }
}

export async function deleteUser(id : number) {
    try {
        ajaxCaller().delete(apiRoutes.USER + '/' + id);
    } catch (e) {
        console.log(e);
        throw new Error('Failed to delete user');
    }
}


// Tasks

export async function getTasks(): Promise<models.Task[]> {
    try {
        const { data } = await ajaxCaller().get<models.Task[]>(apiRoutes.TASK);
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getTaskById(id : number) : Promise<models.Task | null> {
    try {
        const { data } = await ajaxCaller().get<models.Task>(apiRoutes.TASK + '/' + id);
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function createTask(content: string) : Promise<models.Task> {
    try {
        const { data } = await ajaxCaller().post<models.Task>(apiRoutes.TASK, content, { headers: { 'Content-Type': 'text/plain' } });
        return data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to create task');
    }
}

export async function updateTask(task: models.Task) {
    try {
        ajaxCaller().put<models.Task>(apiRoutes.TASK + '/' + task.id, task);
    } catch (e) {
        console.log(e);
    }
}

export async function deleteTask(id: number) {
    try {
        ajaxCaller().delete<void>(apiRoutes.TASK + '/' + id);
    } catch (e) {
        console.log(e);
    }
}