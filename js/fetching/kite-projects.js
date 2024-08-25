import { mainFetch } from '../handlers/main-fetch.js';
import { API_URL_GET_PROJECTS, API_URL_STORE_PROJECT } from "../constants/api.js";
import { adapter } from "../adapters/projects-adapter.js";

export async function fetchProjects(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_PROJECTS, jsonRequestBody);
    adapter(responseObject.data.projects);
}

export async function fetchStoreProject(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_STORE_PROJECT, jsonRequestBody);
    return responseObject;
}







