/*
 Third party
 */

$(function(){
    /*console.log('in plugins.js! ');*/
})

$(document).ready(function() {

    // Скроллинг
    /*$(".scrollTo").click(function () {
        $.scrollTo($(this).attr('href'), 800, {
			offset: 0
		});
        //$('.navbar-toggle').click();*/ /*для того, чтобы свернуть менюшку для удобства
		return false;
	});*/

    $(document).ready(function() {
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
	});

    /*elastislide*/
    $( '#carousel' ).elastislide({
        // orientation 'horizontal' || 'vertical'
        orientation : 'horizontal',

        // sliding speed
        speed : 500,

        // sliding easing
        easing : 'ease-in-out',

        // the minimum number of items to show.
        // when we resize the window, this will make sure minItems are always shown
        // (unless of course minItems is higher than the total number of elements)
        minItems : 3,

        // index of the current item (left most item of the carousel)
        start : 0,

        // click item callback
        // Возвратная функция для события click на слайде.
        // Пример получения номера слайда, на котором нажали кнопку мыши:
        /*
        $('#carousel').elastislide({
            onClick  :  function( $item ) {
                alert( 'кнопку мыши нажали на слайде № ' + $item.index() )
            }
        });
        */
        onClick : function( el, position, evt ) { return false; },
        onReady : function() { return false; },
        onBeforeSlide : function() { return false; },
        onAfterSlide : function() { return false; }
    });

    /* mask of inputs */
    $.mask.definitions['~']='[+-]';
    $.mask.definitions['h'] = "[2349]";
    $.mask.definitions['!'] = "[0-9]";

    $("#bsPhone").mask("+375 (hh) 999-99-99", { placeholder:"_" });
});
