// ==UserScript==
// @name         Matsui stock script
// @match        https://trade.matsui.co.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=matsui.co.jp
// @grant        none
// @grant        GM_log
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js
// ==/UserScript==

// 必ず Google Chrome の開発者モードを有効にする必要があります
// https://www.tampermonkey.net/faq.php#Q209

console.log("user script --------------------------------------");

(function() {
  var previousActiveBoardName = "";

  setInterval(function() {
    console.log("interval --------------------------------------");
    const isPriceBoardOpen = $("div#priceboard-chart").length > 0;
    console.log("isPriceBoardOpen: " + isPriceBoardOpen);
    if (isPriceBoardOpen) {
      let activeBoardName = $("div#priceboard-groups li.active").text();
      if (previousActiveBoardName !== activeBoardName) {
        // ボードが切り替わった場合はだけ処理を行う
        openPriceBoardPage();
        previousActiveBoardName = activeBoardName;
      }
    }
  }, 1000);

  function openPriceBoardPage() {
    console.log("priceBoardPage の処理");

  }
})();
