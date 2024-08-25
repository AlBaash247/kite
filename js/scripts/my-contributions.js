import { getUser } from "../constants/my-store.js";
import { API_KEY_CONTRIBUTOR_ID } from "../constants/api.js";
import { fetchContributions } from "../fetching/kite-contributors.js";


init();

function init() {
     const jsonRequestBody = {};
     jsonRequestBody[API_KEY_CONTRIBUTOR_ID] = getUser().id;
     fetchContributions(jsonRequestBody);
}