import { API_ERROR_MSG_ALL_FIELDS_MANDATORY, API_ERROR_MSG_WRONG_CREDENTIALS } from "../constants/api.js";
import { getUser, fetchLogin } from "../handlers/auth.js";
import { loginModal, displayLoginModal } from "./index.js";

const btnLogin = document.querySelector('#btnLogin');

const modalInputEmail = document.querySelector('#modalInputEmail');
const modalInputPassword = document.querySelector('#modalInputPassword');
const modalInputError_email = document.querySelector('#modalInputError_email');
const modalInputError_password = document.querySelector('#modalInputPassword');
const modalInputError_credentials = document.querySelector('#modalInputError_credentials');
const modalBtnLogin = document.querySelector('#modalBtnLogin');
const modalBtnRegister = document.querySelector('#modalBtnRegister');
const settingsBtnLogin = document.querySelector('#settingsBtnLogin');

export function initLoginScript() {

    modalBtnLogin.onclick = function () { loginScript(); }
    btnLogin.onclick = function () { displayLoginModal(); }
    settingsBtnLogin.onclick = function () { displayLoginModal(); }

    btnRegister.onclick = function () { displayRegisterModal(); }
    modalBtnRegister.onclick = function () { displayRegisterModal(); }
    settingsBtnRegister.onclick = function () { displayRegisterModal(); }
}

export function isAuthOK() { return getUser() != null; }

async function loginScript() {
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
        var errorElement = document.querySelector(`#modalInputError_${key}`);
        errorElement.classList.remove('d-none');
        errorElement.innerText = error[key][0];
    });
}