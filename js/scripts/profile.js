import { getUser } from "../constants/my-store.js";
import { API_KEY_AUTHOR_ID, API_KEY_CONTRIBUTOR_ID } from "../constants/api.js";
import { fetchContributors, fetchContributions } from "../fetching/kite-contributors.js";

// Create a new instance of the modal
export const modalContributor = new bootstrap.Modal(document.getElementById('modalContributor'));

const myContributorsBtnAddContributor = document.querySelector('#myContributorsBtnAddContributor');

const modalContributorSelectContributor = document.getElementById('searchInput');



init();

function init() {
    myContributorsBtnAddContributor.onclick = function () { modalContributor.show(); }


    const author_id = {};
    author_id[API_KEY_AUTHOR_ID] = getUser().id;
    fetchContributors(author_id);

    const contributor_id = {};
    contributor_id[API_KEY_CONTRIBUTOR_ID] = getUser().id;
    fetchContributions(contributor_id);
}


modalContributorSelectContributor.addEventListener('keyup', function() {
    let filter = this.value.toUpperCase();
    let items = document.querySelectorAll('.dropdown-item');
    items.forEach(function(item) {
        if (item.textContent.toUpperCase().indexOf(filter) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});




function selectItem(element) {
    document.getElementById('selectedItem').textContent = 'Selected: ' + element.textContent;
}
