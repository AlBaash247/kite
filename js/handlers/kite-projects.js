import { API_URL_PROJECTS } from "../constants/api-urls.js";
import { adapter } from "../adapters/tasks-adapter.js";
import { getUser, storeUser, fetchLogin } from "./auth.js";

// Create a new instance of the modal
const myModal = new bootstrap.Modal(document.getElementById('loginModal'));
const tempContainer = document.querySelector('#tempContainer');
const contentContainer = document.querySelector('#contentContainer');

const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.querySelector('#btnRegister');

const modalInputEmail = document.querySelector('#modalInputEmail');
const modalInputPassword = document.querySelector('#modalInputPassword');


// Remove current user
// storeUser(null);

const isAuthOK = getUser() != null;


init();

function init() {

    modalBtnLogin.onclick = function () { login(); }

    toggleActiveContent();

    if (isAuthOK) {
        fetchData();
    }
    else {
        btnLogin.onclick = function () { displayLoginModal(); }
        displayLoginModal();
    }
}


function toggleActiveContent() {

    if (isAuthOK) {
        tempContainer.classList.add('d-none');
        contentContainer.classList.remove('d-none');
    } else {
        tempContainer.classList.remove('d-none');
        contentContainer.classList.add('d-none');
    }

}

async function fetchData() {
    try {
        const response = await fetch(API_URL_PROJECTS);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        adapter(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayLoginModal() {
    myModal.show();
}

function login() {
    const user = {};
    user.email = modalInputEmail.value;
    user.password = modalInputPassword.value;
    fetchLogin(user);
}





