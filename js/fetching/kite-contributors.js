import { mainFetch } from '../fetching/main-fetch.js';
import { adapterContributors } from "../adapters/my-contributors-adapter.js";
import { adapterContribution } from "../adapters/my-contributions-adapter.js";
import { adapterUsersList } from "../adapters/users-list-adapter.js";
import {
    API_URL_GET_CONTRIBUTORS, API_URL_GET_CONTRIBUTIONS, API_URL_STORE_CONTRIBUTOR,
    API_URL_REMOVE_CONTRIBUTOR, API_URL_USERS_LIST,
} from "../constants/api.js";


// TODO: implement fetch functions

export async function fetchContributors(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_CONTRIBUTORS, jsonRequestBody);
    adapterContributors(responseObject.data.contributors);
}

export async function fetchContributions(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_CONTRIBUTIONS, jsonRequestBody);
    adapterContribution(responseObject.data.contributors);
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

export async function fetchUsersList(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_USERS_LIST, jsonRequestBody);
    adapterUsersList(responseObject.data.users);
}

