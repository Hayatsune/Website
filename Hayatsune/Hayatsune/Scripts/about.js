$(document).ready(function() {
    var el = document.createElement('div'),
         transformProps = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
         transformProp = support(transformProps),
         transitionDuration = 'transitionDuration WebkitTransitionDuration MozTransitionDuration OTransitionDuration msTransitionDuration'.split(' '),
         transitionDurationProp = support(transitionDuration);

    function support(props) {
        for (var i = 0, l = props.length; i < l; i++) {
            if (typeof el.style[props[i]] !== "undefined") {
                return props[i];
            }
        }
    }

    var mouse = {
        start: {}
    },
        touch = document.ontouchmove !== undefined,
        viewport = {
            x: -10,
            y: 20,
            el: $('.cube')[0],
            move: function (coords) {
                if (coords) {
                    if (typeof coords.x === "number") this.x = coords.x;
                    if (typeof coords.y === "number") this.y = coords.y;
                }

                this.el.style[transformProp] = "rotateX(" + this.x + "deg) rotateY(" + this.y + "deg)";
            },
            reset: function () {
                this.move({ x: 0, y: 0 });
            }
        };

    $(document).keydown(function (evt) {
        switch (evt.keyCode) {
            case 37: // left
                viewport.move({ y: viewport.y - 90 });
                break;

            case 38: // up
                evt.preventDefault();
                viewport.move({ x: viewport.x + 90 });
                break;

            case 39: // right
                viewport.move({ y: viewport.y + 90 });
                break;

            case 40: // down
                evt.preventDefault();
                viewport.move({ x: viewport.x - 90 });
                break;

            case 27: //esc
                viewport.reset();
                break;

            default:
                break;
        };
    }).bind('mousedown touchstart', function (evt) {
        delete mouse.last;
        if ($(evt.target).is('a, iframe')) {
            return true;
        }

        evt.originalEvent.touches ? evt = evt.originalEvent.touches[0] : null;
        mouse.start.x = evt.pageX;
        mouse.start.y = evt.pageY;
        $(document).bind('mousemove touchmove', function (event) {
            // Only perform rotation if one touch or mouse (e.g. still scale with pinch and zoom)
            if (!touch || !(event.originalEvent && event.originalEvent.touches.length > 1)) {
                event.preventDefault();
                // Get touch co-ords
                event.originalEvent.touches ? event = event.originalEvent.touches[0] : null;
                $('.viewport').trigger('move-viewport', { x: event.pageX, y: event.pageY });
            }
        });

        $(document).bind('mouseup touchend', function () {
            $(document).unbind('mousemove touchmove');
        });
    });

    $('.viewport').bind('move-viewport', function (evt, movedMouse) {

        // Reduce movement on touch screens
        var movementScaleFactor = touch ? 4 : 1;

        if (!mouse.last) {
            mouse.last = mouse.start;
        } else {
            if (forward(mouse.start.x, mouse.last.x) != forward(mouse.last.x, movedMouse.x)) {
                mouse.start.x = mouse.last.x;
            }
            if (forward(mouse.start.y, mouse.last.y) != forward(mouse.last.y, movedMouse.y)) {
                mouse.start.y = mouse.last.y;
            }
        }

        viewport.move({
            x: viewport.x + parseInt((mouse.start.y - movedMouse.y) / movementScaleFactor),
            y: viewport.y - parseInt((mouse.start.x - movedMouse.x) / movementScaleFactor)
        });

        mouse.last.x = movedMouse.x;
        mouse.last.y = movedMouse.y;

        function forward(v1, v2) {
            return v1 >= v2 ? true : false;
        }
    });


    /*
    * Replace div for cube
    */
    $('.skills').hover(function () {
        $('.parentmenu').find('.languages').hide();
        $('.parentmenu').find('.skills').hide();
        $('.parentlanguage').find('.languageslist').hide();
        $('.parent').find('.parentlanguage').hide();
        $('.parentskill').find('.skillslist').fadeIn(200);
        $('.parentskill').find('.skillslist').show();
    }, function () {
        $('.parentskill').find('.skillslist').hide();
    });

    $('.parentskill').hover(function () {
    }, function () {
        $('.parentskill').find('.skillslist').hide();
        $('.parentlanguage').find('.languageslist').hide();
        $('.parentmenu').find('.skills').fadeIn(200);
        $('.parentmenu').find('.skills').show();
        $('.parentmenu').find('.languages').fadeIn(200);
        $('.parentmenu').find('.languages').show();
        $('.parent').find('.parentlanguage').fadeIn(200);
        $('.parent').find('.parentlanguage').show();
    });

    $('.languages').hover(function () {
        $('.parentmenu').find('.skills').hide();
        $('.parentmenu').find('.languages').hide();
        $('.parentskill').find('.skillslist').hide();
        $('.parent').find('.parentskill').hide();
        $('.parentlanguage').find('.languageslist').fadeIn(200);
        $('.parentlanguage').find('.languageslist').show();
    }, function () {
        $('.parentlanguage').find('.languageslist').hide();
    });

    $('.parentlanguage').hover(function () {
    }, function () {
        $('.parentlanguage').find('.languageslist').hide();
        $('.parentskill').find('.skillslist').hide();
        $('.parentmenu').find('.languages').fadeIn(200);
        $('.parentmenu').find('.languages').show();
        $('.parentmenu').find('.skills').fadeIn(200);
        $('.parentmenu').find('.skills').show();
        $('.parent').find('.parentskill').fadeIn(200);
        $('.parent').find('.parentskill').show();
    });
});