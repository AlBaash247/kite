
const localEnv = "http://127.0.0.1:8000";
const serverEnv = "https://albaash247.com";

const selectedEnv = serverEnv;

export const API_URL_LOGIN = `${selectedEnv}/api/kite/login`;
export const API_URL_REGISTER = `${selectedEnv}/api/kite/register`;

export const API_URL_STORE_PROJECT = `${selectedEnv}/api/kite/projects/store`;
export const API_URL_GET_PROJECTS = `${selectedEnv}/api/kite/projects`;
export const API_URL_UPDATE_PROJECT = `${selectedEnv}/api/kite/projects/update`;
export const API_URL_DELETE_PROJECT = `${selectedEnv}/api/kite/projects/delete`;
export const API_URL_GET_CONTRIBUTORS = `${selectedEnv}/api/kite/projects/contributors`;
export const API_URL_GET_CONTRIBUTIONS = `${selectedEnv}/api/kite/projects/contribution`;
export const API_URL_STORE_CONTRIBUTOR = `${selectedEnv}/api/kite/projects/store_contributor`;
export const API_URL_REMOVE_CONTRIBUTOR = `${selectedEnv}/api/kite/projects/remove_contributor`;
export const API_URL_EXIT_PROJECT = `${selectedEnv}/api/kite/projects/exit_project`;
export const API_URL_USERS_LIST = `${selectedEnv}/api/kite/projects/users_list`;
export const API_URL_GET_MY_PROJECTS = `${selectedEnv}/api/kite/projects/my_projects`;

export const API_URL_GET_TASKS = `${selectedEnv}/api/kite/tasks`;
export const API_URL_STORE_TASK = `${selectedEnv}/api/kite/tasks/store`;
export const API_URL_UPDATE_TASK = `${selectedEnv}/api/kite/tasks/update`;

export const API_URL_GET_COMMENTS = `${selectedEnv}/api/kite/comments`;
export const API_URL_STORE_COMMENT = `${selectedEnv}/api/kite/comments/store`;
export const API_URL_UPDATE_COMMENT = `${selectedEnv}/api/kite/comments/update`;


export const API_KEY_ID = "id";
export const API_KEY_NAME = "name";
export const API_KEY_EMAIL = "email";
export const API_KEY_AUTHOR_ID = "author_id";
export const API_KEY_AUTHOR_NAME = "author_name";
export const API_KEY_PROJECT_ID = "project_id";
export const API_KEY_TASK_ID = "task_id";

export const API_KEY_STATUS_TODO = "todo";
export const API_KEY_STATUS_IN_PROGRESS = "in_progress";
export const API_KEY_STATUS_DONE = "done";

export const API_KEY_IMPORTANCE_LOW_PRIORITY = "low_priority";
export const API_KEY_IMPORTANCE_NORMAL = "normal";
export const API_KEY_IMPORTANCE_IMPORTANT = "important";
export const API_KEY_IMPORTANCE_URGENT = "urgent";

export const API_KEY_TITLE = "title";
export const API_KEY_STATUS = "status";
export const API_KEY_IMPORTANCE = "importance";
export const API_KEY_DUE_DATE = "due_date";
export const API_KEY_CONTENT = "content";

export const API_KEY_COMMENT = "comment";

export const API_KEY_PROJECT_NAME = "project_name";
export const API_KEY_CONTRIBUTOR_ID = "contributor_id";
export const API_KEY_CONTRIBUTOR_NAME = "contributor_name";
export const API_KEY_CONTRIBUTOR_EMAIL = "contributor_email";
export const API_KEY_CONTRIBUTORS = "contributors";

export const API_RESULT_IS_OK = "is_ok";
export const API_RESULT_MESSAGE = "message";

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