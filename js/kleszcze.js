$.fn.fancyzoom.defaultsOptions.imgDir='../img/fancyzoom/';

$(document).ready(function() {
    if($.fn.parallax && $('#parallax').is('div')) {
        $('#parallax').parallax({
            'elements': [
                {
                    'selector': '#par1',
                    'properties': {
                        'x': {
                            'left': {
                                'initial': -419,
                                'multiplier': 0.1
                            }
                        }
                    }
                },
                {
                    'selector': '#par2',
                    'properties': {
                        'x': {
                            'left': {
                                'initial': -28,
                                'multiplier': 0.02
                            }
                        }
                    }
                }
            ]
        })
    }
    
    $('div.select > select').change(function() {
        $(this).parent().children('span').text($(this).children('option[value="' + $(this).val() + '"]').text());
    });
    $('div.select > select').change();
    
    $('dl.form > dt:not(.free) + dd > input[class^="text"], dl.form > dt:not(.free) + dd > textarea').blur(function(e) {
        if($(this).val() == '' || ($(this).attr('id').match(/^.?email$/) && !$(this).val().match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i))) {
            $(this).parent().addClass('invalid' + ($(this).is('textarea') ? '-textarea' : ''));
        } else {
            $(this).parent().removeClass('invalid').removeClass('invalid-textarea');
        }
    });
    
    $('form.submit').submit(function(e) {
        var valid = true;
        $(this).find('dl.form > dt:not(.free) + dd > input[class^="text"], dl.form > dt:not(.free) + dd > textarea').each(function(i) {
            if($(this).val() == '' || ($(this).attr('id').match(/^.?email$/) && !$(this).val().match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i))) {
                valid = false;
            $(this).parent().addClass('invalid' + ($(this).is('textarea') ? '-textarea' : ''));
        } else {
            $(this).parent().removeClass('invalid').removeClass('invalid-textarea');
            }
        });
        if(!valid) {
            e.preventDefault();
        }
    });
    
    $('dl.zoom img, img.zoom').parent().fancyzoom();
    $('dl.zoom, img.zoom').each(function() {
        var zoomrand = (Math.random() * 100000000000000000).toString();
        var zoomicon = $('<div class="imgzoom" id="z' + zoomrand + '"></div>').mouseover(function() {
            $(this).show();
        }).click(function() {
            if($(this).is('img')) {
                $('#i' + $(this).attr('id')).parents('a').click();
            } else {
                $('#i' + $(this).attr('id')).find('a').click();
            }
        });
        $(document.body).append(zoomicon);
        zoomicon.css('top', $(this).offset().top + 10).css('left', $(this).offset().left + $(this).width() - 36);
        $(this).data('zoomrand', zoomrand).attr('id', 'iz' + zoomrand);
    });
    $('dl.zoom, img.zoom').mouseover(function() {
        $('#z' + $(this).data('zoomrand')).show();
    }).mouseout(function() {
        $('#z' + $(this).data('zoomrand')).hide();
    });
    
    $('#menu li.search input').data('def', $('#menu li.search input').val()).focus(function() {
        if($(this).val() == $(this).data('def')) {
            $(this).val('');
        }
    }).blur(function() {
        if($(this).val() == '') {
            $(this).val($(this).data('def'));
        }
    });
    
    if($.browser.msie && $.browser.version.substr(0,1) < 7) {
        $('#content div.right ul.searchresults li').mouseover(function() {
            $(this).addClass('hover');
        }).mouseout(function() {
            $(this).removeClass('hover');
        });
        $('button.submit, #menu li.search button').mouseover(function() {
            $(this).addClass('submit-hover');
        }).mouseout(function() {
            $(this).removeClass('submit-hover');
        });
    }
    
    $('#slider li a').lightBox();
    
    $('#slider li img').mouseover(function() {
        $(this).parents('li').css('z-index', '1000');
        $(this).animate({
            marginLeft: -25,
            marginRight: -25,
            marginTop: -18,
            marginBottom: -18,
            width: 150,
            height: 105
        });
    }).mouseout(function() {
        $(this).parents('li').css('z-index', '999');
        $(this).animate({
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
            width: 100,
            height: 70
        }, function() {
            $(this).parents('li').css('z-index', '0');
        });
    });
    
    if($('img.map').is('img')) {
        $('.map').maphilight({fade: false, fill: true, fillColor: '82cf88', fillOpacity: 1, stroke: false})
        $('div.country_info a.close').click(function(e) {
            e.preventDefault();
            $(this).parent().fadeOut(function() {
                $('#mask').hide();
            });
        });
        $('area').click(function(e) {
            e.preventDefault();
            $('#mask').height($('#wrapper').height()).show();
            var item = $($(this).attr('href'));
            item.fadeIn();
            item.css('top', ($(window).scrollTop() + ($(window).height() / 2) - (item.height() / 2)).toString() + 'px');
        }).mousemove(function(e) {
            $('#maphover').show().css('top', ($(window).scrollTop() + e.clientY - 34).toString() + 'px').css('left', (e.clientX + 2).toString() + 'px').text($(this).attr('title'));
        }).mouseout(function(e) {
            $('#maphover').hide();
        });
    }
    
    $('#quiz a.next').click(function(e) {
        e.preventDefault();
        if($(this).parent().find('input[type=radio]:checked').is('input')) {
            $('#quiz > ul').animate({'margin-left': '-=629'}, function() {
                if(parseInt($('#quiz > ul').css('margin-left')) < -6200) {
                    if(!($('#quiz input[type=radio][value=yes]:checked').is('input')) || !($('#q1_no:checked, #quiz input[type=radio][value=yes]:not(#q1_yes):checked').is('input')) || !($('#q2_no:checked, #quiz input[type=radio][value=yes]:not(#q2_yes):checked').is('input'))) {
                        $('#quiz .low').show();
                    } else if(!($('#q1_no:checked, #q2_no:checked, #quiz input[type=radio][value=yes]:not(#q1_yes,#q2_yes):checked').is('input'))) {
                        $('#quiz .middle').show();
                    } else {
                        $('#quiz .high').show();
                    }
                }
            });
        }
    });
    $('#quiz a.prev').click(function(e) {
        e.preventDefault();
        $('#quiz > ul').animate({'margin-left': '+=629'});
    });
    $('#quiz a.again').click(function(e) {
        e.preventDefault();
        $('#quiz > ul').css('margin-left', '0px');
        $('#quiz input[type=radio]').attr('checked', false);
    });
    
});
