import { signOut } from "../handlers/auth.js";
import { fetchProjects } from "../handlers/kite-projects.js";
import { initLoginScript, isAuthOK, } from './login.js';
import { initRegisterScript } from './register.js';


// Create a new instance of the modal
export const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
export const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

const tempContainer = document.querySelector('#tempContainer');
const mainContainer = document.querySelector('#mainContainer');
const dropdownSettings = document.querySelector('#dropdownSettings');
const dropdownSettingsAuth = document.querySelector('#dropdownSettingsAuth');

const settingsBtnSignOut = document.querySelector('#settingsBtnSignOut');


init();

function init() {
    settingsBtnSignOut.onclick = function () { logoutScript(); }
    initLoginScript();
    initRegisterScript();
    toggleActiveContent();
}

export function toggleActiveContent() {
    console.log('isAuthOk ', isAuthOK());

    if (isAuthOK()) {
        tempContainer.classList.add('d-none');
        mainContainer.classList.remove('d-none');

        dropdownSettings.classList.add('d-none');
        dropdownSettingsAuth.classList.remove('d-none');

        fetchProjects();
    } else {
        tempContainer.classList.remove('d-none');
        mainContainer.classList.add('d-none');

        dropdownSettings.classList.remove('d-none');
        dropdownSettingsAuth.classList.add('d-none');
        displayLoginModal();
    }

}

export function displayLoginModal() {
    loginModal.show();
}

export function displayRegisterModal() {
    registerModal.show();
}

function logoutScript() {
    signOut();
    toggleActiveContent();
}