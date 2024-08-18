import { storeUser, getUser } from '../constants/my-store.js';
import { API_URL_LOGIN, API_URL_REGISTER, HTTP_METHOD_POST_NO_CACHE } from '../constants/api.js';

export function isAuthOK() { return getUser() != null; }

export async function fetchLogin(user) {
    let result = {};
    try {
        const response = await fetch(API_URL_LOGIN, HTTP_METHOD_POST_NO_CACHE(user));
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

export async function fetchRegister(user) {
    let result = {};
    try {
        console.log(user);

        const response = await fetch(API_URL_REGISTER, HTTP_METHOD_POST_NO_CACHE(user));
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

export function signOut() {
    storeUser(null);
}

