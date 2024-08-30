// ==UserScript==
// @name          Grepo Alliance Member State
// @namespace     dhoessl_grepo
// @version       0.1.0
// @author        dhoessl
// @homepage      https://github.com/dhoessl/gp_helper/
// @updateURL     https://raw.githubusercontent.com/dhoessl/gp_helper/master/gp_ally_stat_display_tampermonkey.js
// @downloadURL   https://raw.githubusercontent.com/dhoessl/gp_helper/master/gp_ally_stat_display_tampermonkey.js
// @description   Display Alliance Member State
// @match         https://*.grepolis.com/game/*
// @exclude       view-source://*
// @grant         none
// ==/UserScript==

(function() {
  var JSscript = document.createElement("script");
  JSscript.type = 'text/javascript';
  JSscript.src = "https://github.com/dhoessl/gp_helper/gp_ally_stat_display.js";
  document.getElementByTagName("head")[0].appendChild(JSscript);
})();

