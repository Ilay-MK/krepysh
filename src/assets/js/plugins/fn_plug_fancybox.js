"use strict";

/// @name: -=[ fn_plugins_fancybox ]=-.
/// @description: Объявление fancybox плагина с заданными параметрами или без.
/// @require: jQuery latest (3.2.1+).
/// @access: public.
/// @type: function.
/// @prop: none.
/// @return: none.

var fn_plugins_fancybox = function () {
    $(".fancybox").fancybox({
        helpers : {
            title : {
                type : 'over'
            },
            thumbs	: {
                width	: 50,
                height	: 50
            }
        }
    });
};

$(function () {
    fn_plugins_fancybox;
});
