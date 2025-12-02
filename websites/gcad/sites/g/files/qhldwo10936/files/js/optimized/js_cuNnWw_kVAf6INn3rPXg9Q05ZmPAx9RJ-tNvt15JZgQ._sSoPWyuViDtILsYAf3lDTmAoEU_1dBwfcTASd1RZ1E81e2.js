(function (Drupal, OtsukaPCM) {
    Drupal.behaviors.cmpInitIframes = {
      attach: (context) => {
        once("cmpInitIframes", "iframe", context).forEach((iframe) => {
          OtsukaPCM.initIframe(iframe);
        });
      },
    };
})(Drupal, OtsukaPCM);
