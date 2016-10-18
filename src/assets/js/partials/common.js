/*
 Third party
 */

"use strict";

$(function () {
    /*console.log('in common.js! ');*/
})

$(document).ready(function () {

    // Ajax send mail
    $(".order").submit(function (e) {
        ajax(this);

        return false;
	});

    $('.submit').click(function () {
        var recipient = $(this).data('submit');

        $(recipient).submit();
        //ajax(recipient);

        return false;
    });

    $('form').find('input').on('input', function () {
        //найти предка, который имеет класс .form-group, для удаления success/error
        var formGroup = $(this).parents('.form-group');

        formGroup.removeClass('has-error has-success');
        /*$('#formOrder .form-control-feedback-message-success').removeClass("flex-center");*/

        $(this).closest('form').find('.submit').prop('disabled', false);
    })

    $('form').find('input').on('keydown', function () {
        //найти предка, который имеет класс .form-group, для удаления success/error
        var formGroup = $(this).parents('.form-group');

        formGroup.removeClass('has-error has-success');
        /*$('#formOrder .form-control-feedback-message-success').removeClass("flex-center");*/

        $(this).closest('form').find('.submit').prop('disabled', false);
    })

    if (getPageSize()[2] < 768) {

    }

    $(document).scroll(function () {
        toDoScroll();
    });

    $('.modal-vertical-centered').on('show.bs.modal', centerModal);

    $(window).on("resize", function () {
        $('.modal-vertical-centered:visible').each(centerModal);
        toDoScroll();
    });

    $('#modalOrder').on('show.bs.modal', function (event) {
        centerModal; /* вертикальное центрирование */
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('service'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        /*modal.find('#orderFormLabel').text('Заявка на услугу ' + '"' + recipient + '"');*/
        /*modal.find('#whichService').val(recipient);*/
        $('#whichService').val(recipient);

        /*$('#placeInFooter>.form-order').detach().prependTo('#placeInModal');*/  // перемещаем форму из футера в модальное окно
        /*$('#placeMessageSuccess .form-control-feedback-message-success').detach().prependTo('#formOrder');*/

    });

    $('#modalOrder').on('hidden.bs.modal', function (event) {
        /*$('#placeInModal>.form-order').detach().prependTo('#placeInFooter');*/  // перемещаем форму из модального окна в футер
        /*$('#formOrder .form-control-feedback-message-success').detach().prependTo('#placeMessageSuccess');*/
        /*$('#formOrder .form-control-feedback-message-success').removeClass("flex-center");*/
    });

    $(".youtube").each(function () {
        // Based on the YouTube ID, we can easily find the thumbnail image
        $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

        // Overlay the Play icon to make it look like a video player
        $(this).append($('<div/>', {'class': 'play'}));

        $(document).delegate('#'+this.id, 'click', function() {
            // Create an iFrame with autoplay set to true
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

            // Replace the YouTube thumbnail with YouTube HTML5 Player
            $(this).replaceWith(iframe);
        });
    });

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    /* - - - - - - - - - - - - - - - - HEADER - - - - - - - - - - - - - - - - */

    $('#header').animate({
        opacity: 1
    }, 1000);

    setTimeout(function () {
        $('#hTop').css("opacity", 1).animateCss('fadeInDownBig');
    }, 1500);

    setTimeout(function () {
        $('#header .offer-right').css("opacity", 1).animateCss('fadeInRight'); /*slideInRight*/
    }, 2000);

    setTimeout(function () {
        $('#header .offer-bottom').css("opacity", 1).animateCss('fadeInUp'); /*slideInUp*/

        /*if (getPageSize()[2] > 767) {
            $('#header').animate({
                "background-position-y": "-15%"
            }, 1000);
        }*/
    }, 3000);

    setTimeout(function () {
        $("#header .container-bg").css("background-image", "url('assets/img/header/bg_3-2.jpg')");
    }, 4000);

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    /* - - - - - - - - - - - - - - - - PROBLEMS - - - - - - - - - - - - - - - */

    /* Разовое исполнение */
    /*$('#problems .list-primary li').one('inview', function (event) {
        $(this).css("opacity", 1).animateCss('bounceInLeft'); //slideInLeft|fadeInLeft
    });*/

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    /* - - - - - - - - - - - - - - - - ADVANTAGES - - - - - - - - - - - - - - */

    /* Разовое исполнение */
    /*$('#advantages .list-primary li').one('inview', function (event) {
        $(this).css("opacity", 1).animateCss('bounceInLeft'); //slideInLeft|fadeInLeft
    });*/

    /* Разовое исполнение */
    $('#advantages .photos').one('inview', function (event) {
        $(this).css("opacity", 1).animateCss('fadeInRight'); /*slideInLeft|fadeInLeft*/
    });

    /* Разовое исполнение */
    /*$('#advantages .video').one('inview', function (event) {
        $(this).css("opacity", 1).animateCss('bounceIn');
    });*/

    if (getPageSize()[2] > 767) {
        /* inview  */
        jQuery('#advantages .video').bind('inview', function (event, visible) {
            if (visible) {
                $(this).animateCss('bounceIn');
            } else {
                /*$(this).stop().removeClass("animated bounceIn");*/
            }
        });
    }

    /*var video = JSON.parse("../json/video.json"),*/
    /*var video = [
            '<iframe width="auto" height="auto" src="https://www.youtube.com/embed/CUiQh_9k7q0" frameborder="0" allowfullscreen=""></iframe>',
            '<iframe width="auto" height="auto" src="https://www.youtube.com/embed/qbpNv4gI14o" frameborder="0" allowfullscreen=""></iframe>',
            '<iframe width="640" height="360" src="https://www.youtube.com/embed/mczuKRo5Nr8" frameborder="0" allowfullscreen></iframe>'
        ],
        video_current = 0;*/

    /*CUiQh_9k7q0
    qbpNv4gI14o
    https://www.youtube.com/embed/*/
    /*setTimeout(function () {
        $('#advantages .video').each(function () {
            $(this).prepend(video[video_current]);
            video_current++;
        });
    }, 4000);*/

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* - - - - - - - - - - - - - - - - COACHES - - - - - - - - - - - - - - */

    /* Разовое исполнение */
    /*$('#coaches .item-square-3').one('inview', function (event) {
        $(this).css("opacity", 1).animateCss('rotateInUpLeft');
    });*/

    /* inview  */
    /*jQuery('#coaches .gallery .gallery-item').bind('inview', function (event, visible) {
        if (visible) {
            $(this).animateCss('flipInY');
        } else {

        }
    });*/

    if (getPageSize()[2] > 767) {
        /* inview  */
        jQuery('#coaches .item-square-3').bind('inview', function (event, visible) {
            if (visible) {
                $(this).animateCss('flipInY');
            } else {
                /*$(this).stop().removeClass("animated flipInY");*/
            }
        });
    }

    /* Разовое исполнение */
    $('#coaches .item-circled-3').one('inview', function (event) {
        $(this).css("opacity", 1).animateCss('rotateInUpRight');
    });

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    /* - - - - - - - - - - - - - - - SERVICES - - - - - - - - - - - - - - - */

    $('#reviews-carousel-slider').on('slid.bs.carousel', function () {
        var curRw = $(this).find('.item.active .numberReview').text();
        $('#currentReview').html(curRw);
    })

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    /* - - - - - - - - - - - - - - - SOLUTION - - - - - - - - - - - - - - - */

    if (getPageSize()[2] > 767) {
        /* inview  */
        jQuery('#solution .solution').bind('inview', function (event, visible) {
            if (visible) {
                $(this).animateCss('bounceIn');
            } else {
                /*$(this).stop().removeClass("animated bounceIn");*/
            }
        });
    }

    /* Разовое исполнение */
    $('#solution .solution-result').one('inview', function (event) {
        $(this).css("opacity", 1).animateCss('fadeInRight');
    });

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* - - - - - - - - - - - - - - - - ADDRESSES - - - - - - - - - - - - - - */

    /* Разовое исполнение */
    /*$('#addresses dt').one('inview', function (event) {
        $(this).css("opacity", 1).animateCss('zoomIn');
    });
    */

    if (getPageSize()[2] > 767) {
        /* inview  */
        jQuery('#addresses dd').bind('inview', function (event, visible) {
            if (visible) {
                $(this).animateCss('rotateInUpLeft');
            } else {
                /*$(this).stop().removeClass("animated rotateInUpLeft");*/
            }
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* - - - - - - - - - - - - - - - - - COMMON - - - - - - - - - - - - - -  */

    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* - - - - - - - - - - - - - - - - LST_RESULT - - - - - - - - - - - - -  */

    /* Разовое исполнение */
    $('.lst_result-result').one('inview', function (event) {
        $(this).css("opacity", 1).animateCss('fadeInRight'); /*slideInRight*/
    });

    /*if (getPageSize()[2] > 767) {
        // inview
        jQuery('.list-primary li .icon-font').bind('inview', function (event, visible) {
            if (visible) {
                $(this).animateCss('bounceIn');
            } else {
                //$(this).stop().removeClass("animated bounceIn");
            }
        });
    }*/

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* - - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - */

   /* setTimeout(function () { // нужно APIшку вставить.
        $('#yMap').prepend(
            "<script type=\"text/javascript\" charset=\"utf-8\" async src=\"https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=9z5AVEb4vNtxVCjxmjZiM2u_YRbneKxM&width=100%&height=400&lang=ru_RU&sourceType=constructor&scroll=false\"></script>"
        );
    }, 5000);*/

});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* - - - - - - - - - - - - - - - - FUNCTION - - - - - - - - - - - - - - - - */

function toDoScroll() {
        var currScrollPos = +$(document).scrollTop(),
            parallaxBg = $('.parallaxBg');

        if(currScrollPos >= 500) {
            $("#descr").css("display", "none");
            $("#callMe").css("display", "none");

            if (getPageSize()[2] > 1199) {
                $("#header img.logo").css("display", "block");
                $("#header .phone a .fa").css("display", "inline-block");
                $("#header .phone a.btn").css("padding", "14px 15px");
                $(".navbar-brand").css("display", "inline-block");
            }

            if (getPageSize()[2] < 1200 && getPageSize()[2] > 991) {
                $("#header img.logo").css("display", "none");
                $("#header .phone a .fa").css("display", "none");
                $("#header .phone a.btn").css("padding", "14px 9px");
                $(".navbar-brand").css("display", "inline-block");
            }

            if (getPageSize()[2] > 991) {
                $("#utpScroll").fadeIn();
                $("#utpScroll-btn").fadeIn();
            }

            if (getPageSize()[2] < 992 && getPageSize()[2] > 767) {
                $("#header img.logo").css("display", "block");
                $("#utpScroll").css("display", "none");
                $("#header .phone a .fa").css("display", "none");
                $("#header .phone a.btn").css("padding", "14px 15px");
                $(".navbar-brand").css("display", "inline-block");
            }

            if (getPageSize()[2] > 767) {

            }

            if (getPageSize()[2] < 768 && getPageSize()[2] > 599) {
                $("#header img.logo").css("display", "none");
                $("#header .phone a .fa").css("display", "none");
                $("#header .phone a.btn").css("padding", "14px 9px");
                $(".navbar-brand").css("display", "none");
            }

            if (getPageSize()[2] > 599) {
                $("#utpScroll-btn").fadeIn();
            }

            if (getPageSize()[2] < 600 && getPageSize()[2] > 416) {
                $("#callMe").css("display", "inline-block");
                $(".navbar-brand").css("display", "inline-block");
                $("#utpScroll-btn").css("display", "none");
                $("#header img.logo").css("display", "block");
            }

            if (getPageSize()[2] < 417) {
                $("#header .phone a .fa").css("display", "none");
                $("#header .phone a.btn").css("padding", "14px 9px");
            }
        }
        else {
            $("#utpScroll").css("display", "none");
            $("#utpScroll-btn").css("display", "none");

            if (getPageSize()[2] > 1199) {
                $("#header img.logo").css("display", "block");
                $("#header .phone a .fa").css("display", "inline-block");
                $("#header .phone a.btn").css("padding", "14px 15px");
            }

            if (getPageSize()[2] < 1200 && getPageSize()[2] > 991) {
                $("#header img.logo").css("display", "block");
                $("#header .phone a .fa").css("display", "inline-block");
                $("#header .phone a.btn").css("padding", "14px 15px");
            }

            if (getPageSize()[2] > 991) {
                $("#callMe").css("display", "inline-block");
            }

            if (getPageSize()[2] < 992 && getPageSize()[2] > 767) {
                $("#header img.logo").css("display", "none");
                $("#header .phone a .fa").css("display", "none");
                $("#header .phone a.btn").css("padding", "14px 15px");
                $("#callMe").css("display", "none");
            }

            if (getPageSize()[2] > 767) {
                $("#descr").fadeIn();
            }

            if (getPageSize()[2] < 768 && getPageSize()[2] > 599) {
                $("#header .phone a.btn").css("padding", "14px 15px");
                $("#header .phone a .fa").css("display", "inline-block");
                $("#header img.logo").css("display", "block");
                $("#callMe").css("display", "inline-block");
                $(".navbar-brand").css("display", "inline-block");
            }

            if (getPageSize()[2] < 600 && getPageSize()[2] > 416) {
                $("#callMe").css("display", "inline-block");
                $(".navbar-brand").css("display", "inline-block");
                $("#utpScroll-btn").css("display", "none");
                $("#header img.logo").css("display", "block");
            }

            if (getPageSize()[2] > 416) {
                /*$("#callMe").css("display", "inline-block");*/
            }

            if (getPageSize()[2] < 417) {
                $("#callMe").css("display", "none");
                $("#header .phone a .fa").css("display", "none");
                $("#header .phone a.btn").css("padding", "14px 9px");
            }
        }

        if (getPageSize()[2] > 767) {
            /*parallax($('#problems-result'));*/
            /*parallax($('#advantages-result'));*/
            /*parallax($('#header', "bg"));*/
        }
    }

//Parallax effect background
function parallax(object, effect) {
    if (getPageSize()[2] < 768) {
        return;
    }
    var currScrollPos = +$(document).scrollTop(),
        offsetFromTop = object.offset(),
        currToBlock   = +offsetFromTop.top - currScrollPos,
        maxOffsetAnim = +100,
        hOffset       = currToBlock/6, /*currToBlock/4*/
        unit          = "px";

    /*console.log(currToBlock);*/

    /*if(hOffset > maxOffsetAnim) { hOffset = 100; unit = "%"; }*/
    /*if(hOffset < -maxOffsetAnim { hOffset = -100; unit = "%"; }*/

    /*console.log(hOffset);*/

    if(effect == "bg") {
        unit = "%";
        object.css('background-position', '50% ' + hOffset + unit);
    }
    else {
        object.css('position', 'relative');
        object.css('top', hOffset-100 + unit);
    }
}

function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog");
    var offset = ($(window).height() - $dialog.height()) / 2;
    $dialog.css("margin-top", offset);
}

function validate(target) {

    /*var name, tel;

    name = $(target).find('input:text').val();
    tel = $(target).find('input:tel').val();*/

    //переменная formValid
    var formValid = true;

    $(target).find('.submit').attr('disabled', 'disabled');

    $(target).find('input.validating').each(function () {
        //найти предков, которые имеют класс .form-group, для установления success/error
        var formGroup = $(this).parents('.form-group');
        //найти glyphicon, который предназначен для показа иконки успеха или ошибки
        var glyphicon = formGroup.find('.form-control-feedback');
        //для валидации данных используем HTML5 функцию checkValidity

        if (this.checkValidity() && ($(this).val() != "")) {
            //добавить к formGroup класс .has-success, удалить has-error
            formGroup.addClass('has-success').removeClass('has-error');
            //добавить к glyphicon класс glyphicon-ok, удалить glyphicon-remove
            glyphicon.addClass('glyphicon-ok').removeClass('glyphicon-remove');
        } else {
            //добавить к formGroup класс .has-error, удалить .has-success
            formGroup.addClass('has-error').removeClass('has-success');
            //добавить к glyphicon класс glyphicon-remove, удалить glyphicon-ok
            glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');
            //отметить форму как невалидную
            formValid = false;
        }
    });

    //если форма валидна, то
    if (formValid) {
        return true;
    }

    return false;
}

function ajax(ob) {
    var msg;
    var processor;
    var result;

    var result = $("#result");

    if (!validate(ob)) {
        /*result.addClass("text-danger bg-danger").text("Пожалуйста, проверьте введённые данные!");*/
        return false;
    }

    processor = "./mail.php";

    $.ajax({
        type: "POST",
        url: processor,
        data: $(ob).serialize(),
        beforeSend: function(data) { // сoбытиe дo oтпрaвки
            /*$(ob).find('input[type="submit"]').attr('disabled', 'disabled');*/ // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
            $(ob).find('.submit').attr('disabled', 'disabled');
        },
        complete: function(data) { // сoбытиe пoслe любoгo исхoдa
            /*$(ob).find('input[type="submit"]').prop('disabled', false);*/ // в любoм случae включим кнoпку oбрaтнo
            $(ob).find('.submit').prop('disabled', false);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            /*result.addClass("text-danger bg-danger").text("Пожалуйста, проверьте введённые данные!");*/
            /*alert("Ошибка: "+xhr.responseCode+" | сообщение: "+str);*/ /* отладка */
            //alert("send email ERROR! "+ xhr.responseText); /* xhr.responseCode */
            //alert(xhr.status); // пoкaжeм oтвeт сeрвeрa
            //alert(thrownError); // и тeкст oшибки
        },
        success: function(data) {
            //alert(data); /* $('.results').html(data); */
        },
    }).done(function (msg) {

        /*if(msg === "OK"){
            var result = "<div = 'bg-success'>Спасибо за заявку! Мы вам перезвоним!</div>"
            form.html(result);
        } else {
            form.html(msg);
        }*/

        $(ob).find("[type='text']").val("");
        $(ob).trigger("reset");
        /*result.addClass("text-success bg-success").removeClass("text-danger bg-danger").text("Ваша заявка принята!");*/

        /*setTimeout(function () {
        	$.fancybox.close();
        	result.addClass("animated zoomInDown show").fadeIn('slow');
        }, 500);*/

        setTimeout(function () {
            //сркыть модальное окно
            /*$('#modalOrder').modal('hide');*/
            $(ob).closest(".modal").modal('hide');
            //отобразить сообщение об успехе
            $('#modalAlert-success').modal('show');
            /*$(ob).find('.form-control-feedback-message-success').addClass("flex-center");*/
            /*result.removeClass("text-danger bg-danger text-success bg-success").text("");*/
            /*$(ob).find('.submit').prop('disabled', false);*/
            yaCounter38441125.reachGoal('ORDER'); /* for Y. target */
            $(ob).find('#whichService').val(""); /* нужно заменить на класс */
            $(ob).find('.has-feedback').removeClass('has-success');
            $(ob).find('.form-control-feedback').removeClass('glyphicon-ok');
        }, 1000);

    });

    return false;
}

// Кроссбраузерное получение размеров окна на JS
function getPageSize() {
    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight) { // Explorer 6 strict mode
        xScroll = document.documentElement.scrollWidth;
        yScroll = document.documentElement.scrollHeight;
    } else { // Explorer Mac...would also work in Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }

    return [pageWidth, pageHeight, windowWidth, windowHeight];
}

/* Получить GET параметры */
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});
//Получить объект с URL параметрами
/*var allVars = $.getUrlVars();*/
// Получит параметр URL по его имени
/*var byName = $.getUrlVar('name');*/
