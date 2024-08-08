
const localEnv = "http://127.0.0.1:8000";
const ServerEnv = "http://127.0.0.1:8000";

const selectedEnv = localEnv;

export const API_URL_LOGIN = `${selectedEnv}/api/kite/login`;
export const API_URL_REGISTER = `${selectedEnv}/api/kite/register`;
export const API_URL_PROJECTS = `${selectedEnv}/api/kite/projects/`;
export const API_URL_TASKS = `${selectedEnv}/api/kite/tasks`;

export const API_KEY_AUTHOR_ID = "author_id";
export const API_KEY_PROJECT_ID = "project_id";

export const API_ERROR_MSG_ALL_FIELDS_MANDATORY = "All fields are mandatory.";
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