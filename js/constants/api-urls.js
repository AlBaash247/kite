
const localEnv = "http://127.0.0.1:8000";
const ServerEnv = "http://127.0.0.1:8000";

const selectedEnv = localEnv;

export const API_URL_LOGIN = `${selectedEnv}/api/kite/login`;
export const API_URL_REGISTER = `${selectedEnv}/api/kite/register`;
export const API_URL_PROJECTS = `${selectedEnv}/api/kite/projects`;
export const API_URL_TASKS = `${selectedEnv}/api/kite/tasks`;