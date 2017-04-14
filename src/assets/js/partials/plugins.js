/*
 Third party
 */

var vk_comments_offset  = 0;
var reviewsCountRemove  = 0;          /* Кол-во удалённых из отображения отзывов */

$(function(){
    /*console.log('in plugins.js! ');*/
})

$(document).ready(function() {

    // Скроллинг
    $(".scrollTo").click(function () {
        $.scrollTo($(this).attr('href'), 800, {
			offset: -51
		});
        //$('.navbar-toggle').click();*/ /*для того, чтобы свернуть менюшку для удобства
		return false;
	});

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
        minItems : 1,

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
    $.mask.definitions['h'] = "[1234579]";
    $.mask.definitions['!'] = "[0-9]";

    $(".bsPhone").mask("+375 (hh) 999-99-99", { placeholder:"_" });

    /* ---------------------------------------------------------------------- */

    vkBoard__getComments(vk_comments_offset);

    /* ---------------------------------------------------------------------- */

    /// Событие click() с отменой перехода по ссылке
    $("#reviewsVK__getComments").click(function (e) {
        e.preventDefault();

        vk_comments_offset += 15;
        vkBoard__getComments(vk_comments_offset);
    });
});

function vkBoard__getComments(real_offset) {
    /* VK.COM */
    /*
    jQuery.get(url, [data], [callback], [dataType]): jqXHRv: 1.0
    url         - адрес, по которому будет отправлен запрос.
    data        — данные, которые будут отправлены на сервер.Они должны быть представлены в объектом, в формате: {
        fName1: value1,
        fName2: value2,
        ...
    }.
    callback(data, textStatus, jqXHR)— пользовательская функция, которая будет вызвана после ответа сервера.

    data        — данные, присланные с сервера.
    textStatus  — статус того, как был выполнен запрос.
    jqXHR       — объект jqXHR(в версиях до jquery - 1.5, вместо него использовался XMLHttpRequest)
    dataType    — ожидаемый тип данных, которые пришлет сервер в ответ на запрос.
    */

    var dataResponseFromVK = $.get(
        "https://api.vk.com/method/board.getComments",
        {
            group_id            : "123321202",
            topic_id            : "34378561",
            need_likes          : 0,
            start_comment_id    : 0,
            offset              : real_offset,
            count               : 15,
            extended            : 1,
            sort                : "desc",
            v                   : "5.63"
        },
        onAjaxSuccessFromVK,
        "jsonp"
    );
}

