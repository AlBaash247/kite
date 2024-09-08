import { getUser, getSelectedProject } from "../constants/my-store.js";
import { fetchUpdateProject } from "../fetching/kite-projects.js";
import { API_KEY_AUTHOR_ID, API_KEY_CONTRIBUTOR_ID, API_KEY_PROJECT_NAME } from "../constants/api.js";
import { fetchContributors, fetchContributions, fetchUsersList, fetchMyProjects } from "../fetching/kite-contributors.js";

// Create a new instance of the modal
export const modalContributor = new bootstrap.Modal(document.getElementById('modalContributor'));

const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));

const modalProjectInputProjectName = document.querySelector('#modalProjectInputProjectName');
const modalProjectInputError_project_name = document.querySelector('#modalProjectInputError_project_name');
const modalProjectFormError = document.querySelector('#modalProjectFormError');
const modalProjectBtnCreate = document.querySelector('#modalProjectBtnCreate');

const myContributorsBtnAddContributor = document.querySelector('#myContributorsBtnAddContributor');



init();

function init() {
    myContributorsBtnAddContributor.onclick = function () { modalContributor.show(); }
    modalProjectBtnCreate.onclick = function () { updateProject(); }

    const author_id = {};
    author_id[API_KEY_AUTHOR_ID] = getUser().id;
    fetchContributors(author_id);

    const contributor_id = {};
    contributor_id[API_KEY_CONTRIBUTOR_ID] = getUser().id;
    fetchContributions(contributor_id);

    const user_id = {};
    user_id[API_KEY_AUTHOR_ID] = getUser().id;
    fetchUsersList(user_id);

    fetchMyProjects(user_id);

    displayModalContributorWithSelectedProject();
}



function displayModalContributorWithSelectedProject() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('project_id') != null) {
        modalContributor.show();
    }
}


async function updateProject() {
    modalProjectInputError_project_name.innerText = "";
    modalProjectFormError.innerText = "";

    const project = getSelectedProject();
    project[API_KEY_PROJECT_NAME] = modalProjectInputProjectName.value;

    var result = await fetchUpdateProject(project);
    validateResult(result);
}


export function displayProjectModal() {
    modalProjectInputProjectName.value = getSelectedProject()[API_KEY_PROJECT_NAME];
    projectModal.show();
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
