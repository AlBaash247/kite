import { getUser } from "../constants/my-store.js";
import { API_KEY_AUTHOR_ID, API_KEY_CONTRIBUTOR_ID, API_KEY_USER_ID } from "../constants/api.js";
import { fetchContributors, fetchContributions, fetchUsersList } from "../fetching/kite-contributors.js";

// Create a new instance of the modal
export const modalContributor = new bootstrap.Modal(document.getElementById('modalContributor'));

const myContributorsBtnAddContributor = document.querySelector('#myContributorsBtnAddContributor');


init();

function init() {
    myContributorsBtnAddContributor.onclick = function () { modalContributor.show(); }


    const author_id = {};
    author_id[API_KEY_AUTHOR_ID] = getUser().id;
    fetchContributors(author_id);

    const contributor_id = {};
    contributor_id[API_KEY_CONTRIBUTOR_ID] = getUser().id;
    fetchContributions(contributor_id);

    const user_id = {};
    user_id[API_KEY_USER_ID] = getUser().id;
    fetchUsersList(contributor_id);


}



