$(document).ready(function() {

    // Navigation Toggle
    $('.nav-toggle').click(function() {
        $(this).toggleClass('is-active');
        $('.nav-menu').toggleClass('is-active');
    });

    // Smooth Scrolling
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function() {
                window.location.hash = hash;
            });
        }
    });

});
