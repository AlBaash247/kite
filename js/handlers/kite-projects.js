import { API_URL_PROJECTS } from "../constants/api-urls.js";
import { adapter } from "../adapters/tasks-adapter.js";
import { getUser } from "./auth.js";

// const myModal = new bootstrap.Modal(document.getElementById('loginModal'));
const tempContainer = document.querySelector('#tempContainer');
const contentContainer = document.querySelector('#contentContainer');
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.querySelector('#btnRegister');
const isAuthOK = getUser() != null;

btnLogin.onclick = function () {
    alert('Button was clicked!');
};

init();

function init() {


    // toggleActiveContent();

    // if (isAuthOK) {
    //     displayLoginModal();
    // }
    // else {
    //     fetchData();
    // }
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
    // Create a new instance of the modal
    // myModal.show();
}





