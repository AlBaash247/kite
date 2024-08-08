import { API_URL_TASKS, HTTP_METHOD_POST_NO_CACHE } from "../constants/api.js";
import { adapter } from "../adapters/tasks-adapter.js";

export async function fetchTasks(jsonRequestBody) {
    console.log("Fetching tasks ");
    console.log(jsonRequestBody);
    try {
        const response = await fetch(API_URL_TASKS, HTTP_METHOD_POST_NO_CACHE(jsonRequestBody));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseObject = await response.json();
        console.log(responseObject);
        adapter(responseObject.data.tasks);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
