import { getUser, getSelectedTask, getSelectedComment } from '../constants/my-store.js';
import {
    API_ERROR_MSG_VALIDATION_FAILED, API_ERROR_MSG_WRONG_CREDENTIALS,
    API_KEY_AUTHOR_ID, API_KEY_TASK_ID, API_KEY_COMMENT,
} from "../constants/api.js";
import { fetchComments, fetchStoreComment, fetchUpdateComment } from "../fetching/kite-comments.js";


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


// Create a new instance of the modal
const editCommentModal = new bootstrap.Modal(document.getElementById('editCommentModal'));
const modalEditCommentInputComment = document.querySelector('#modalEditCommentInputComment');
const modalEditCommentInputError_comment = document.querySelector('#modalEditCommentInputError_comment');
const modalEditCommentFormError = document.querySelector('#modalEditCommentFormError');
const modalEditCommentBtnUpdate = document.querySelector('#modalEditCommentBtnUpdate');

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

    modalEditCommentBtnUpdate.onclick = function () { updateCommentScript(); };

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


export function displayEditCommentModal() {
    modalEditCommentInputError_comment.innerText = '';
    modalEditCommentFormError.innerText = '';
    modalEditCommentInputComment.innerHTML = getSelectedComment().comment;

    editCommentModal.show();
}


function updateCommentScript() {
    const commentObject = getSelectedComment();
    commentObject[API_KEY_COMMENT] = modalEditCommentInputComment.value;

    const result = fetchUpdateComment(commentObject);
    validateResult(result);
}


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
