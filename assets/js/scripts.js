'use strict';
$(function() {
    // FitVids options
    $('iframe[src*="youtube"]').parent().fitVids();

    // Add lightbox class to all image links so GLightbox picks them up
    $(".post-body a[href$='.jpg'], .post-body a[href$='.jpeg'], .post-body a[href$='.JPG'], .post-body a[href$='.png'], .post-body a[href$='.gif']").addClass("image-popup");

    GLightbox({ selector: '.image-popup', loop: true });

    // Navbar collapse icon toggle
    $('#navbar').on('show.bs.collapse', function () {
        $(".navbar button .glyphicon").addClass("gly-rotate-180");
    });

    $('#navbar').on('hide.bs.collapse', function () {
        $(".navbar button .glyphicon").removeClass("gly-rotate-180");
    });

    // Sticky navbar
    $("#nav-wrapper").sticky({topSpacing:0});

    // Add target blank to external links
    $("a[href^='http']").attr("target", "_blank");

    $(".book-aside a[href^='http://amazon.com/'], .book-inarticle a[href^='http://amazon.com/']").find('h4').append(' <span class="header-suffix"><i class="fab fa-amazon"></i></span>');

    // Hero destination-word rotator — strobes and freezes on "leaders".
    var heroRotator = document.querySelector('.c-rotator');
    if (heroRotator) {
        var heroWords = [
            "mentors", "builders", "owners", "coaches", "shapers", "crafters",
            "thinkers", "doers", "shippers", "architects", "creators", "catalysts",
            "multipliers", "teachers", "communicators", "collaborators", "strategists",
            "educators", "storytellers", "designers", "partners", "pragmatists",
            "changemakers", "leaders"
        ];
        var heroIndex = -1;
        var heroInterval = setInterval(function () {
            heroIndex++;
            if (heroIndex >= heroWords.length) {
                clearInterval(heroInterval);
                return;
            }
            heroRotator.textContent = heroWords[heroIndex];
        }, 150);
    }
});
