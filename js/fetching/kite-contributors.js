import { mainFetch } from '../handlers/main-fetch.js';
import { adapterContributors } from "../adapters/my-contributors-adapter.js";
import {
    API_URL_GET_CONTRIBUTORS, API_URL_GET_CONTRIBUTIONS, API_URL_STORE_CONTRIBUTOR,
    API_URL_REMOVE_CONTRIBUTOR, API_URL_EXIT_PROJECT
} from "../constants/api.js";


// TODO: implement fetch functions

export async function fetchContributors(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_CONTRIBUTORS, jsonRequestBody);
    adapterContributors(responseObject.data.comments);
}

export async function fetchContributions(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_CONTRIBUTIONS, jsonRequestBody);
    adapterContributors(responseObject.data.comments);
}

export async function fetchStoreContributor(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_STORE_CONTRIBUTOR, jsonRequestBody);
    return responseObject;
}

export async function fetchRemoveContributor(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_REMOVE_CONTRIBUTOR, jsonRequestBody);
    return responseObject;
}

export async function fetchExitProject(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_EXIT_PROJECT, jsonRequestBody);
    return responseObject;
}

