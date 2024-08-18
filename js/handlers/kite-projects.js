import { getUser } from "../constants/my-store.js";
import { API_URL_GET_PROJECTS, API_KEY_AUTHOR_ID, HTTP_METHOD_POST_NO_CACHE } from "../constants/api.js";
import { adapter } from "../adapters/projects-adapter.js";

export async function fetchProjects() {
    try {
        console.log(getUser().id);
        var jsonRequestBody = {};
        jsonRequestBody[API_KEY_AUTHOR_ID] = getUser().id

        const response = await fetch(API_URL_GET_PROJECTS, HTTP_METHOD_POST_NO_CACHE(jsonRequestBody));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseObject = await response.json();
        adapter(responseObject.data.projects);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}







