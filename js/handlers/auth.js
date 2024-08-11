import store from 'https://cdn.jsdelivr.net/npm/store@2.0.12/+esm'
import { STORE_USER } from '../constants/store-keys.js';
import { API_URL_LOGIN, API_URL_REGISTER, HTTP_METHOD_POST_NO_CACHE } from '../constants/api.js';


export function storeUser(user) {
    store.set(STORE_USER, user)
}

export function getUser() {
    return store.get(STORE_USER);
}

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

async function fetchRegister(user) {
    try {
        const response = await fetch(API_URL_REGISTER,HTTP_METHOD_POST_NO_CACHE(user));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export function signout(){
    storeUser(null);
}

