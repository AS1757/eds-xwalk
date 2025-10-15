(function ($) {
    $.fn.VideoPlayer = function () {
        return $(this).each(function () {
            var data = $(this).data();
            var player = flowplayer(this, {
                poster: data.poster,
                overlay: data.overlay,
                embed: data.embed,
                key: data.key,
                clip: {
                    sources: data.sources
                },
                adaptiveRatio: data.adaptiveRatio,
                token: data.key,
                src: data.sources[0].src
            });
        });
    };

}(jQuery));


var videoAccordion = function () {
    "use strict";

    var accordion = $('.ni-template .accordion-item');

    accordion.each(function () {

        var parent = $(this);
        var title = $(this).children('.accordion-item__title');

        title.unbind('click').click(
            function () {
                parent.toggleClass('is-open');
            }
        );
    });
}

var watchTheDom = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (!mutation.addedNodes) return;

        for (var i = 0; i < mutation.addedNodes.length; i++) {
            var node = mutation.addedNodes[i];
            if (node.classList !== undefined && node.classList.contains("flowplayer-overlay-mask")) {
                videoAccordion();
            }
        }
    });
});


$(document).ready(function () {
    $('.nisource-video-player').VideoPlayer();
});
