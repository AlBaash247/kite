import { getUser } from "../constants/my-store.js";
import { API_KEY_AUTHOR_ID } from "../constants/api.js";
import { fetchContributors } from "../fetching/kite-contributors.js";


init();

function init() {
     const jsonRequestBody = {};
     jsonRequestBody[API_KEY_AUTHOR_ID] = getUser().id;
     fetchContributors(jsonRequestBody);
}