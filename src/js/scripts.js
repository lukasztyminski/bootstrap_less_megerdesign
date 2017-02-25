$(document).ready(function(){
        /* menu mobilne */
        $('#main-menu').slicknav({
            prependTo: '#attach-mobile-menu',
            label: ''
        });
        /* odliczanie */
        $('.timer').countTo();
        /* viewport */
        $('*[data-animate]').addClass('hide').each(function(){
            $(this).viewportChecker({
                classToAdd: 'show animated ' + $(this).data('animate'),
                classToRemove: 'hide',
                offset: 200
            });
        });
        /* YTPlayer */
        $('.player').YTPlayer();
    });
    $('#main-container').imagesLoaded(function(){
        /* glowny slider */
        $('#main-slider').bxSlider({
            mode: 'fade',
            auto: true,
            controls: true,
            pager: false
        });
        /* Slider opinie */
        $('#opinions-slider').bxSlider({
            mode: 'vertical',
            auto: true,
            controls: false,
            pager: false
        });
        $('#portfolio-carousel').owlCarousel({
            autoPlay: 10000,
            items: 3,
            itemsDesktopSmall: [1199,2],
            itemsTablet: [768,1]
        });
    });