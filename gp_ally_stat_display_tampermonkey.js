// ==UserScript==
// @name          Grepo Alliance Member State
// @namespace     dhoessl_grepo
// @version       0.1.3
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
  // Content needs to be delivered from jsdelivr because github sending out wronge Mime Type :/
  JSscript.src = "https://cdn.jsdelivr.net/gh/dhoessl/gp_helper/gp_ally_stat_display.js";
  document.getElementsByTagName("head")[0].appendChild(JSscript);
})();

