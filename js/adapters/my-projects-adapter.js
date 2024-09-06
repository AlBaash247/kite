import { API_KEY_AUTHOR_ID, API_KEY_ID, API_KEY_PROJECT_NAME, } from "../constants/api.js";
import { fetchDeleteProject } from "../fetching/kite-projects.js";
const myProjectRowTemplate = document.querySelector('#myProjectRowTemplate');
const myProjectsRowContainer = document.querySelector('#myProjectsRowContainer');

export function adapterMyProjects(projects) {
    projects.forEach((project, index) => {
        createListItem(project, index);
    });
}

function createListItem(project, index) {

    const clone = myProjectRowTemplate.content.cloneNode(true);

    const myProjectIndex = clone.querySelector('#myProjectIndex');
    const myProjectName = clone.querySelector('#myProjectName');
    const myProjectBtnDeleteProject = clone.querySelector('#myProjectBtnDeleteProject');

    myProjectIndex.innerText = (index + 1);
    myProjectName.innerText = project[API_KEY_PROJECT_NAME];

    myProjectBtnDeleteProject.onclick = function () { deleteProject(project) }

    myProjectsRowContainer.appendChild(clone);
}


async function deleteProject(project) {
    const jsonRequestBody = {};
    jsonRequestBody[API_KEY_ID] = project[API_KEY_ID];
    jsonRequestBody[API_KEY_AUTHOR_ID] = project[API_KEY_AUTHOR_ID];
    jsonRequestBody[API_KEY_PROJECT_NAME] = project[API_KEY_PROJECT_NAME];

    var result = fetchDeleteProject(jsonRequestBody);
    validateResult(result);
}

function validateResult(result) {

    if (result.is_ok == false) {
        alert(result.message);
    }
    else {
        location.href = "../../pages/profile.html";
    }
}