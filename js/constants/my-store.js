import store from 'https://cdn.jsdelivr.net/npm/store@2.0.12/+esm'

export const STORE_USER = 'user';
export const STORE_SELECTED_PROJECT_ID = 'selected_project_id';
export const STORE_SELECTED_TASK = 'selected_task';


export function storeUser(user) {
    store.set(STORE_USER, user);
}

export function getUser() {
    return store.get(STORE_USER);
}

export function storeSelectedProjectId(projectId) {
    store.set(STORE_SELECTED_PROJECT_ID, projectId);
}

export function getSelectedProjectId() {
    return store.get(STORE_SELECTED_PROJECT_ID);
}

export function storeSelectedTask(task) {
    store.set(STORE_SELECTED_TASK, task);
}

export function getSelectedTask() {
    return store.get(STORE_SELECTED_TASK);
}