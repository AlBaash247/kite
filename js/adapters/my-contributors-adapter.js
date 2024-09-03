import { API_KEY_ID, API_KEY_AUTHOR_ID, API_KEY_CONTRIBUTOR_ID, API_KEY_PROJECT_ID } from "../constants/api.js";
import { fetchRemoveContributor } from "../fetching/kite-contributors.js";

const myContributorsTemplate = document.querySelector('#myContributorsTemplate');
const myContributorsRowContainer = document.querySelector('#myContributorsRowContainer');

export function adapterContributors(projects) {
    projects.forEach((project, index) => {
        createListItem(project, index);
    });
}

function createListItem(project, index) {

    const clone = myContributorsTemplate.content.cloneNode(true);

    const myContributorsIndex = clone.querySelector('#myContributorsIndex');
    const myContributorsProjectName = clone.querySelector('#myContributorsProjectName');
    const myContributorsName = clone.querySelector('#myContributorsName');
    const myContributionsEmail = clone.querySelector('#myContributionsEmail');
    const myContributorsBtnRemoveContributor = clone.querySelector('#myContributorsBtnRemoveContributor');

    myContributorsIndex.innerText = (index + 1);
    myContributorsProjectName.innerText = project.project_name;
    myContributorsName.innerText = project.contributor_name;
    myContributionsEmail.innerText = project.contributor_email;

    myContributorsBtnRemoveContributor.onclick = function () { removeContributor(project); }

    myContributorsRowContainer.appendChild(clone);

}

async function removeContributor(project) {
    const jsonRequestBody = {};
    jsonRequestBody[API_KEY_ID] = project.id;
    jsonRequestBody[API_KEY_AUTHOR_ID] = project.author_id;
    jsonRequestBody[API_KEY_CONTRIBUTOR_ID] = project.contributor_id;
    jsonRequestBody[API_KEY_PROJECT_ID] = project.project_id;

    var result = await fetchRemoveContributor(jsonRequestBody);
    validateResult(result);
}

function validateResult(result) {

    if (result.is_ok == false) {
        alert(result.message);
    }
    else {
        console.log(result.message);
        location.href = "../../pages/profile.html";
    }
}
