import { isAuthOK, fetchLogin } from "../fetchingkite-auth.js";
import { API_ERROR_MSG_VALIDATION_FAILED, API_ERROR_MSG_WRONG_CREDENTIALS } from "../constants/api.js";
import { loginModal, displayLoginModal, displayRegisterModal, toggleActiveContent } from "./index.js";

const btnLogin = document.querySelector('#btnLogin');

const modalLoginInputEmail = document.querySelector('#modalLoginInputEmail');
const modalLoginInputPassword = document.querySelector('#modalLoginInputPassword');
const modalLoginInputError_email = document.querySelector('#modalLoginInputError_email');
const modalLoginInputError_password = document.querySelector('#modalLoginInputPassword');
const modalLoginFormError = document.querySelector('#modalLoginFormError');
const modalLoginBtnLogin = document.querySelector('#modalLoginBtnLogin');
const modalLoginBtnRegister = document.querySelector('#modalLoginBtnRegister');

export function initLoginScript() {

    modalLoginBtnLogin.onclick = function () { loginScript(); }
    btnLogin.onclick = function () { displayLoginModal(); }
    settingsBtnLogin.onclick = function () { displayLoginModal(); }

    modalLoginBtnRegister.onclick = function () { displayRegisterModal(); }
}

async function loginScript() {
    modalLoginInputError_email.innerText = "";
    modalLoginInputError_password.innerText = "";
    modalLoginFormError.innerText = "";

    const user = {};
    user.email = modalLoginInputEmail.value;
    user.password = modalLoginInputPassword.value;

    var loginResult = await fetchLogin(user);
    validateLoginResult(loginResult);
}

function validateLoginResult(loginResult) {

    if (loginResult.is_ok == false) {
        switch (loginResult.message) {
            case API_ERROR_MSG_VALIDATION_FAILED: showMissFields(loginResult.error); break;
            case API_ERROR_MSG_WRONG_CREDENTIALS: modalLoginFormError.innerText = loginResult.message; break;
        }
    }
    else {
        loginModal.hide();
        isAuthOK();
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
        var errorElement = document.querySelector(`#modalLoginInputError_${key}`);
        errorElement.classList.remove('d-none');
        errorElement.innerText = error[key][0];
    });
}