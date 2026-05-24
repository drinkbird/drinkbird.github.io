'use strict';
$(function() {
    // FitVids options
    $('iframe[src*="youtube"]').parent().fitVids();

    // Add lightbox class to all image links so GLightbox picks them up
    $(".post-body a[href$='.jpg'], .post-body a[href$='.jpeg'], .post-body a[href$='.JPG'], .post-body a[href$='.png'], .post-body a[href$='.gif']").addClass("image-popup");

    GLightbox({ selector: '.image-popup', loop: true });

    // Mobile navbar toggle (replaces the Bootstrap collapse plugin)
    $('.navbar-toggle').on('click', function () {
        var open = $('#navbar').toggleClass('in').hasClass('in');
        $(this).attr('aria-expanded', open);
    });

    // Sticky navbar
    $("#nav-wrapper").sticky({topSpacing:0});

    // Add target blank to external links
    $("a[href^='http']").attr("target", "_blank");

    $(".book-aside a[href^='http://amazon.com/'], .book-inarticle a[href^='http://amazon.com/']").find('h4').append(' <span class="header-suffix"><i class="fab fa-amazon"></i></span>');

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
