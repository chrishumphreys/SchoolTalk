$( document ).ready(function() {

    $('.privacy-policy-list__nav-link').on("click", function (e) {
        var target = $(e.target);
        e.preventDefault();
        var elem = $(target.attr('href'));

        scrollTo(elem.offset().top - 60, 300);
    });

    $('.scroll-back-top').on("click", function (e) {
        e.preventDefault();

        scrollTo(0, 300);
    });

    function scrollTo(to, duration) {
        var start = $(window).scrollTop(),
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function(){
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            $(window).scrollTop(val);
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    function easeInOutQuad (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
});