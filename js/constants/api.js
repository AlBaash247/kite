
const localEnv = "http://127.0.0.1:8000";
const ServerEnv = "http://127.0.0.1:8000";

const selectedEnv = localEnv;

export const API_URL_LOGIN = `${selectedEnv}/api/kite/login`;
export const API_URL_REGISTER = `${selectedEnv}/api/kite/register`;
export const API_URL_PROJECTS = `${selectedEnv}/api/kite/projects/`;
export const API_URL_TASKS = `${selectedEnv}/api/kite/tasks`;

export const API_KEY_AUTHOR_ID = "author_id";
export const API_KEY_PROJECT_ID = "project_id";

export const API_KEY_STATUS_TODO = "todo";
export const API_KEY_STATUS_IN_PROGRESS = "in_progress";
export const API_KEY_STATUS_DONE = "done";

export const API_KEY_IMPORTANCE_IMPORTANT = "important";
export const API_KEY_IMPORTANCE_LOW_PRIORITY = "low_priority";
export const API_KEY_IMPORTANCE_NORMAL = "normal";
export const API_KEY_IMPORTANCE_URGENT = "urgent";

export const API_ERROR_MSG_VALIDATION_FAILED = "Validation failed";
export const API_ERROR_MSG_WRONG_CREDENTIALS = "wrong credentials";


export const HTTP_METHOD_GET_NO_CACHE = {
    method: 'GET', headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
}

export function HTTP_METHOD_POST_NO_CACHE(jsonRequestObj) {
    const httpObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        // your expected POST request payload goes here
        body: JSON.stringify(jsonRequestObj)
    };
    return httpObj;
}