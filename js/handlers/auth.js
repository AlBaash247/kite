import store from 'https://cdn.jsdelivr.net/npm/store@2.0.12/+esm'
import { STORE_USER } from '../constants/store-keys.js';

export function storeUser(user) {
    store.set(STORE_USER, user)
}

export function getUser() {
    return store.get(STORE_USER);
}