import { storeUser, getUser } from '../constants/my-store.js';
import { mainFetch } from '../fetching/main-fetch.js';

import { API_URL_LOGIN, API_URL_REGISTER } from '../constants/api.js';

export function isAuthOK() { return getUser() != null; }

export async function fetchLogin(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_LOGIN, jsonRequestBody);
    storeUser(responseObject.data);
    return responseObject;
}

export async function fetchRegister(jsonRequestBody) {
    const responseObject = await mainFetch(API_URL_REGISTER, jsonRequestBody);
    storeUser(responseObject.data);
    return responseObject;
}

export function signOut() {
    storeUser(null);
}



