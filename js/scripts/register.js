import { isAuthOK, fetchRegister } from "../fetching/kite-auth.js";
import { API_ERROR_MSG_VALIDATION_FAILED, API_ERROR_MSG_WRONG_CREDENTIALS } from "../constants/api.js";
import { registerModal, displayLoginModal, displayRegisterModal, toggleActiveContent } from "./index.js";

const btnRegister = document.querySelector('#btnRegister');
const modalRegisterInputName = document.querySelector('#modalRegisterInputName');
const modalRegisterInputEmail = document.querySelector('#modalRegisterInputEmail');
const modalRegisterInputPassword = document.querySelector('#modalRegisterInputPassword');
const modalRegisterInputError_name = document.querySelector('#modalRegisterInputError_name');
const modalRegisterInputError_email = document.querySelector('#modalRegisterInputError_email');
const modalRegisterInputError_password = document.querySelector('#modalRegisterInputError_password');
const modalRegisterFormError = document.querySelector('#modalRegisterFormError');
const modalRegisterBtnLogin = document.querySelector('#modalRegisterBtnLogin');
const modalRegisterBtnRegister = document.querySelector('#modalRegisterBtnRegister');

const settingsBtnRegister = document.querySelector('#settingsBtnRegister');

export function initRegisterScript() {
    btnRegister.onclick = function () { displayRegisterModal(); }
    settingsBtnRegister.onclick = function () { displayRegisterModal(); }
    modalRegisterBtnLogin.onclick = function () { displayLoginModal(); }

    modalRegisterBtnRegister.onclick = function () { registerScript(); }
}

async function registerScript() {
    modalRegisterInputError_name.innerText = "";
    modalRegisterInputError_email.innerText = "";
    modalRegisterInputError_password.innerText = "";
    modalRegisterFormError.innerText = "";

    const user = {};
    user.name = modalRegisterInputName.value;
    user.email = modalRegisterInputEmail.value;
    user.password = modalRegisterInputPassword.value;

    var registerResult = await fetchRegister(user);
    validateRegisterResult(registerResult);
}

function validateRegisterResult(registerResult) {
    console.log(registerResult);

    if (registerResult.is_ok == false) {
        switch (registerResult.message) {
            case API_ERROR_MSG_VALIDATION_FAILED: showMissFields(registerResult.error); break;
            case API_ERROR_MSG_WRONG_CREDENTIALS: modalRegisterFormError.innerText = registerResult.message; break;
        }
    }
    else {
        registerModal.hide();
        isAuthOK();
        toggleActiveContent();
        console.log(registerResult);
    }
}

function showMissFields(error) {
    console.log('showMissFields');
    const keys = Object.keys(error);
    console.log(keys);

    keys.forEach(key => {
        console.log(key);
        var errorElement = document.querySelector(`#modalRegisterInputError_${key}`);
        errorElement.classList.remove('d-none');
        errorElement.innerText = error[key][0];
    });
}