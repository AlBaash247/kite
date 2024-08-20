import { getUser } from "../constants/my-store.js";
import { mainFetch } from '../handlers/main-fetch.js';
import { API_URL_GET_PROJECTS, API_KEY_AUTHOR_ID, HTTP_METHOD_POST_NO_CACHE } from "../constants/api.js";
import { adapter } from "../adapters/projects-adapter.js";

export async function fetchProjects(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_PROJECTS, jsonRequestBody);
    adapter(responseObject.data.projects);
}







