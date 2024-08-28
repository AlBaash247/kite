const modalContributorSelectContributorListItemTemplate = document.querySelector('#modalContributorSelectContributorListItemTemplate');
const modalContributorSelectContributorContainer = document.querySelector('#modalContributorSelectContributorContainer');

const modalContributorSelectContributor = document.getElementById('searchInput');
const modalContributorRowTemplate = document.getElementById('modalContributorRowTemplate');
const modalContributorSelectedItemsContainer = document.getElementById('modalContributorSelectedItemsContainer');

export function adapterUsersList(users) {
    users.forEach((user, index) => {
        createListItem(user, index);
    });
    enableContributorSearch();
}

function createListItem(user, index) {
    const clone = modalContributorSelectContributorListItemTemplate.content.cloneNode(true);

    const contributorItemLink = clone.querySelector('#contributorItemLink');
    contributorItemLink.dataset.id = user.id;
    contributorItemLink.innerText = user.name + " | " + user.email;

    contributorItemLink.onclick = function () {
        selectItem(this, user);
    }

    modalContributorSelectContributorContainer.appendChild(clone);
}

function enableContributorSearch() {
    modalContributorSelectContributor.addEventListener('keyup', function () {
        let filter = this.value.toUpperCase();

        let items = document.querySelectorAll('.dropdown-item');
        items.forEach(function (item) {
            if (item.textContent.toUpperCase().indexOf(filter) > -1) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

function selectItem(element, user) {
    const clone = modalContributorRowTemplate.content.cloneNode(true);

    const modalContributorRow = clone.getElementById('modalContributorRow');
    const modalContributorName = clone.getElementById('modalContributorName');
    const modalContributorEmail = clone.getElementById('modalContributorEmail');
    const modalContributorRemoveContributor = clone.getElementById('modalContributorRemoveContributor');

    modalContributorName.innerText = user.name;
    modalContributorEmail.innerText = user.email;

    modalContributorRemoveContributor.onclick = function () {
        //remove element from modalContributorSelectedItemsContainer
        modalContributorSelectedItemsContainer.removeChild(modalContributorRow);

        // move element back to modalContributorSelectContributorContainer & make it visible
        element.classList.remove('d-none');
        modalContributorSelectContributorContainer.append(element);
    }

    //move element to modalContributorSelectedItemsContainer and hide it!
    element.classList.add('d-none');
    modalContributorSelectedItemsContainer.appendChild(element);

    //add clone to modalContributorSelectedItemsContainer
    modalContributorSelectedItemsContainer.appendChild(clone);
}
