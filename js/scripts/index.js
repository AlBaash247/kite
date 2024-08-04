import { API_ERROR_MSG_ALL_FIELDS_MANDATORY, API_ERROR_MSG_WRONG_CREDENTIALS } from "../constants/api.js";
import { getUser, storeUser, fetchLogin } from "../handlers/auth.js";
import { fetchProjects } from "../handlers/kite-projects.js";

// Create a new instance of the modal
const myModal = new bootstrap.Modal(document.getElementById('loginModal'));
const tempContainer = document.querySelector('#tempContainer');
const contentContainer = document.querySelector('#contentContainer');

const btnLogin = document.querySelector('#btnLogin');
const btnRegister = document.querySelector('#btnRegister');

const modalInputEmail = document.querySelector('#modalInputEmail');
const modalInputPassword = document.querySelector('#modalInputPassword');

const modalInputError_email = document.querySelector('#modalInputError_email');
const modalInputError_password = document.querySelector('#modalInputPassword');
const modalInputError_credentials = document.querySelector('#modalInputError_credentials');

// Remove current user
storeUser(null);

let isAuthOK = getUser() != null;

init();

function init() {

    modalBtnLogin.onclick = function () { login(); }
    btnLogin.onclick = function () { displayLoginModal(); }

    toggleActiveContent();
}


function toggleActiveContent() {
    console.log('isAuthOk ', isAuthOK);

    if (isAuthOK) {
        tempContainer.classList.add('d-none');
        contentContainer.classList.remove('d-none');
        fetchProjects();
    } else {
        tempContainer.classList.remove('d-none');
        contentContainer.classList.add('d-none');
        displayLoginModal();
    }

}

function displayLoginModal() {
    myModal.show();
}

async function login() {
    modalInputError_email.innerText = "";
    modalInputError_password.innerText = "";
    modalInputError_credentials.innerText = "";

    const user = {};
    user.email = modalInputEmail.value;
    user.password = modalInputPassword.value;

    var loginResult = await fetchLogin(user);
    validateLoginResult(loginResult);
}

function validateLoginResult(loginResult) {

    if (loginResult.is_ok == false) {
        switch (loginResult.message) {
            case API_ERROR_MSG_ALL_FIELDS_MANDATORY: showMissFields(loginResult.error); break;
            case API_ERROR_MSG_WRONG_CREDENTIALS: modalInputError_credentials.innerText = loginResult.message; break;
        }
    }
    else {
        myModal.hide();
        isAuthOK = true;
        toggleActiveContent();
        console.log(loginResult);
    }


}

function showMissFields(error) {
    console.log('showMissFields');
    const keys = Object.keys(error);
    console.log(keys);

    keys.forEach(key => {
        console.log(key);
        var errorElement = document.querySelector(`#modalInputError_${key}`);
        errorElement.classList.remove('d-none');
        errorElement.innerText = error[key][0];
    });
}