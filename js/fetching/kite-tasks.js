import { mainFetch } from '../handlers/main-fetch.js';
import {
    API_URL_GET_TASKS, API_URL_STORE_TASK,
    API_URL_UPDATE_TASK, HTTP_METHOD_POST_NO_CACHE
} from "../constants/api.js";
import { adapter } from "../adapters/tasks-adapter.js";

export async function fetchTasks(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_TASKS, jsonRequestBody);
    adapter(responseObject.data.tasks);

}

export async function fetchAddTask(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_STORE_TASK, jsonRequestBody);
    return responseObject;
}

export async function fetchUpdateTask(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_UPDATE_TASK, jsonRequestBody);
    return responseObject;
}