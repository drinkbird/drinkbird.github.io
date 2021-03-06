'use strict';
$(function() {
    // FitVids options
	$('iframe[src*="youtube"]').parent().fitVids();

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
    $("#nav-wrapper").sticky({topSpacing:0});
    
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

    $(".book-aside a[href^='http://geni.us/'], .book-inarticle a[href^='http://geni.us/']").find('h4').append(' <span class="header-suffix"><i class="fab fa-amazon"></i></span>');

    // Rotating word effect
    var curNewsIndex = 0;
    var newsArray = ["Create","Inspire","Collaborate","Disrupt","Evolve","Learn","Think","Build","Ship","Design","Analyze","Plan","Code","Produce","Follow","Refine","Deploy","Solve","Test","Appreciate","Craft","Share","Monetize","Consolidate"];

    function setTickerNews(word) {
        $("#c").html(word + "<span>.<\/span>");
    }

    function advanceNewsItem() {
        setTickerNews(newsArray[curNewsIndex]);
        curNewsIndex++;
        curNewsIndex >= newsArray.length && (curNewsIndex = 0);
    }
    
    if ($("#c").length) {
        setInterval(advanceNewsItem, 150);
    }
});