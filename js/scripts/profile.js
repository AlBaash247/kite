import { getUser } from "../constants/my-store.js";
import { API_KEY_AUTHOR_ID, API_KEY_CONTRIBUTOR_ID } from "../constants/api.js";
import { fetchContributors, fetchContributions } from "../fetching/kite-contributors.js";

const myContributorsBtnAddContributor = document.querySelector('#myContributorsBtnAddContributor');

init();

function init() {
    const author_id = {};
    author_id[API_KEY_AUTHOR_ID] = getUser().id;
    fetchContributors(author_id);

    const contributor_id = {};
    contributor_id[API_KEY_CONTRIBUTOR_ID] = getUser().id;
    fetchContributions(contributor_id);
}


