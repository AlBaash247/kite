import { getUser, getSelectedProjectId } from '../constants/my-store.js';
import {
    API_KEY_AUTHOR_ID, API_KEY_PROJECT_ID, API_KEY_TITLE,
    API_KEY_STATUS, API_KEY_IMPORTANCE, API_KEY_DUE_DATE,
    API_KEY_CONTENT, API_ERROR_MSG_VALIDATION_FAILED, API_ERROR_MSG_WRONG_CREDENTIALS
} from "../constants/api.js";
import { fetchAddTask } from "../handlers/kite-tasks.js";

let shouldExit = false;

const inputTitle = document.querySelector('#inputTitle');
const inputStatus = document.querySelector('#inputStatus');
const inputImportance = document.querySelector('#inputImportance');
const inputDueDate = document.querySelector('#inputDueDate');
const inputContent = document.querySelector('#inputContent');
const inputError_title = document.querySelector('#inputError_title');
const inputError_status = document.querySelector('#inputError_status');
const inputError_importance = document.querySelector('#inputError_importance');
const inputError_due_date = document.querySelector('#inputError_due_date');
const inputError_content = document.querySelector('#inputError_content');
const formError = document.querySelector('#formError');

const btnSaveExit = document.querySelector('#btnSaveExit');
const btnSave = document.querySelector('#btnSave');


init();

function init() {
    setMinimumDueDate();
    btnSaveExit.onclick = function () { shouldExit = true; addNewTask(); };
    btnSave.onclick = function () { shouldExit = false; addNewTask(); };
}

//set the minimum due date to today
function setMinimumDueDate() {
    const today = new Date().toISOString().split('T')[0];
    inputDueDate.setAttribute('min', today);
}


async function addNewTask() {

    inputError_title.innerText = '';
    inputError_status.innerText = '';
    inputError_importance.innerText = '';
    inputError_due_date.innerText = '';
    inputError_content.innerText = '';

    const task = {};
    task[API_KEY_AUTHOR_ID] = getUser().id;
    task[API_KEY_PROJECT_ID] = getSelectedProjectId();
    task[API_KEY_TITLE] = inputTitle.value;
    task[API_KEY_STATUS] = inputStatus.value;
    task[API_KEY_IMPORTANCE] = inputImportance.value;
    task[API_KEY_DUE_DATE] = dateStringToEpoch(inputDueDate.value);
    task[API_KEY_CONTENT] = inputContent.value;

    console.log(task);

    var addTaskResult = await fetchAddTask(task);
    validateResult(addTaskResult);
}

function validateResult(result) {

    if (result.is_ok == false) {
        switch (result.message) {
            case API_ERROR_MSG_VALIDATION_FAILED: showMissFields(result.error); break;
            case API_ERROR_MSG_WRONG_CREDENTIALS: formError.innerText = result.message; break;
        }
    }
    else {
        console.log(result.message);

        if (shouldExit) {
            window.location.href = '../index.html';
        }
    }
}

function showMissFields(error) {
    console.log('showMissFields');
    const keys = Object.keys(error);
    console.log(keys);

    keys.forEach(key => {
        console.log(key);
        var errorElement = document.querySelector(`#InputError_${key}`);
        console.log(errorElement.id);

        errorElement.classList.remove('d-none');
        errorElement.innerText = error[key][0];
    });
}

function dateStringToEpoch(dateString) {
    const date = new Date(dateString);
    return Math.floor(date.getTime() / 1000);//epochTimeInSeconds
}