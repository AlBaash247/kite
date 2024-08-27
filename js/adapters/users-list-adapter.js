
const modalContributorSelectContributorListItemTemplate = document.querySelector('#modalContributorSelectContributorListItemTemplate');
const modalContributorSelectContributorContainer = document.querySelector('#modalContributorSelectContributorContainer');

const modalContributorSelectContributor = document.getElementById('searchInput');
const modalContributorSelectedItem =  document.getElementById('modalContributorSelectedItem')

export function adapterUsersList(users) {
    users.forEach((user, index) => {
        createListItem(user, index);
    });
}

function createListItem(user, index) {
    const clone = modalContributorSelectContributorListItemTemplate.content.cloneNode(true);

    const contributorItemLink = clone.querySelector('#contributorItemLink');
   
    contributorItemLink.dataset.id = user.id;
    contributorItemLink.innerText = user.name +" | "+user.email;
   

    contributorItemLink.onclick = function () {
        selectItem(this);
    }

    modalContributorSelectContributorContainer.appendChild(clone);
}


modalContributorSelectContributor.addEventListener('keyup', function() {
    let filter = this.value.toUpperCase();
    let items = document.querySelectorAll('.dropdown-item');
    items.forEach(function(item) {
        if (item.textContent.toUpperCase().indexOf(filter) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});


function selectItem(element) {
    modalContributorSelectedItem.append(element); ;
}
