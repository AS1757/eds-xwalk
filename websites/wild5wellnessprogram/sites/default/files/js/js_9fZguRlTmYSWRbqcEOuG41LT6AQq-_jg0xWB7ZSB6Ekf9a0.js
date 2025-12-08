/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */

(function (Drupal, drupalSettings, OtsukaFM) {
  'use strict'

  Drupal.behaviors.focusTrap = {
    attach: (context) => {
      const selectors = drupalSettings.otsuka_focus_manager.selectors
      selectors.forEach((selector) => {
        if (!OtsukaFM.selectors.includes(selector)) {
          OtsukaFM.waitForElement(selector);
        }
      })
    },
  };
})(Drupal, drupalSettings, OtsukaFM);
;
(function(Drupal,OtsukaPCM){Drupal.behaviors.cmpInitIframes={attach:(context)=>{once("cmpInitIframes","iframe",context).forEach((iframe)=>{OtsukaPCM.initIframe(iframe);});}};})(Drupal,OtsukaPCM);;
