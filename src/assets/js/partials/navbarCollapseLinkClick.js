"use strict";

/// @name: -=[ navbarCollapseLinkClick ]=-.
/// @description: сворачиваем меню при клике по пункту меню.
/// @require: jQuery 1.7+.
/// @require: Bootstrap 3.x.
/// @access: public.
/// @type: function.
/// @prop: target {string} - объект, событие клика которого биндится.
/// @prop: menu {string} - объект (меню), к которому применяется колапс.
/// @return: none.

var navbarCollapseLinkClick = function (target, menu) {
    /// Событие click() с отменой перехода по ссылке
    $(target).click(function (e) {
        e.preventDefault();

        $(menu).collapse('hide');
    });
};
