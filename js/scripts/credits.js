import { adapter } from "../adapters/credits-adapter.js";

const creditList = [

    {
        item_name: "Bootstrap",
        link_label: "getbootstrap.com",
        link: "https://getbootstrap.com/"
    },
    {
        item_name: "Side Bar | Display list of project for the user",
        link_label: "bbbootstrap.com",
        link: "https://bbbootstrap.com/snippets/bootstrap-5-menu-only-sidebar-42538365"
    },
    {
        item_name: "store | js library used to store data locally",
        link_label: "jsdelivr.com/store",
        link: "https://www.jsdelivr.com/package/npm/store"
    },

];

adapter(creditList);


