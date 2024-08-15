

const inputTitle = document.querySelector('#inputTitle');
const inputStatus = document.querySelector('#inputStatus');
const inputImportance = document.querySelector('#inputImportance');
const inputDueDate = document.querySelector('#inputDueDate');
const inputContent = document.querySelector('#inputDueDate');
const inputError_title = document.querySelector('#inputError_title');
const inputError_status = document.querySelector('#inputError_status');
const inputError_importance = document.querySelector('#inputError_importance');
const inputError_due_date = document.querySelector('#inputError_due_date');
const inputError_content = document.querySelector('#inputError_content');

const btnSaveExit = document.querySelector('#btnSaveExit');
const btnSave = document.querySelector('#btnSaveExit');


init();

function init() {
    setMinimumDueDate();
}

//set the minimum due date to today
function setMinimumDueDate() {
    const today = new Date().toISOString().split('T')[0];
    inputDueDate.setAttribute('min', today);
}

function initEditTaskScript() {
    const stepNavCurrentPage = document.querySelector('#stepNavCurrentPage');
    stepNavCurrentPage.innerHTML = 'Edit Task;';
    init();
}



