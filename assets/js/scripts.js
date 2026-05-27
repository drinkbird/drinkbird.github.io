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

    // Cap the recommended-books aside so it never overhangs the article body
    // on wide screens. On narrow screens the CSS already truncates to 3 items
    // and the aside stacks below content, so we no-op there.
    var asideList = document.querySelector('.books-aside[data-aside-trim]');
    var asideAnchor = document.querySelector('.post-body[data-aside-anchor]');
    if (asideList && asideAnchor) {
        var asideItems = Array.prototype.slice.call(asideList.children);
        var WIDE_BREAKPOINT = 992; // matches $screen-md-min

        var trimAside = function () {
            // Reset: show every item, then re-hide as needed.
            asideItems.forEach(function (li) { li.hidden = false; });

            if (window.innerWidth < WIDE_BREAKPOINT) {
                return; // CSS handles narrow screens.
            }

            var bodyBottom = asideAnchor.getBoundingClientRect().bottom;
            // Always keep at least the first item so the section never empties.
            for (var i = 1; i < asideItems.length; i++) {
                var liBottom = asideItems[i].getBoundingClientRect().bottom;
                if (liBottom > bodyBottom) {
                    for (var j = i; j < asideItems.length; j++) {
                        asideItems[j].hidden = true;
                    }
                    break;
                }
            }
        };

        var debounced;
        var schedule = function () {
            window.clearTimeout(debounced);
            debounced = window.setTimeout(trimAside, 80);
        };

        trimAside();
        window.addEventListener('resize', schedule);
        // Images in the body change its height as they load.
        $('.post-body img').on('load', schedule);
        // Final pass after every async asset (fonts, embeds) settles.
        window.addEventListener('load', trimAside);
    }

    // Copy-to-clipboard buttons on code blocks inside post / chapter bodies.
    // Skip mermaid fences (those get replaced by a diagram by scripts.html).
    var codeBlocks = document.querySelectorAll('.post-body pre');
    Array.prototype.forEach.call(codeBlocks, function (pre) {
        if (pre.querySelector('code.language-mermaid')) { return; }
        if (pre.querySelector('.code-copy-btn')) { return; }

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'code-copy-btn';
        btn.setAttribute('aria-label', 'Copy code to clipboard');
        btn.textContent = 'Copy';

        pre.classList.add('has-copy-btn');
        pre.appendChild(btn);

        var resetTimer;
        btn.addEventListener('click', function () {
            var codeEl = pre.querySelector('code') || pre;
            var text = codeEl.innerText.replace(/\n$/, '');

            var done = function (ok) {
                btn.textContent = ok ? 'Copied' : 'Press ⌘C';
                btn.classList.toggle('is-copied', ok);
                btn.classList.toggle('is-error', !ok);
                window.clearTimeout(resetTimer);
                resetTimer = window.setTimeout(function () {
                    btn.textContent = 'Copy';
                    btn.classList.remove('is-copied');
                    btn.classList.remove('is-error');
                }, 1600);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(
                    function () { done(true); },
                    function () { done(false); }
                );
            } else {
                done(false);
            }
        });
    });

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
