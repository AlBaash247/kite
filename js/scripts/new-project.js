import { getUser } from "../constants/my-store.js";
import {
    API_KEY_AUTHOR_ID, API_KEY_PROJECT_NAME,
    API_ERROR_MSG_VALIDATION_FAILED, API_ERROR_MSG_WRONG_CREDENTIALS
} from "../constants/api.js";
import { fetchStoreProject } from "../handlers/kite-projects.js";


const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
const modalProjectBtnCreate = document.querySelector('#modalProjectBtnCreate');

const modalProjectInputProjectName = document.querySelector('#modalProjectInputProjectName');
const modalProjectInputError_project_name = document.querySelector('#modalProjectInputError_project_name');
const modalProjectFormError = document.querySelector('#modalProjectFormError');


export function initProjectScript() {
    modalProjectBtnCreate.onclick = function () { projectScript(); }
}

async function projectScript() {
    modalProjectInputError_project_name.innerText = "";
    modalProjectFormError.innerText = "";


    const project = {};
    project[API_KEY_AUTHOR_ID] = getUser().id;
    project[API_KEY_PROJECT_NAME] = modalProjectInputProjectName.value;
    console.log(project);

    var result = await fetchStoreProject(project);
    validateResult(result);
}

function validateResult(result) {

    if (result.is_ok == false) {
        switch (result.message) {
            case API_ERROR_MSG_VALIDATION_FAILED: showMissFields(result.error); break;
            case API_ERROR_MSG_WRONG_CREDENTIALS: formError.innerText = result.message; break;
        }
    }
    else {
        window.location.href = '../index.html';
    }
}

function showMissFields(error) {
    console.log('showMissFields');
    const keys = Object.keys(error);
    console.log(keys);

    keys.forEach(key => {
        console.log(key);
        var errorElement = document.querySelector(`#modalLoginInputError_${key}`);
        console.log(errorElement.id);

        errorElement.classList.remove('d-none');
        errorElement.innerText = error[key][0];
    });
}


export function displayProjectModal() {
    projectModal.show();
}