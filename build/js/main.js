$(document).ready(function () {
    $('body').on('click', '.stat__tab-link', function (e) {
        e.preventDefault();
        if (!$(this).hasClass('stat__tab-link_active')) {
            var index = $(this).closest('.stat__tab').index();
            $(this).closest('.stat__tabs').find('.stat__tab-link').removeClass('stat__tab-link_active');
            $(this).addClass('stat__tab-link_active');

            $('.stat__table table').fadeOut();
            $('.stat__table table').eq(index).fadeIn();
        }
    });

    $('body').on('click', '.gameboard__rate-item', function (e) {
        $(this).closest('.gameboard__rate-items')
            .find('.gameboard__rate-item')
            .removeClass('gameboard__rate-item_active');
        $(this).addClass('gameboard__rate-item_active');
        var countg = $(this).html();
        $(this).closest('.gameboard').find('.gameboard__countg').html(countg);
    });

    var z_index = 2000;
    $('body').on('click', '.gameboard__icon:not(.gameboard__icon_disabled)', function (e) {
        var random_number_for_img = random_integer(1, 3);
        if (random_number_for_img == 1) {
            $(this).closest('.gameboard__item')
                .find('.gameboard__balloon').addClass('gameboard__balloon_blue');
        }
        else if (random_number_for_img == 2) {
            $(this).closest('.gameboard__item')
                .find('.gameboard__balloon').addClass('gameboard__balloon_red');
        }
        else {
            $(this).closest('.gameboard__item')
                .find('.gameboard__balloon').addClass('gameboard__balloon_green');
        }
        var target = this;
        var is_gamestart = $(this).closest('.gameboard__item_hover').length;
        if (is_gamestart) {
            $(this).closest('.gameboard__item_hover').fadeOut();
            $(this).closest('.gameboard__items').find('.gameboard__item').addClass('gameboard__item_disabled');
            $(this).closest('.gameboard__item').find('.gameboard__icon svg').css('opacity', 1);
        }
        $(this).closest('.gameboard__items').find('.gameboard__icon').addClass('gameboard__icon_disabled');
        $(this).closest('.gameboard__item').addClass('gameboard__item_waiting');
        z_index++;
        setTimeout(function () {
            $(target).closest('.gameboard__item')
                .find('.gameboard__balloon')
                .addClass('gameboard__balloon_luck');
            $(target).closest('.gameboard__item')
                .addClass('gameboard__item_rotated')
                .css('z-index', z_index);
            $(target).closest('.gameboard__items')
                .find('.gameboard__item:not(.gameboard__item_rotated) .gameboard__icon')
                .removeClass('gameboard__icon_disabled');
            if (is_gamestart) {
                $(target).closest('.gameboard__items').find('.gameboard__item').removeClass('gameboard__item_disabled');
            }

            var is_gamefinish = !$('.gameboard__item:not(.gameboard__item_rotated)').length;

            setTimeout(function () {
                $(target).closest('.gameboard__item')
                    .removeClass('gameboard__item_waiting');
            }, 800);

            if (is_gamefinish) {
                setTimeout(function () {
                    $('.gameboard__item:nth-child(4):not(.gameboard__item_rotated) .gameboard__balloon, .gameboard__item:nth-child(5):not(.gameboard__item_rotated) .gameboard__balloon, .gameboard__item:nth-child(6):not(.gameboard__item_rotated) .gameboard__balloon').addClass('gameboard__balloon_transform_invert');
                    $('.gameboard__item:nth-child(4):not(.gameboard__item_rotated), .gameboard__item:nth-child(5):not(.gameboard__item_rotated), .gameboard__item:nth-child(6):not(.gameboard__item_rotated)').addClass('gameboard__item_transform_invert');
                    $('.gameboard__balloon.gameboard__balloon_transform_invert').css('opacity', 1);
                    $('.gameboard__item').each(function () {
                        $(this)
                            .removeClass('gameboard__item_rotated')
                            .removeClass('gameboard__item_delay')
                            .removeClass('gameboard__item_transform_invert');
                        $(this).find('.gameboard__balloon').removeClass('gameboard__balloon_transform_invert');
                        $(this).find('.gameboard__icon').removeClass('gameboard__icon_disabled');
                    });
                }, 4000);
            }


        }, 1000);
    });

    $('body').on('click', '.gameboard__button_finishgame', function (e) {
        var target = this;
        $(this).attr('disabled', 'disabled');
        $('.gameboard__item:nth-child(4):not(.gameboard__item_rotated) .gameboard__balloon, .gameboard__item:nth-child(5):not(.gameboard__item_rotated) .gameboard__balloon, .gameboard__item:nth-child(6):not(.gameboard__item_rotated) .gameboard__balloon').addClass('gameboard__balloon_transform_invert');
        $('.gameboard__item:nth-child(4):not(.gameboard__item_rotated), .gameboard__item:nth-child(5):not(.gameboard__item_rotated), .gameboard__item:nth-child(6):not(.gameboard__item_rotated)').addClass('gameboard__item_transform_invert');
        setTimeout(function () {
            var z_index = 2000;
            $('.gameboard__items')
                .find('.gameboard__item')
                .each(function () {
                    if (!$(this).hasClass('gameboard__item_rotated')) {
                        var random_number_for_img = random_integer(1, 3);
                        if (random_number_for_img == 1) {
                            $(this).closest('.gameboard__item')
                                .find('.gameboard__balloon').addClass('gameboard__balloon_blue');
                        }
                        else if (random_number_for_img == 2) {
                            $(this).closest('.gameboard__item')
                                .find('.gameboard__balloon').addClass('gameboard__balloon_red');
                        }
                        else {
                            $(this).closest('.gameboard__item')
                                .find('.gameboard__balloon').addClass('gameboard__balloon_green');
                        }
                        var that = this;
                        z_index--;
                        $(this)
                            .addClass('gameboard__item_rotated');
                        $(this).css('z-index', z_index);
                        setTimeout(function () {
                            $(that).closest('.gameboard__item');
                            $('.gameboard__balloon.gameboard__balloon_transform_invert').css('opacity', 1);
                            setTimeout(function () {
                                $('.gameboard__item').each(function () {
                                    $(this)
                                        .removeClass('gameboard__item_rotated')
                                        .removeClass('gameboard__item_delay')
                                        .removeClass('gameboard__item_transform_invert');
                                    $(this).find('.gameboard__balloon').removeClass('gameboard__balloon_transform_invert');
                                    $(this).find('.gameboard__icon').removeClass('gameboard__icon_disabled');
                                });
                                $(target).removeAttr('disabled');
                            }, 2000);
                        }, 800);
                    }
                });
        }, 1000);
    });

    // Модальные окна
    $('.open-modal').magnificPopup({//https://dimsemenov.com/plugins/magnific-popup/documentation.html#inline-type
        removalDelay: 500, //задержка перед закрытием попапа
        showCloseBtn: false, //не показывать крестик по умолчанию
        callbacks: { //определение функций обратного вызова
            beforeOpen: function () { //событие срабатывает до открытия модального окна
                var target = this;
                var magnificPopup = $.magnificPopup.instance; //this
                var href = $(magnificPopup.st.el).attr("href"); //ссылка на модальное окно
                var href_name = href.substr(1); //ссылка без знака решетки
                var url = href_name + '.html ' + href; //url адрес страницы с html кодом содержимого попапа
                var elem = $(magnificPopup.st.el); //элемент, который вызывает модальное окно
                this.st.mainClass = this.st.el.attr('data-effect');
                $(".popup-container").load(url, function () { //jquery загрузчик содержимого страницы посредством ajax
                    $.magnificPopup.open({
                        items: {
                            src: href
                        }
                    });
                    $("form").validate({
                        rules: {
                            wallet: {
                                required: true
                            }
                        },
                        messages: {
                            wallet: {
                                required: "Это поле обязательно для заполнения"
                            }
                        }
                    });

                    if (href == '#popup_chat') {
                        $('html, body').css('overflow', 'hidden');
                        if ($('.chat').length) {
                            $('.popup__wrap .chat__messages').scrollTop($('.popup__wrap .chat__messages')[0].scrollHeight);
                        }
                    }

                    /*анимация alert*/
                    if (href == '#popup_alert') {
                        var last_alert_height = $('.popup__wrap > div:first-child').height() + 33;
                        $('.popup__wrap > div:last-child').css({
                            opacity: 1
                        });
                        $('.popup__wrap').animate({
                            top: '-' + last_alert_height + 'px'
                        }, 800, function () {
                            setTimeout(function () {
                                $('.popup__wrap > div:first-child').css({
                                    opacity: 1
                                });
                                $('.popup__wrap').animate({
                                    top: 0
                                });
                                setTimeout(function () {
                                    $('.popup__wrap > div:last-child').css({
                                        opacity: 0
                                    });
                                    setTimeout(function () {
                                        $('.popup__wrap > div:first-child').css({
                                            opacity: 0
                                        });
                                        setTimeout(function () {
                                            $.magnificPopup.close();
                                        }, 800)
                                    }, 800);
                                }, 3000);
                            }, 800);
                        });
                    }
                });
            },
            close: function () {
                $('html, body').css('overflow', 'auto');
                $(".popup-container").html(""); //очистить содержимое попапа после закрытия
            }
        },
        midClick: true
    });

    if ($(".open-chat").length) {
        $('.open-chat').magnificPopup({//https://dimsemenov.com/plugins/magnific-popup/documentation.html#inline-type
            removalDelay: 500, //задержка перед закрытием попапа
            showCloseBtn: false, //не показывать крестик по умолчанию
            src: '#popup_chat',
            callbacks: { //определение функций обратного вызова
                beforeOpen: function () { //событие срабатывает до открытия модального окна
                    var target = this;
                    this.st.mainClass = this.st.el.attr('data-effect');
                    $('html, body').css('overflow', 'hidden');
                    if ($('.chat').length) {
                        $('.popup__wrap .chat__messages').scrollTop($('.popup__wrap .chat__messages')[0].scrollHeight);
                    }
                },
                close: function () {
                    $('html, body').css('overflow', 'auto');
                }
            },
            midClick: true
        });
    }

    $('body').on('click', '.popup__close, .close-modal', function () {
        $.magnificPopup.close();
    });

    $('body').on('click', '.popup__wallet', function (e) {
        e.preventDefault();
        $(this).closest('.popup__wallets')
            .find('.popup__wallet')
            .removeClass('popup__wallet_active');
        $(this).addClass('popup__wallet_active');
    });

    $("form").validate({
        rules: {
            wallet: {
                required: true
            }
        },
        messages: {
            wallet: {
                required: "Это поле обязательно для заполнения"
            }
        }
    });

    $('.help__question').click(function () {
        $(this).next().slideToggle();
        $(this).toggleClass('help__question_active');
    });

    // мобильная версия
    $('body').on('touchstart', '#balance__count_value', function (e) {
        $(this).nextAll('.balance__count-hover').toggleClass('visible');
    });

    $('body').on('touchstart', '.menu__burger', function (e) {
        e.preventDefault();
        $(this).next().fadeIn();
    });

    $('body').on('touchstart', '.menu__close', function (e) {
        e.preventDefault();
        $(this).closest('.menu__container').fadeOut();
    });

    /*Промокод таблица*/
    $('body').on('click', '.promocode .table a', function (e) {
        e.preventDefault();
        $(this).toggleClass('promocode__table__link_active');
        if ($(this).hasClass('promocode__table__link_active')) {
            $(this).html('Скрыть');
        }
        else {
            $(this).html('Показать');
        }
        $(this).closest('tr').toggleClass('table__row_bg_none');
        $(this).closest('tr').next().toggle();
    });

    /*Плавное появление сообщений*/
    if ($('.chat').length) {
        $('.chat__messages').scrollTop($('.chat__messages')[0].scrollHeight);
    }

    jQuery.easing.def = 'easeOutCubic';

    $('body').on('click', '.content .chat__footer a:not(.open-modal), .popup_chat .chat__footer a:not(.open-modal)', function (e) {
        e.preventDefault();
        var $chat_messages = $(this).closest('.chat').find('.chat__messages');
        var message = $(this).closest('.chat__footer').find('#message').val();
        var message_error = 'Вам запрещено писать в чат ещё 20 лет 30 дней 10 часов и 23 минуты';
        if (message) {
            $(this).closest('.chat__footer').find('#message').val('');
            $($chat_messages).children('div').append('<div class="chat__message chat__message_user"><div class="chat__message-username">BitkoinMaster</div><div class="chat__message-text">' + message + '</div></div>');
            $($chat_messages).animate({
                scrollTop: $($chat_messages)[0].scrollHeight
            }, 800);
        }
        else {
            if (!$($chat_messages).find('.chat__message:last-child').hasClass('chat__message_error')) {
                $($chat_messages).children('div').append('<div class="chat__message chat__message_error"><div class="chat__message-text">' + message_error + '</div></div>');
                const fadeIn = { opacity: 1 };
                $('.chat__message_error').animate(fadeIn, 800);
                $($chat_messages).animate({
                    scrollTop: $($chat_messages)[0].scrollHeight
                }, 800);
                function handler(e) {
                    if (!$(e.target).closest('.chat').length) {
                        clearTimeout(chat__message_error_fade_timeout);
                        const fadeOut = { opacity: 0, height: 0, 'padding-top': 0, 'padding-bottom': 0 };
                        $($chat_messages).find('.chat__message_error').animate(fadeOut, 800, function () {
                            $(this).remove();
                        });
                    }
                }
                $('body').on('click', handler);
                var chat__message_error_fade_timeout = setTimeout(function () {
                    const fadeOut = { opacity: 0, height: 0, 'padding-top': 0, 'padding-bottom': 0 };
                    $($chat_messages).find('.chat__message_error').animate(fadeOut, 800, function () {
                        $(this).remove();
                    });
                }, 3000);
            }
        }
    });


    /*анимированное изменение баланса*/
    $('.balance__item img').click(function () {
        var balance_count = parseInt($('#balance__count_value').html().replace(/\s+/g, ''));
        var new_balance_count = balance_count + 300;
        var balance__count_value = new CountUp('balance__count_value', balance_count, new_balance_count, 0, 0.6, {
            separator: ' '
        });
        balance__count_value.start();
        $('.balance__count_increment').remove();
        $(this).closest('.balance__items').find('.balance__count').append('<div class="balance__count_increment">+300</div>');
    });

    $('.balance__count').click(function () {
        var balance_count = parseInt($('#balance__count_value').html().replace(/\s+/g, ''));
        var new_balance_count = balance_count - 200;
        var balance__count_value = new CountUp('balance__count_value', balance_count, new_balance_count, 0, 0.6, {
            separator: ' '
        });
        balance__count_value.start();
        $('.balance__count_decrement').remove();
        $(this).append('<div class="balance__count_decrement">-200</div>');
    });


    /*анимация table*/
    $('body').on('click touchstart', '.stat__table td', function () {
        if ($(this).closest('tbody').find('tr:first-child').hasClass('table_row_bg_false')) {
            $tr = '<tr><td><div>OberBober</div></td><td><div>10<svg class="icon icon-green-invert"><use xlink:href="/assets/sprite.svg#green-invert"></use></svg></div></td><td><div>X32</div></td><td><div>320<svg class="icon icon-green-invert"><use xlink:href="/assets/sprite.svg#green-invert"></use></svg></div></td></tr>';
            $(this).closest('tbody').prepend($tr);
            $(this).closest('tbody').find('tr:first-child').addClass('table_row_bg_true');
            $(this).closest('tbody').find('tr:first-child div').css({
                opacity: 0
            }).hide();
        }
        else {
            $tr = '<tr><td><div>Lil Dick</div></td><td><div>50<svg class="icon icon-green-invert"><use xlink:href="/assets/sprite.svg#green-invert"></use></svg></div></td><td><div>X16</div></td><td><div>800<svg class="icon icon-green-invert"><use xlink:href="/assets/sprite.svg#green-invert"></use></svg></div></td></tr>';
            $(this).closest('tbody').prepend($tr);
            $(this).closest('tbody').find('tr:first-child').addClass('table_row_bg_false');
            $(this).closest('tbody').find('tr:first-child div').css({
                opacity: 0
            }).hide();
        }
        const fadeIn = { opacity: 1 };
        $(this).closest('tbody').find('tr:first-child td div')
            .slideDown(300)
            .animate(
                {
                    opacity: 1
                },
                {
                    queue: false,
                    duration: 500
                }
            );
        $(this).closest('tbody').find('tr:last-child').remove();
    });

    $('body').on('keydown', '.input_disable', function (e) {
        e.preventDefault();
    });


    // crash
    var is_win;
    $('body').on('click', '.crash__rate', function (e) {
        e.preventDefault();
        $(this).closest('.crash__rates')
            .find('.crash__rate')
            .removeClass('crash__rate_active');
        $(this).addClass('crash__rate_active');
        var countg = $(this).html();
        $(this).closest('.crash').find('.button_lg span').html(countg);
    });


    $('body').on('click', '.crash .button_lg.button_waiting', function (e) {
        $(this).find('i').html('Забрать');
        $(this).attr('disabled', 'disabled').removeClass('button_waiting').addClass('button_progress');
    });

    $('body').on('click', '.crash .button_lg.button_progress', function (e) {
        is_win = true;
        //изменения на балансе
        var balance_count = parseInt($('#balance__count_value').html().replace(/\s+/g, ''));
        var win_count = parseInt($('.crash .button_lg span').html());
        var new_balance_count = balance_count + win_count;
        var balance__count_value = new CountUp('balance__count_value', balance_count, new_balance_count, 0, 0.6, {
            separator: ' '
        });
        var crash__timer_stop = parseFloat($('#crash__timer_multiplier').html());
        $('.crash__bg').addClass('crash__bg_win');
        $('.crash__timer_multiplier').addClass('crash__timer_win');
        $(this).removeClass('button_progress');
        $(this).find('i').html('Поставить');
        $(this).find('span').html($('.crash__rate_active').html());
        balance__count_value.start();
        $('.balance__count_increment').remove();
        $('.balance__item img').closest('.balance__items').find('.balance__count').append('<div class="balance__count_increment">+' + win_count + '</div>');

        //добавление выиграша в историю
        $('.crash__history ul')
            .prepend('<li><a class="crash__history_win" href="#">X' + crash__timer_stop + '</a></li>');
        if (window.matchMedia('(min-width: 381px)').matches) {
            var crash_history_margin_css = '-36px';
        }
        else {
            var crash_history_margin_css = '-35px';
        }
        $('.crash__history li:first-child')
            .css('margin-left', crash_history_margin_css);
    });


    if ($('.crash').length) {
        var target = $('.crash .button_lg');
        $('.crash .button_lg').addClass('button_waiting');
        var multiplier = parseFloat($('#crash_stop').val());
        var crash__timer = parseInt($('#crash__timer').html());
        const easing_out = function (t, b, c, d) {
            var ts = (t /= d) * t;
            var tc = ts * t;
            return b + c * (tc + -3 * ts + 3 * t);
        }
        const linear = function (t, b, c, d) {
            var ts = (t /= d);
            return b + c * (ts);
        }
        var crash__timer_waiting = new CountUp('crash__timer', crash__timer, 0, 2, 9.99, {
            separator: '',
            decimalPlaces: 2,
            easingFn: linear
        });
        crash__timer_waiting.start(function () {
            var random_number_for_img = random_integer(1, 3);
            var img_src = '', img_drive_total_width, img_crash_total_width, img_width, img_height, img_to_drive, img_to_crash, img_fps;
            if (random_number_for_img == 1) {
                img_src_drive = '/assets/tank_drive/tank_drive.png';
                img_src_crash = '/assets/tank_crash/tank_crash.png';
                img_width = 135;
                img_height = 91;
                img_drive_total_width = 1755;
                img_crash_total_width = 1485;
                img_to_drive = 13;
                img_to_crash = 11;
                img_fps = 7;
                $('#img_drive').css({
                    bottom: 0,
                    right: 0
                });
                $('#img_crash').css({
                    bottom: 0,
                    right: 0
                });
            }
            else if (random_number_for_img == 2) {
                img_src_drive = '/assets/car_drive/car_drive.png';
                img_src_crash = '/assets/car_crash/car_crash.png';
                img_width = 195;
                img_height = 47;
                img_drive_total_width = 2925;
                img_crash_total_width = 1950;
                img_to_drive = 10;
                img_to_crash = 10;
                img_fps = 15;
                $('#img_drive').css({
                    bottom: '-1px',
                    right: '-1px'
                });
                $('#img_crash').css({
                    bottom: '-1px',
                    right: '-1px'
                });
            }
            else {
                img_src_drive = '/assets/dozer_drive/dozer_drive.png';
                img_src_crash = '/assets/dozer_crash/dozer_crash.png';
                img_width = 117;
                img_height = 72;
                img_drive_total_width = 1521;
                img_crash_total_width = 1521;
                img_to_drive = 13;
                img_to_crash = 13;
                img_fps = 10;
                $('#img_drive').css({
                    bottom: 0,
                    right: 0
                });
                $('#img_crash').css({
                    bottom: 0,
                    right: 0
                });
            }
            $('#img_crash').hide();
            var img_drive = new Sprite({
                src: img_src_drive,
                id: 'img_drive',
                width: img_width,
                height: img_height,
                image_width: img_drive_total_width,
                err: true
            });
            img_drive.play({
                fps: img_fps,
                from: 1,
                to: img_to_drive,
                n: 0,
                step: function (e) {
                    if ($('.crash__bg').hasClass('crash__bg_fail')) {
                        if (e == 1) {
                            var img_crash = new Sprite({
                                src: img_src_crash,
                                id: 'img_crash',
                                width: img_width,
                                height: img_height,
                                image_width: img_crash_total_width,
                                err: true
                            });
                            img_drive.pause();
                            setTimeout(function () {
                                $('#img_drive').hide();
                                img_crash.play({
                                    fps: 10,
                                    from: 1,
                                    to: img_to_crash,
                                    n: 1
                                });
                                $('#img_crash').show();
                            }, 300);
                        }
                    }
                }
            });
            $('.crash__progress__right').append('<div class="crash__timer crash__timer_multiplier"><p>X<span id="crash__timer_multiplier">1.00</span></p></div>');
            $('.crash__timer_waiting').animate({
                opacity: 0
            }, 300);
            $('.crash__timer_multiplier').animate({
                opacity: 1
            }, 300, function () {
                $('.crash .button_lg').removeClass('button_waiting').removeAttr('disabled');
                // первый уровень: проверка ширины экрана
                if (window.matchMedia('(max-width: 380px)').matches) {
                    $('.crash__progress__left').css('width', '180px');
                    $('.crash__progress').css('left', '-180px');
                    var offset_left = '-105px';
                }
                else if (window.matchMedia('(max-width: 1140px)').matches) {
                    $('.crash__progress__left').css('width', '220px');
                    $('.crash__progress').css('left', '-220px');
                    var offset_left = '-145px';
                }
                else {
                    $('.crash__progress__left').css('width', '280px');
                    $('.crash__progress').css('left', '-280px');
                    var offset_left = '-115px';
                }
                $('.crash__progress__right').css('position', 'relative');
                crash__timer = parseInt($('#crash__timer').html());
                var crash__timer_multiplier = new CountUp('crash__timer_multiplier', 1, 2, 2, 4, {
                    separator: '',
                    decimalPlaces: 2,
                    easingFn: linear
                });

                var rate = parseFloat($('.crash__rate_active').html());

                $('.crash__progress').animate(
                    {
                        left: offset_left
                    },
                    {
                        duration: 4000,
                        easing: 'linear',
                        progress: function () {
                            var multiplier = parseFloat($('#crash__timer_multiplier').html());
                            win_count = parseInt(multiplier * rate);
                            $('.crash .button_lg.button_progress span').html(win_count);
                        }
                    }
                );
                crash__timer_multiplier.start(function () {
                    //второй уровень до 3. Проверка ширины экрана
                    if (multiplier > 2) {
                        crash__timer_multiplier = new CountUp('crash__timer_multiplier', 2, 3, 2, 3, {
                            separator: '',
                            decimalPlaces: 2,
                            easingFn: linear
                        });
                        if (window.matchMedia('(min-width: 1141px)').matches) {
                            offset_left = '-17px';
                            var animation_duration = 3000;
                        }
                        else if (window.matchMedia('(min-width: 381px)').matches) {
                            offset_left = '-47px';
                            var animation_duration = 3000;
                        }
                        else {
                            offset_left = '-35px';
                            var animation_duration = 3000;
                        }
                        $('.crash__progress').animate(
                            {
                                left: offset_left
                            },
                            {
                                duration: animation_duration,
                                easing: 'linear',
                                progress: function () {
                                    var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                    win_count = parseInt(multiplier * rate);
                                    $('.crash .button_lg.button_progress span').html(win_count);
                                }
                            }
                        );
                        crash__timer_multiplier.start(function () {
                            // третий уровень. До 4
                            if (multiplier > 3) {
                                crash__timer_multiplier = new CountUp('crash__timer_multiplier', 3, 4, 2, 2, {
                                    separator: '',
                                    decimalPlaces: 2,
                                    easingFn: linear
                                });
                                // проверка ширины экрана
                                if (window.matchMedia('(min-width: 1141px)').matches) {
                                    $('.crash__progress').animate(
                                        {
                                            left: 0
                                        },
                                        {
                                            duration: 800,
                                            easing: 'linear',
                                            progress: function () {
                                                var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                win_count = parseInt(multiplier * rate);
                                                $('.crash .button_lg.button_progress span').html(win_count);
                                            }
                                        }
                                    );
                                    setTimeout(function () {
                                        $('.crash__board').animate(
                                            {
                                                scrollLeft: 79
                                            },
                                            {
                                                duration: 1200,
                                                queue: false,
                                                easing: 'linear',
                                                progress: function () {
                                                    var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                    win_count = parseInt(multiplier * rate);
                                                    $('.crash .button_lg.button_progress span').html(win_count);
                                                }
                                            }
                                        );
                                    }, 800);
                                }
                                else if (window.matchMedia('(min-width: 381px)').matches) {
                                    $('.crash__progress').animate(
                                        {
                                            left: 0
                                        },
                                        {
                                            duration: 1000,
                                            easing: 'linear',
                                            progress: function () {
                                                var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                win_count = parseInt(multiplier * rate);
                                                $('.crash .button_lg.button_progress span').html(win_count);
                                            }
                                        }
                                    );
                                    setTimeout(function () {
                                        $('.crash__board').animate(
                                            {
                                                scrollLeft: 49
                                            },
                                            {
                                                duration: 1000,
                                                queue: false,
                                                easing: 'linear',
                                                progress: function () {
                                                    var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                    win_count = parseInt(multiplier * rate);
                                                    $('.crash .button_lg.button_progress span').html(win_count);
                                                }
                                            }
                                        );
                                    }, 1000);
                                }
                                else {
                                    $('.crash__progress').animate(
                                        {
                                            left: '0'
                                        },
                                        {
                                            duration: 1000,
                                            easing: 'linear',
                                            progress: function () {
                                                var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                win_count = parseInt(multiplier * rate);
                                                $('.crash .button_lg.button_progress span').html(win_count);
                                            }
                                        }
                                    );
                                    setTimeout(function () {
                                        $('.crash__board').animate(
                                            {
                                                scrollLeft: 33
                                            },
                                            {
                                                duration: 1000,
                                                queue: false,
                                                easing: 'linear',
                                                progress: function () {
                                                    var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                    win_count = parseInt(multiplier * rate);
                                                    $('.crash .button_lg.button_progress span').html(win_count);
                                                }
                                            }
                                        );
                                    }, 1000);
                                }
                                crash__timer_multiplier.start(function () {
                                    if (multiplier > 4) {
                                        crash__timer_multiplier = new CountUp('crash__timer_multiplier', 4, 5, 2, 2, {
                                            separator: '',
                                            decimalPlaces: 2,
                                            easingFn: linear
                                        });
                                        if (window.matchMedia('(min-width: 1141px)').matches) {
                                            var scrollLeft = 177;
                                        }
                                        else if (window.matchMedia('(min-width: 381px)').matches) {
                                            var scrollLeft = 147;
                                        }
                                        else {
                                            var scrollLeft = 103;
                                        }
                                        $('.crash__board').animate(
                                            {
                                                scrollLeft: scrollLeft
                                            },
                                            {
                                                duration: 2000,
                                                queue: false,
                                                easing: 'linear',
                                                progress: function () {
                                                    var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                    win_count = parseInt(multiplier * rate);
                                                    $('.crash .button_lg.button_progress span').html(win_count);
                                                }
                                            }
                                        );
                                        crash__timer_multiplier.start(function () {
                                            if (multiplier > 5) {
                                                crash__timer_multiplier = new CountUp('crash__timer_multiplier', 5, 6, 2, 2, {
                                                    separator: '',
                                                    decimalPlaces: 2,
                                                    easingFn: linear
                                                });
                                                if (window.matchMedia('(min-width: 1141px)').matches) {
                                                    scrollLeft = 275;
                                                }
                                                else if (window.matchMedia('(min-width: 381px)').matches) {
                                                    scrollLeft = 245;
                                                }
                                                else {
                                                    scrollLeft = 173;
                                                }
                                                $('.crash__board').animate(
                                                    {
                                                        scrollLeft: scrollLeft
                                                    },
                                                    {
                                                        duration: 2000,
                                                        queue: false,
                                                        easing: 'linear',
                                                        progress: function () {
                                                            var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                            win_count = parseInt(multiplier * rate);
                                                            $('.crash .button_lg.button_progress span').html(win_count);
                                                            var crash__timer_stop = parseFloat($('#crash__timer_multiplier').html());
                                                        }
                                                    }
                                                );
                                                crash__timer_multiplier.start(function () {
                                                    if (multiplier > 6) {
                                                        crash__timer_multiplier = new CountUp('crash__timer_multiplier', 6, 7, 2, 2, {
                                                            separator: '',
                                                            decimalPlaces: 2,
                                                            easingFn: linear
                                                        });
                                                        if (window.matchMedia('(min-width: 1141px)').matches) {
                                                            scrollLeft = 372;
                                                        }
                                                        else if (window.matchMedia('(min-width: 381px)').matches) {
                                                            scrollLeft = 342;
                                                        }
                                                        else {
                                                            scrollLeft = 242;
                                                        }
                                                        $('.crash__board').animate(
                                                            {
                                                                scrollLeft: scrollLeft
                                                            },
                                                            {
                                                                duration: 2000,
                                                                queue: false,
                                                                easing: 'linear',
                                                                progress: function () {
                                                                    var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                                    win_count = parseInt(multiplier * rate);
                                                                    $('.crash .button_lg.button_progress span').html(win_count);
                                                                }
                                                            }
                                                        );
                                                        crash__timer_multiplier.start(function () {
                                                            if (multiplier > 7) {
                                                                crash__timer_multiplier = new CountUp('crash__timer_multiplier', 7, 8, 2, 2, {
                                                                    separator: '',
                                                                    decimalPlaces: 2,
                                                                    easingFn: linear
                                                                });
                                                                if (window.matchMedia('(min-width: 1141px)').matches) {
                                                                    scrollLeft = 468;
                                                                }
                                                                else if (window.matchMedia('(min-width: 381px)').matches) {
                                                                    scrollLeft = 438;
                                                                }
                                                                else {
                                                                    scrollLeft = 310;
                                                                }
                                                                $('.crash__board').animate(
                                                                    {
                                                                        scrollLeft: scrollLeft
                                                                    },
                                                                    {
                                                                        duration: 2000,
                                                                        queue: false,
                                                                        easing: 'linear',
                                                                        progress: function () {
                                                                            var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                                            win_count = parseInt(multiplier * rate);
                                                                            $('.crash .button_lg.button_progress span').html(win_count);
                                                                        }
                                                                    }
                                                                );
                                                                crash__timer_multiplier.start(function () {
                                                                    if (multiplier > 8) {
                                                                        crash__timer_multiplier = new CountUp('crash__timer_multiplier', 8, 9, 2, 2, {
                                                                            separator: '',
                                                                            decimalPlaces: 2,
                                                                            easingFn: linear
                                                                        });
                                                                        if (window.matchMedia('(min-width: 1141px)').matches) {
                                                                            scrollLeft = 565;
                                                                        }
                                                                        else if (window.matchMedia('(min-width: 381px)').matches) {
                                                                            scrollLeft = 535;
                                                                        }
                                                                        else {
                                                                            scrollLeft = 379;
                                                                        }
                                                                        $('.crash__board').animate(
                                                                            {
                                                                                scrollLeft: scrollLeft
                                                                            },
                                                                            {
                                                                                duration: 2000,
                                                                                queue: false,
                                                                                easing: 'linear',
                                                                                progress: function () {
                                                                                    var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                                                    win_count = parseInt(multiplier * rate);
                                                                                    $('.crash .button_lg.button_progress span').html(win_count);
                                                                                }
                                                                            }
                                                                        );
                                                                        crash__timer_multiplier.start(function () {
                                                                            if (multiplier > 9) {
                                                                                crash__timer_multiplier = new CountUp('crash__timer_multiplier', 9, 10, 2, 2, {
                                                                                    separator: '',
                                                                                    decimalPlaces: 2,
                                                                                    easingFn: linear
                                                                                });
                                                                                if (window.matchMedia('(min-width: 1141px)').matches) {
                                                                                    scrollLeft = 670;
                                                                                }
                                                                                else if (window.matchMedia('(min-width: 381px)').matches) {
                                                                                    scrollLeft = 630;
                                                                                }
                                                                                else {
                                                                                    scrollLeft = 456;
                                                                                }
                                                                                $('.crash__board').animate(
                                                                                    {
                                                                                        scrollLeft: scrollLeft
                                                                                    },
                                                                                    {
                                                                                        duration: 2000,
                                                                                        queue: false,
                                                                                        easing: 'linear',
                                                                                        progress: function () {
                                                                                            var multiplier = parseFloat($('#crash__timer_multiplier').html());
                                                                                            win_count = parseInt(multiplier * rate);
                                                                                            $('.crash .button_lg.button_progress span').html(win_count);
                                                                                        }
                                                                                    }
                                                                                );
                                                                                crash__timer_multiplier.start(function () {
                                                                                    $(target)
                                                                                        .attr('disabled', 'disabled')
                                                                                        .removeClass('button_progress');

                                                                                    $('.crash__bg')
                                                                                        .removeClass('crash__bg_win')
                                                                                        .addClass('crash__bg_fail');
                                                                                    $('.crash__timer_multiplier')
                                                                                        .removeClass('crash__timer_win')
                                                                                        .addClass('crash__timer_fail');
                                                                                    crash__timer_multiplier.pauseResume();
                                                                                    $('.crash__board').stop(true);
                                                                                    if (!is_win) {
                                                                                        var balance_count = parseInt($('#balance__count_value').html().replace(/\s+/g, ''));
                                                                                        var fail_count = parseInt($('.crash__rate_active').html());
                                                                                        var new_balance_count = balance_count - fail_count;
                                                                                        var balance__count_value = new CountUp('balance__count_value', balance_count, new_balance_count, 0, 0.6, {
                                                                                            separator: ' '
                                                                                        });
                                                                                        balance__count_value.start();
                                                                                        $('.balance__count_decrement').remove();
                                                                                        $('.balance__item img').closest('.balance__items').find('.balance__count').append('<div class="balance__count_decrement">-' + fail_count + '</div>');
                                                                                    }
                                                                                    setTimeout(function () {
                                                                                        $('.crash__board').animate(
                                                                                            {
                                                                                                scrollLeft: 0
                                                                                            },
                                                                                            {
                                                                                                duration: 1000,
                                                                                                queue: false,
                                                                                                easing: 'linear'
                                                                                            }
                                                                                        );
                                                                                        $('.crash__progress').animate(
                                                                                            {
                                                                                                left: '-290px'
                                                                                            },
                                                                                            {
                                                                                                duration: 1000,
                                                                                                queue: false,
                                                                                                easing: 'linear',
                                                                                                complete: function () {
                                                                                                    $('#crash__timer').html(9.99);
                                                                                                    $('.crash__progress__left').css('width', '0');
                                                                                                    $('.crash__progress').css('left', '0');
                                                                                                    $('.crash__progress__right').css('position', 'static');
                                                                                                    $('.crash__timer_multiplier').animate({
                                                                                                        opacity: 0
                                                                                                    }, 300);
                                                                                                    $('.crash__timer_waiting').animate({
                                                                                                        opacity: 1
                                                                                                    }, 300, function () {
                                                                                                        $('.crash__timer:not(.crash__timer_waiting)').remove();
                                                                                                        $('.crash__bg')
                                                                                                            .removeClass('crash__bg_fail');
                                                                                                        $(target).removeAttr('disabled');
                                                                                                        $(target).find('i').html('Поставить');
                                                                                                        $(target).find('span').html($('.crash__rate_active').html());
                                                                                                    });
                                                                                                    if (window.matchMedia('(min-width: 381px)').matches) {
                                                                                                        var crash_history_margin_css = '-36px';
                                                                                                        var crash_history_margin_animate = '29px';
                                                                                                    }
                                                                                                    else {
                                                                                                        var crash_history_margin_css = '-31px';
                                                                                                        var crash_history_margin_animate = '24px';
                                                                                                    }
                                                                                                    if (!is_win) {
                                                                                                        $('.crash__history ul')
                                                                                                            .prepend('<li><a class="crash__history_fail" href="#">X10.00</a></li>');

                                                                                                        $('.crash__history li:first-child')
                                                                                                            .css('margin-left', crash_history_margin_css);
                                                                                                        $('.crash__history li:first-child')
                                                                                                            .animate(
                                                                                                                {
                                                                                                                    'margin-left': crash_history_margin_animate
                                                                                                                },
                                                                                                                {
                                                                                                                    duration: 300,
                                                                                                                    easing: 'linear',
                                                                                                                    complete: function () {
                                                                                                                        $('.crash__history li:last-child').remove();
                                                                                                                    }
                                                                                                                }
                                                                                                            );
                                                                                                    }
                                                                                                    else {
                                                                                                        $('.crash__history li:first-child')
                                                                                                            .animate(
                                                                                                                {
                                                                                                                    'margin-left': crash_history_margin_animate
                                                                                                                },
                                                                                                                {
                                                                                                                    duration: 300,
                                                                                                                    easing: 'linear',
                                                                                                                    complete: function () {
                                                                                                                        $('.crash__history li:last-child').remove();
                                                                                                                    }
                                                                                                                }
                                                                                                            );
                                                                                                    }
                                                                                                    is_win = false;
                                                                                                }
                                                                                            }
                                                                                        );
                                                                                    }, 3000);
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }

                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        });
    }

    /*checkbox в партнерке*/
    $('.partnerkaTerms .form input').change(function () {
        if ($(this).prop('checked')) {
            $(this).closest('.form').find('.button').removeAttr('disabled');
        }
        else {
            $(this).closest('.form').find('.button').attr('disabled', 'disabled');
        }
    });

    /*переключение табов в модалке пополнения и вывода*/
    $('body').on('click', '.popup__tab a', function (e) {
        e.preventDefault();
        $('.popup__tab a').parent().removeClass('popup__tab_active');
        $(this).parent().addClass('popup__tab_active');
        $('.popup__tabElem').hide();
        $('.popup__tabElem').eq($(this).parent().index()).fadeIn();
    });
});

$(window).on('load', function () {
    $('body').addClass('html_loaded');
});

//functions
function random_integer(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}
$('body').on('click', '[href*="#"]', function (e) {
    return false;
});
$('body').on('click', '.gameboard__button-group .button', function (e) {
    return false;
});
function randomRoulette() {
    let i = 1;
    var red = [];
    var black = [];
    let zero = [1];

    let circ = 360;
    let items = 15;
    var CountDeg = 360 / items;
    let el = $('#roulette');

    $('body').on('click', '.button_red:not(.disabled.active)', function (e) {
        $('#timer').addClass('active');
        $(this).addClass('active');
        var _Seconds = $('.seconds').text(),
            int;
        int = setInterval(function () { // запускаем интервал
            if (_Seconds > 0) {
                _Seconds--; // вычитаем 1
                $('.seconds').text(_Seconds); // выводим получившееся значение в блок
                $('#timer').show();

            } else {
                $('.gameboard__button-group .button').parent().find('.button').addClass('disabled');
                $('.live-double__body').html();
                $('#timer').html('<span>Идёт игра...</span>');
                clearInterval(int); // очищаем интервал, чтобы он не продолжал работу при _Seconds = 0
                while (i <= items) {
                    if (!(i % 2)) {
                        red.push(i);
                    }
                    i++;
                }
                setTimeout(function () {
                    var RandRed = Math.floor(Math.random() * red.length);
                    var deg = circ * 3 + CountDeg * (RandRed + 3);
                    var css = 'transform: rotate(' + deg + 'deg);';
                    
                    setTimeout(function () {
                        $('#timer').hide();
                        $('.circle-wrap .circle').addClass('red');
                        $('.gameboard__button-group .button').parent().find('.button').removeClass('disabled');
                    }, 5000);

                    el.attr('style', css);
                }, 1);
            }
        }, 1000);
    });
    // $('body').on('click', '.button_black:not(.disabled)', function (e) {
    //     while (i <= items) {
    //         if ((i % 2)) {
    //             black.push(i);
    //         }
    //         i++;
    //     }
    //     setTimeout(function () {
    //         var RandBlack = Math.floor(Math.random() * black.length);
    //         var deg = circ * 3 + CountDeg * (RandBlack + 2);
    //         var css = 'transform: rotate(' + deg + 'deg);';
    //         el.attr('style', css);
    //     }, 1);
    // });
    // $('body').on('click', '.button.zero:not(.disabled)', function (e) {
    //     var deg = circ * 3 + 1 * CountDeg;
    //     var css = 'transform: rotate(' + deg + 'deg);';
    //     el.attr('style', css);
    // });
    el.removeAttr('style');
}

randomRoulette();

