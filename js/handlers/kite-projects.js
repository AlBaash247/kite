import { getUser } from "./auth.js";
import { API_URL_PROJECTS, HTTP_METHOD_POST_NO_CACHE } from "../constants/api.js";
import { adapter } from "../adapters/projects-adapter.js";

export async function fetchProjects() {
    try {
        console.log(getUser().id);

        var jsonRequestBody= {
            "id" : getUser().id,
        }
        
        const response = await fetch(API_URL_PROJECTS, HTTP_METHOD_POST_NO_CACHE(jsonRequestBody));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseObject = await response.json();   
        adapter(responseObject.data.projects);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}







