const creditRowTemplate = document.querySelector('#creditRowTemplate');
const contentContainer = document.querySelector('#contentContainer');

export function adapter(credits) {

    console.log(credits);

    credits.forEach((credit, index) => {
        createListItem(credit, index);
    });
}

function createListItem(credit, index) {
    const clone = creditRowTemplate.content.cloneNode(true);

    const itemIndex = clone.querySelector('#itemIndex');
    const itemName = clone.querySelector('#itemName');
    const itemLink = clone.querySelector('#itemLink');

    itemIndex.innerText = index + 1;
    itemName.innerText = credit.item_name;
    itemLink.innerText = credit.link_label;
    itemLink.href = credit.link;

    contentContainer.appendChild(clone);

}