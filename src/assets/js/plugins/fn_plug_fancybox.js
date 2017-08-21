"use strict";

/// @name: -=[ fn_plugins_fancybox ]=-.
/// @description: Объявление fancybox плагина с заданными параметрами или без.
/// @require: jQuery latest (3.2.1+).
/// @access: public.
/// @type: function.
/// @prop: none.
/// @return: none.



$(function () {

    /*/// Событие click() с отменой перехода по ссылке
    $(".fancybox-inner").click(function (e) {
        e.preventDefault();

    });*/

    /*

    	Advanced example - Customized layout
        ====================================

    */

    $('a[data-fancybox="cl-group"]').fancybox({
        idleTime: false,
        baseClass: 'fancybox-custom-layout',
        margin: 0,
        infobar: false,
        thumbs: {
            hideOnClose: false
        },
        touch: {
            vertical: 'auto'
        },
        buttons: [
            'close',
            'thumbs',
            'slideShow',
            'fullScreen',
        ],
        animationEffect: false,
        // Закрывать при клике по свободной области за пределами
        closeClickOutside: false,
        // Картинки
        image: {
            // Ожидать ли полной загрузки картинки перед показом
            preload: "auto",
            // Защитить картинки от скачивания правым кликом
            protect: true
        },

        // Clicked on the content
        clickContent : function( current, event ) {
            return current.type === 'image' ? 'zoom' : false;
        },

        // Clicked on the slide
        clickSlide : 'close',

        // Clicked on the background (backdrop) element
        clickOutside : 'false',

        // Same as previous two, but for double click
        dblclickContent : false,
        dblclickSlide   : false,
        dblclickOutside : false,


        // Custom options when mobile device is detected
        // =============================================

        mobile : {
            clickContent : function( current, event ) {
                return current.type === 'image' ? 'toggleControls' : false;
            },
            clickSlide : function( current, event ) {
                return current.type === 'image' ? 'toggleControls' : "close";
            },
            dblclickContent : function( current, event ) {
                return current.type === 'image' ? 'zoom' : false;
            },
            dblclickSlide : function( current, event ) {
                return current.type === 'image' ? 'zoom' : false;
            }
        },

        // Customize caption area - append an advertisement
        caption: function (instance) {
            var advert = '<div class="ad"><div class="h5 text-uppercase text-center">Записаться на пробное занятие</div><button type="button" class="btn btn-primary1 center-block" data-toggle="modal" data-target="#modalOrder" data-service="Галерея" role="button" onclick="$.fancybox.close();"><span>Оставить заявку</span></button></div>';

            return advert + ($(this).data('caption') || '');
        },

        thumbs : {
            autoStart   : true,   // Display thumbnails on opening
            hideOnClose : true     // Hide thumbnail grid when closing animation starts
        }
    });



    /*

    	Advanced example - Morphing modal window

        See demo on CodePen: http://codepen.io/fancyapps/pen/rmwyXN
        ===========================================================

    */


    // Step 1: Create jQuery plugin
    // ============================

    $.fn.fancyMorph = function (opts) {

        var Morphing = function ($btn, opts) {
            var self = this;

            self.opts = $.extend({
                animationEffect: false,
                infobar: false,
                buttons: ['close'],
                smallBtn: false,
                touch: false,
                baseClass: 'fancybox-morphing',
                afterClose: function () {
                    self.close();
                }
            }, opts);

            self.init($btn);
        };

        Morphing.prototype.init = function ($btn) {
            var self = this;

            self.$btn = $btn.addClass('morphing-btn');

            self.$clone = $('<div class="morphing-btn-clone" />')
                .hide()
                .insertAfter($btn);

            // Add wrapping element and set initial width used for positioning
            $btn.wrap('<span class="morphing-btn-wrap"></span>').on('click', function (e) {
                e.preventDefault();

                self.start();
            });

        };

        Morphing.prototype.start = function () {
            var self = this;

            if (self.$btn.hasClass('morphing-btn_circle')) {
                return;
            }

            // Set initial width, because it is not possible to start CSS transition from "auto"
            self.$btn.width(self.$btn.width()).parent().width(self.$btn.outerWidth());

            self.$btn.off('.fm').on("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function (e) {

                if (e.originalEvent.propertyName === 'width') {
                    self.$btn.off('.fm');

                    self.animateBg();
                }

            }).addClass('morphing-btn_circle');

        };

        Morphing.prototype.animateBg = function () {
            var self = this;

            self.scaleBg();

            self.$clone.show();

            // Trigger repaint
            self.$clone[0].offsetHeight;

            self.$clone.off('.fm').on("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function (e) {
                self.$clone.off('.fm');

                self.complete();

            }).addClass('morphing-btn-clone_visible');
        };

        Morphing.prototype.scaleBg = function () {
            var self = this;

            var $clone = self.$clone;
            var scale = self.getScale();
            var $btn = self.$btn;
            var pos = $btn.offset();

            $clone.css({
                top: pos.top + $btn.outerHeight() * 0.5 - ($btn.outerHeight() * scale * 0.5) - $(window).scrollTop(),
                left: pos.left + $btn.outerWidth() * 0.5 - ($btn.outerWidth() * scale * 0.5) - $(window).scrollLeft(),
                width: $btn.outerWidth() * scale,
                height: $btn.outerHeight() * scale,
                transform: 'scale(' + (1 / scale) + ')'
            });
        };

        Morphing.prototype.getScale = function () {
            var $btn = this.$btn,
                radius = $btn.outerWidth() * 0.5,
                left = $btn.offset().left + radius - $(window).scrollLeft(),
                top = $btn.offset().top + radius - $(window).scrollTop(),
                windowW = $(window).width(),
                windowH = $(window).height();

            var maxDistHor = (left > windowW / 2) ? left : (windowW - left),
                maxDistVert = (top > windowH / 2) ? top : (windowH - top);

            return Math.ceil(Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) / radius);
        };

        Morphing.prototype.complete = function () {
            var self = this;
            var $btn = self.$btn;

            $.fancybox.open({
                src: $btn.data('src') || $btn.attr('href')
            }, self.opts);
        };

        Morphing.prototype.close = function () {
            var self = this;
            var $clone = self.$clone;

            self.scaleBg();

            $clone.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e) {
                $clone.hide();

                self.$btn.removeClass('morphing-btn_circle');
            });

            $clone.removeClass('morphing-btn-clone_visible');

            $(window).off('resize.fm');
        };

        // Init
        this.each(function () {
            var $this = $(this);

            if (!$this.data("morphing")) {
                $this.data("morphing", new Morphing($this, opts));
            }

        });

        return this;
    };


    // Step 2: Start using it!
    // =======================

    $("[data-morphing]").fancyMorph({
        hash: 'morphing'
    });




    /*

        Advanced example - Confirm dialog

        See demo on CodePen: http://codepen.io/fancyapps/pen/PmpePO
        ===========================================================

    */


    // Step 1: Create reusable jQuery plugin
    // =====================================

    $.fancyConfirm = function (opts) {
        opts = $.extend(true, {
            title: 'Are you sure?',
            message: '',
            okButton: 'OK',
            noButton: 'Cancel',
            callback: $.noop
        }, opts || {});

        $.fancybox.open({
            type: 'html',
            src: '<div class="fc-content">' +
                '<h3>' + opts.title + '</h3>' +
                '<p>' + opts.message + '</p>' +
                '<p class="tright">' +
                '<a data-value="0" data-fancybox-close>' + opts.noButton + '</a>' +
                '<button data-value="1" data-fancybox-close class="btn">' + opts.okButton + '</button>' +
                '</p>' +
                '</div>',
            opts: {
                animationDuration: 200,
                animationEffect: 'material',
                modal: true,
                baseTpl: '<div class="fancybox-container fc-container" role="dialog" tabindex="-1">' +
                    '<div class="fancybox-bg"></div>' +
                    '<div class="fancybox-inner">' +
                    '<div class="fancybox-stage"></div>' +
                    '</div>' +
                    '</div>',
                afterClose: function (instance, current, e) {
                    var button = e ? e.target || e.currentTarget : null;
                    var value = button ? $(button).data('value') : 0;

                    opts.callback(value);
                }
            }
        });
    }

    // Step 2: Start using it!
    // =======================

    $("#test_confirm").click(function () {

        // Open customized confirmation dialog window
        $.fancyConfirm({
            title: "Use Google's location service?",
            message: "Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running",
            okButton: 'Agree',
            noButton: 'Disagree',
            callback: function (value) {
                if (value) {
                    $("#test_confirm_rez").html("Let's do this!");

                } else {
                    $("#test_confirm_rez").html("Maybe later.");
                }
            }
        });

    });


    /*

    	Advanced example - Product quick view
        =====================================

    */

    $(".quick_view").fancybox({
        baseClass: 'quick-view-container',
        infobar: false,
        buttons: false,
        thumbs: false,
        margin: 0,
        touch: {
            vertical: false
        },
        animationEffect: false,
        transitionEffect: "slide",
        transitionDuration: 500,
        baseTpl: '<div class="fancybox-container" role="dialog">' +
            '<div class="quick-view-content">' +
            '<div class="quick-view-carousel">' +
            '<div class="fancybox-stage"></div>' +
            '</div>' +
            '<div class="quick-view-aside"></div>' +
            '<button data-fancybox-close class="quick-view-close">X</button>' +
            '</div>' +
            '</div>',

        onInit: function (instance) {

            /*

                #1 Create bullet navigation links
                =================================

            */

            var bullets = '<ul class="quick-view-bullets">';

            for (var i = 0; i < instance.group.length; i++) {
                bullets += '<li><a data-index="' + i + '" href="javascript:;"><span>' + (i + 1) + '</span></a></li>';
            }

            bullets += '</ul>';

            $(bullets).on('click touchstart', 'a', function () {
                    var index = $(this).data('index');

                    $.fancybox.getInstance(function () {
                        this.jumpTo(index);
                    });

                })
                .appendTo(instance.$refs.container.find('.quick-view-carousel'));


            /*

                #2 Add product form
                ===================

            */

            var $element = instance.group[instance.currIndex].opts.$orig;
            var form_id = $element.data('qw-form');

            instance.$refs.container.find('.quick-view-aside').append(

                // In this example, this element contains the form
                $('#' + form_id).clone(true).removeClass('hidden')
            );

        },

        beforeShow: function (instance) {

            /*
                Mark current bullet navigation link as active
            */

            instance.$refs.container.find('.quick-view-bullets')
                .children()
                .removeClass('active')
                .eq(instance.currIndex)
                .addClass('active');

        }

    });


});
