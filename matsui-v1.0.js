// ==UserScript==
// @name         Matsui stock script
// @namespace    http://tampermonkey.net/
// @match        https://trade.matsui.co.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=matsui.co.jp
// @grant        none
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js
// ==/UserScript==

// 必ず Google Chrome の開発者モードを有効にする必要があります
// https://www.tampermonkey.net/faq.php#Q209

console.log("user script --------------------------------------")

(function() {
  'use strict';

  // Your code here...
  setInterval(function() {
    console.log("interval --------------------------------------")
  }, 1000);
})();
