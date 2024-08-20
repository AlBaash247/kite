import { HTTP_METHOD_POST_NO_CACHE } from "../constants/api.js";

export async function mainFetch(API_URL, jsonRequestBody) {

    let result = {};
    try {
        const response = await fetch(API_URL, HTTP_METHOD_POST_NO_CACHE(jsonRequestBody));
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
        return responseObject;

    } catch (error) {
        result.is_ok = false;
        result.message = 'Error fetching data: ' + error;
        return result;
    }
}