/* Обработка данных из VK */
function onAjaxSuccessFromVK(data, textStatus, jqXHR) {
    // Здесь мы получаем данные, отправленные сервером и выводим их на экран

    /*var reviewsVK     = jQuery.parseJSON(data);*/
    var reviewsVK       = data.response;            /* объект response */
    var real_offset;                                /* текущее смещение */
    var $reviewsBlock   = $('#reviewsVK__reviews'); /*  */
    var reviewscount    = reviewsVK.count;          /* Общее кол-во отзывов, с вычетом "ненужных" */

    /* ---------------------------------------------------------------------- */

    /*
    * Объект response подержит поля:
    * - items       (представляет собой массив, содержащий объекты, описывающие комментарии);
    * - poll        (если к теме прикреплен опрос);
    * - profiles    (если был указан параметр extended);
    * - real_offset (итоговое смещение данного подмножества комментариев. Оно может быть отрицательным,
    *                если указан отрицательный offset).
    * -------------
    * - count       (количество сообщений);
    * - groups      ().
    */

    /* ПЕРЕМЕННЫЕ ПОЛЕЙ объекта RESPONSE */

    /* [ITEMS]
    * Комментарий в обсуждении
    * --------
    * {id}          (integer)                — идентификатор комментария.
    * {from_id}     (integer)                — автора комментария.
    * {date}        (integer)                — дата создания (в формате Unixtime).
    * {text}        (string)                 — комментария.
    * {attachments} (object)                 — комментария (фотографии, ссылки и т.п.).
    * {likes}       (object)                 — информация об отметках «Мне нравится» текущего комментария
    *                                          (если был задан параметр need_likes)
    * {can_edit}    (integer, [0,1])         - может ли изменить комментарий свой (от себя описание),
    *                                          (1 — может, 0 — не может).
    * [likes]
    * информация об отметках «Мне нравится» текущего комментария
    * -------
    * {count}       (integer)                — число пользователей, которым понравился комментарий,
    * {user_likes}  (integer, [0,1])         — наличие отметки «Мне нравится» от текущего пользователя
    *                                          (1 — есть, 0 — нет),
    * {can_like}    (integer, [0,1])         — информация о том, может ли текущий пользователь поставить отметку
    *                                          «Мне нравится» (1 — может, 0 — не может).
    */

    /* [PROFILES]
    * Содержит массив объектов user с информацией о данных пользователей, являющихся авторами сообщений
    * -----------
    * {uid}                                  — идентификатор пользователя;
    * {first_name}                           — имя пользователя;
    * {last_name}                            — фамилия пользователя;
    * {photo}                                — адрес фотографии пользователя размером 50x50px;
    * {photo_medium_rec}                     — адрес фотографии пользователя размером 100x100px;
    * {sex}                                  — пол пользователя;
    * {online}                               — находится ли пользователь на сайте в данный момент.
    */

    /* [ATTACHMENTS]
    * Медиавложения в записях на стене
    * --------------
    * 1. Фотография                          (type = photo)
    * 2. Фотография, загруженная напрямую    (type = posted_photo)
    * 3. Видеозапись                         (type = video)
    * 4. Аудиозапись                         (type = audio)
    * 5. Документ                            (type = doc)
    * 6. Граффити                            (type = graffiti)
    * 7. Ссылка                              (type = link)
    * 8. Заметка                             (type = note)
    * 9. Контент приложения                  (type = app)
    * 10. Опрос                              (type = poll)
    * 11. Вики-страница                      (type = page)
    * 12. Альбом с фотографиями              (type = album)
    * 13. Список фотографий                  (type = photos_list)
    * 14. Товар                              (type = market)
    * 15. Подборка товаров                   (type = market_album)
    * 16. Стикер                             (type = sticker)
    */

    /* [ATTACHMENTS: TYPE = PHOTO}]
    * Фотография
    * --------
    * {id}          (integer)                — идентификатор фотографии.
    * {album_id}    (integer)                — идентификатор альбома, в котором находится фотография.
    * {owner_id}    (integer)                — идентификатор владельца фотографии.
    * {user_id}     (integer)                — идентификатор пользователя, загрузившего фото
    *                                          (если фотография размещена в сообществе).
    *                                          Для фотографий, размещенных от имени сообщества,
    *                                          user_id = 100.
    * {text}        (string)                 — текст описания фотографии.
    * {date}        (integer)                — дата добавления в формате Unixtime.
    * {sizes}       (array)                  — массив с копиями изображения в разных размерах.
    *                                          Описание объекта находится на отдельной странице.
    *                                          Поле возвращается только при передаче параметра
    *                                          photo_sizes = 1 в запросе.
    *                                          Если параметр не передан, вместо поля sizes
    *                                          возвращаются поля, описанные ниже.
    * {photo_75}    string)                  — URL копии фотографии с максимальным размером 75x75px.
    * {photo_130}   (string)                 — URL копии фотографии с максимальным размером 130x130px.
    * {photo_604}   (string)                 — URL копии фотографии с максимальным размером 604x604px.
    * {photo_807}   (string)                 — URL копии фотографии с максимальным размером 807x807px.
    * {photo_1280}  (string)                 — URL копии фотографии с максимальным размером 1280x1024px.
    * {photo_2560}  (string)                 — URL копии фотографии с максимальным размером 2560x2048px.
    * {width}       (integer)                — ширина оригинала фотографии в пикселах.
    * {height}      (integer)                — высота оригинала фотографии в пикселах.
    */

    /* ---------------------------------------------------------------------- */

    /*// Перебор массива
    jQuery.each(reviewsVK, function () {
        $("#" + this).text("Mine is " + this + ".");
        return (this != "three"); // Выйти из цикла после "three"
    });*/

    /*// Перебор массивоподобного объекта
    jQuery.each(reviewsVK, function (i, val) {
         $("#" + i).append(document.createTextNode(" - " + val));
    });*/

    /* ----------------------------- */

    /*
    * reviewsVK.count (integer)
    * reviewsVK.real_offset (integer)
    */

    jQuery.each(reviewsVK.items, function () {
        /*
        * this.id
        * this.can_edit
        * this.attachments ([objs])
        * this.likes ([objs])
        */

        var month_en = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        month_ru = [
            "янв",
            "фев",
            "мар",
            "апр",
            "май",
            "июн",
            "июл",
            "авг",
            "сен",
            "окт",
            "ноя",
            "дек"
        ],
        month = month_ru;

        var review_id           = this.id,
            review_id_owner     = this.from_id,
            review_date         = new Date(this.date * 1000),
            review_text         = this.text,
            review_first_name,
            review_last_name,
            review_photo;

        if( (review_id_owner == 369583216) || (review_id_owner == -123321202) ) {
            ++reviewsCountRemove;
            console.log("-----");
            console.log("reviewscount: " + reviewscount);
            console.log("reviewsCountRemove: " + reviewsCountRemove);
            console.log("-----");
            return;
        }

        var reviewsVK__attachmentsPhotos = "";

        review_date.toUTCString();
        d = review_date;
        review_date = d.getDate() + ' ' + month[d.getMonth()] + ' ' + d.getFullYear() + ' в ' + d.getHours() + ':' + d.getMinutes();

        jQuery.each(reviewsVK.profiles, function () {
            /*
            * this.sex
            * this.screen_name
            * this.photo_50
            * this.online
            */

            if (this.id === review_id_owner) {
                review_first_name   = this.first_name
                review_last_name    = this.last_name
                review_photo        = this.photo_100
            }
        });

        if (this.attachments) {
            var attachments_big_photo;
            jQuery.each(this.attachments, function () {
                /*
                * this.type
                * this.photo
                * остальные типы не трогаем пока.
                */

                if (this.type === "photo") {
                    /*
                    * this.id
                    * this.album_id
                    * this.owner_id
                    * this.user_id
                    * this.photo_75
                    * this.photo_130
                    * this.photo_604
                    * this.photo_807
                    * this.photo_1280
                    * this.width
                    * this.height
                    * this.text
                    * this.date
                    * this.access_key
                    */

                    if(this.photo.photo_1280) {
                        attachments_big_photo = this.photo.photo_1280;
                    }
                    else if(this.photo.photo_807) {
                        attachments_big_photo = this.photo.photo_807;
                    }
                    else if(this.photo.photo_604) {
                        attachments_big_photo = this.photo.photo_604;
                    }
                    else if(this.photo.photo_130) {
                        attachments_big_photo = this.photo.photo_130;
                    }
                    else {
                        attachments_big_photo = this.photo.photo_75;
                    }

                    reviewsVK__attachmentsPhotos += '<a href="' + attachments_big_photo + '" class="thumbnail fancybox" rel="reviewsVK__attachments-photo_' + review_id + '" title="' + this.photo.text + '"><img src="' + this.photo.photo_75 + '" class="img-responsive reviewsVK__attachments-photo" alt=""></a>';
                }
            });
        }

        $reviewsBlock.append('<div class="reviewsVK__review" data-review-id="' + review_id + '"><div class="reviewsVK__owner"><img src="' + review_photo + '" alt="" class="reviewsVK__photo reviewsVK__photo_100"><p class="h3 reviewsVK__username"><span class="reviewsVK__name reviewsVK__name_first">' + review_first_name + '</span> <span class="reviewsVK__name reviewsVK__name_last">' + review_last_name + '</span><span class="reviewsVK__date">' + review_date + '</span></p></div><div class="reviewsVK__text">' + review_text + '</div><div class="reviewsVK__attachments"><div class="reviewsVK__attachments-photos">' + reviewsVK__attachmentsPhotos + '</div></div></div>');

        /*$reviewsBlock.append('<div class="reviewsVK__review"><div class="reviewsVK__owner"><img src="' + review_photo + '" alt="" class="reviewsVK__photo reviewsVK__photo_100"><p class="h3 reviewsVK__username"><span class="reviewsVK__name reviewsVK__name_first">' + review_first_name + '</span> <span class="reviewsVK__name reviewsVK__name_last">' + review_last_name + '</span><span class="reviewsVK__date">' + review_date + '</span></p></div><div class="reviewsVK__text">' + review_text + '</div></div>');*/

    });

    console.log("reviewscount - reviewsCountRemove: " + reviewscount + " - " + reviewsCountRemove + " = " + (reviewscount - reviewsCountRemove));

    $('#reviewsVK__count').text( " " + (reviewscount - reviewsCountRemove) );
}
