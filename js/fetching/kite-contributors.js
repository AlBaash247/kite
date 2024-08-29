import { mainFetch } from '../fetching/main-fetch.js';
import { adapterContributors } from "../adapters/my-contributors-adapter.js";
import { adapterContribution } from "../adapters/my-contributions-adapter.js";
import { adapterUsersList, adapterProjectsList } from "../adapters/users-list-adapter.js";
import {
    API_URL_GET_CONTRIBUTORS, API_URL_GET_CONTRIBUTIONS, API_URL_STORE_CONTRIBUTOR,
    API_URL_REMOVE_CONTRIBUTOR, API_URL_USERS_LIST, API_URL_GET_PROJECTS, API_URL_EXIT_PROJECT
} from "../constants/api.js";



export async function fetchContributors(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_CONTRIBUTORS, jsonRequestBody);
    adapterContributors(responseObject.data.contributors);
}

export async function fetchContributions(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_CONTRIBUTIONS, jsonRequestBody);
    adapterContribution(responseObject.data.contributors);
}

export async function fetchStoreContributors(jsonRequestBody) {
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
    console.log(responseObject);
    adapterUsersList(responseObject.data.users);
}

export async function fetchProjects(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_GET_PROJECTS, jsonRequestBody);
    adapterProjectsList(responseObject.data.projects);
}

