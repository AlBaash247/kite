import store from 'https://cdn.jsdelivr.net/npm/store@2.0.12/+esm'
import { STORE_USER } from '../constants/store-keys.js';
import { API_URL_LOGIN, HTTP_METHOD_POST_NO_CACHE } from '../constants/api-urls.js';

export function storeUser(user) {
    store.set(STORE_USER, user)
}

export function getUser() {
    return store.get(STORE_USER);
}

export async function fetchLogin(user) {
    try {
        const response = await fetch(API_URL_LOGIN, HTTP_METHOD_POST_NO_CACHE(user));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} | ${response.message}`);
        }
        const responseObject = await response.json();
        storeUser(responseObject.data);
        console.log(responseObject);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}