import { getUser } from "../constants/my-store.js";
import { API_KEY_ID, API_KEY_AUTHOR_ID, API_KEY_CONTRIBUTOR_ID, API_KEY_PROJECT_ID, } from "../constants/api.js";
import { fetchExitProject } from "../fetching/kite-contributors.js";

const myContributionsTemplate = document.querySelector('#myContributionsTemplate');
const myContributionsRowContainer = document.querySelector('#myContributionsRowContainer');

export function adapterContribution(projects) {
    projects.forEach((project, index) => {
        createListItem(project, index);
    });
}

function createListItem(project, index) {

    const clone = myContributionsTemplate.content.cloneNode(true);

    const myContributionsProjectIndex = clone.querySelector('#myContributionsProjectIndex');
    const myContributionsProjectAuthor = clone.querySelector('#myContributionsProjectAuthor');
    const myContributionsProjectName = clone.querySelector('#myContributionsProjectName');
    const myContributionsProjectBtnExitProject = clone.querySelector('#myContributionsProjectBtnExitProject');

    myContributionsProjectIndex.innerText = (index + 1);
    myContributionsProjectAuthor.innerText = project.author_name;
    myContributionsProjectName.innerText = project.project_name;

    myContributionsProjectBtnExitProject.onclick = function () { exitProject(project) }

    myContributionsRowContainer.appendChild(clone);
}


async function exitProject(project) {
    const jsonRequestBody = {};
    jsonRequestBody[API_KEY_ID] = project[API_KEY_ID];
    jsonRequestBody[API_KEY_AUTHOR_ID] = project[API_KEY_AUTHOR_ID];
    jsonRequestBody[API_KEY_CONTRIBUTOR_ID] = project[API_KEY_CONTRIBUTOR_ID];
    jsonRequestBody[API_KEY_PROJECT_ID] = project[API_KEY_PROJECT_ID];

    var result = await fetchExitProject(jsonRequestBody);
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
