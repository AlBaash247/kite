import { API_URL_GET_TASKS, API_URL_STORE_TASK, HTTP_METHOD_POST_NO_CACHE } from "../constants/api.js";
import { adapter } from "../adapters/tasks-adapter.js";

export async function fetchTasks(jsonRequestBody) {

    try {
        const response = await fetch(API_URL_GET_TASKS, HTTP_METHOD_POST_NO_CACHE(jsonRequestBody));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseObject = await response.json();
        adapter(responseObject.data.tasks);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function fetchAddTask(jsonRequestBody) {
    alert(jsonRequestBody);

    let result = {};
    try {
        const response = await fetch(API_URL_STORE_TASK, HTTP_METHOD_POST_NO_CACHE(jsonRequestBody));
        if (!response.ok) {

            if (response.status == 422) {
                const responseObject = await response.json();
                result = responseObject;
            }
            else {
                result.is_ok = false;
                result.message = `HTTP error! status: ${response.status}`;
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return result;
        }
        const responseObject = await response.json();
        storeUser(responseObject.data);
        return responseObject;

    } catch (error) {
        result.is_ok = false;
        result.message = 'Error fetching data: ' + error;
        return result;
    }
}
