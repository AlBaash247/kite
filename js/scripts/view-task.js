import { getUser, getSelectedTask } from '../constants/my-store.js';
import {
    API_KEY_TITLE, API_KEY_STATUS, API_KEY_IMPORTANCE, API_KEY_DUE_DATE,
    API_KEY_CONTENT, API_ERROR_MSG_VALIDATION_FAILED, API_ERROR_MSG_WRONG_CREDENTIALS,
    API_KEY_AUTHOR_ID, API_KEY_TASK_ID, API_KEY_COMMENT
} from "../constants/api.js";
import { fetchComments, fetchStoreComment } from "../handlers/kite-comments.js";


let shouldExit = false;

const inputTitle = document.querySelector('#inputTitle');
const inputStatus = document.querySelector('#inputStatus');
const inputImportance = document.querySelector('#inputImportance');
const inputDueDate = document.querySelector('#inputDueDate');
const inputContent = document.querySelector('#inputContent');

const inputComment = document.querySelector('#inputComment');
const inputError_comment = document.querySelector('#inputError_comment');

const btnSaveExit = document.querySelector('#btnSaveExit');
const btnSave = document.querySelector('#btnSave');
const btnScroll = document.getElementById("btnScroll");


init();

function init() {
    const selectedTask = getSelectedTask();

    inputTitle.value = selectedTask.title;
    inputStatus.value = selectedTask.status;
    inputImportance.value = selectedTask.importance;
    inputDueDate.value = selectedTask.due_date;
    inputContent.innerHTML = selectedTask.content;

    btnSaveExit.onclick = function () { shouldExit = true; addComment(); };
    btnSave.onclick = function () { shouldExit = false; addComment(); };
    btnScroll.onclick = function () { topFunction(); };

    const selectedTaskId = {};
    selectedTaskId[API_KEY_TASK_ID] = getSelectedTask().id;
    fetchComments(selectedTaskId);

}


async function addComment() {

    inputError_comment.innerText = '';

    const newComment = {};
    newComment[API_KEY_AUTHOR_ID] = getUser().id;
    newComment[API_KEY_TASK_ID] = getSelectedTask().id;
    newComment[API_KEY_COMMENT] = inputComment.value;

    var storeComment = await fetchStoreComment(newComment);
    validateResult(storeComment);
}

function validateResult(result) {

    if (result.is_ok == false) {
        switch (result.message) {
            case API_ERROR_MSG_VALIDATION_FAILED: showMissFields(result.error); break;
            case API_ERROR_MSG_WRONG_CREDENTIALS: formError.innerText = result.message; break;
        }
    }
    else {
        if (shouldExit) {
            window.location.href = '../index.html';
        } else {
            // Set the hash to the section ID
            window.location.hash = "comments-section";
            window.location.reload();
        }
    }
}

function showMissFields(error) {
    console.log('showMissFields');
    const keys = Object.keys(error);

    keys.forEach(key => {
        console.log(`inputError_${key}`);
        var errorElement = document.querySelector(`#inputError_${key}`);

        errorElement.classList.remove('d-none');
        errorElement.innerText = error[key][0];
    });
}


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnScroll.style.display = "block";
    } else {
        btnScroll.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
