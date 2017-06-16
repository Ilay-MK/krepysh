"use strict";

$(function() {
    if (getPageSize()[2] < 768) {
        navbarCollapseLinkClick("#lava .lava__link", "#menu_main");
    }
});
