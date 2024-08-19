import { adapter } from "../adapters/comments-adapter.js";
import { API_URL_GET_COMMENTS, API_URL_STORE_COMMENT
    ,API_URL_UPDATE_COMMENT, HTTP_METHOD_POST_NO_CACHE } from "../constants/api.js";

export async function fetchComments(jsonRequestBody) {

    try {
        const response = await fetch(API_URL_GET_COMMENTS, HTTP_METHOD_POST_NO_CACHE(jsonRequestBody));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseObject = await response.json();
        adapter(responseObject.data.comments);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function fetchStoreComment(jsonRequestBody) {

    let result = {};
    try {
        const response = await fetch(API_URL_STORE_COMMENT, HTTP_METHOD_POST_NO_CACHE(jsonRequestBody));
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


export async function fetchUpdateComment(jsonRequestBody) {

    let result = {};
    try {
        const response = await fetch(API_URL_UPDATE_COMMENT, HTTP_METHOD_POST_NO_CACHE(jsonRequestBody));
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