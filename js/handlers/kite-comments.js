import { mainFetch } from '../handlers/main-fetch.js';
import { adapter } from "../adapters/comments-adapter.js";
import {
    API_URL_GET_COMMENTS, API_URL_STORE_COMMENT
    , API_URL_UPDATE_COMMENT, HTTP_METHOD_POST_NO_CACHE
} from "../constants/api.js";

export async function fetchComments(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_COMMENTS, jsonRequestBody);
    adapter(responseObject.data.comments);
}

export async function fetchStoreComment(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_STORE_COMMENT, jsonRequestBody);
    return responseObject;
}


export async function fetchUpdateComment(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_UPDATE_COMMENT, jsonRequestBody);
    return responseObject;
}