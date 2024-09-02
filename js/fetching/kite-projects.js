import { mainFetch } from '../fetching/main-fetch.js';
import { API_URL_GET_PROJECTS, API_URL_STORE_PROJECT } from "../constants/api.js";
import { adapter } from "../adapters/projects-adapter.js";
import { displayProjectModal } from "../scripts/new-project.js";

export async function fetchProjects(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_PROJECTS, jsonRequestBody);
    if (responseObject.data.projects.length == 0) {
        displayProjectModal();
    }
    adapter(responseObject.data.projects);
}

export async function fetchStoreProject(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_STORE_PROJECT, jsonRequestBody);
    return responseObject;
}







