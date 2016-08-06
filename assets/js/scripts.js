$(function() {
    // FitVids options
	$("article").fitVids();

    // Add lightbox class to all image links
    $(".post-body a[href$='.jpg'], .post-body a[href$='.jpeg'], .post-body a[href$='.JPG'], .post-body a[href$='.png'], .post-body a[href$='.gif']").addClass("image-popup");

    // Magnific-Popup options
    $('.image-popup').magnificPopup({
        type: 'image',
        tLoading: 'Loading',
        titleSrc: 'title',
        gallery: {
            enabled: true,
            preload: [0,2],
            navigateByImgClick: true,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)',
            tCounter: '<span class="mfp-counter">%curr%/%total%</span>'
        },
        image: {
            tError: 'The image could not be loaded.',
        },
        removalDelay: 300, 
        mainClass: 'mfp-with-zoom'
    });

    // Navbar collapse icon toggle
    $('#navbar').on('show.bs.collapse', function () {
        $(".navbar button .glyphicon").addClass("gly-rotate-180");
    });

    $('#navbar').on('hide.bs.collapse', function () {
        $(".navbar button .glyphicon").removeClass("gly-rotate-180");;
    });

    // Replace svg with png for unsupported browsers
    if (!Modernizr.svg) {
        var elem = $(".navbar-brand img");
        var src = elem.attr("src"); 
        elem.attr("src", src.replace("svg", "png"));
    }

    // Sticky navbar
    $("nav.navbar").sticky({topSpacing:0});
    
    // Waypoints
    var waypoints = $('article > .social-share').waypoint(function(direction) {
        if (direction === "down") {
          
            ga('send', {
                hitType: 'event',
                eventCategory: 'Posts',
                eventAction: 'Read To The Bottom',
                eventLabel: 'DrinkBird Campaign'
            });
            this.destroy();
       }
    }, {
        offset: '100%'
    });

    // Add target blank to external links
    $("a[href^='http']").attr("target", "_blank");

});