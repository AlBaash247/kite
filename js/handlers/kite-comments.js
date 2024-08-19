// TODO: fetchComments
import { adapter } from "../adapters/comments-adapter.js";
import { API_URL_GET_COMMENTS, HTTP_METHOD_POST_NO_CACHE } from "../constants/api.js";

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