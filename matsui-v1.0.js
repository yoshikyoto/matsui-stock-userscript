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

console.log("Matsui stock script loaded ......");

const memo = {
    "ＧＭＯ−ＰＧ": "GMOペイメントゲートウェイ",
    "ＧＭＯ−ＧＳ": "GMOグローバルサイン",
    "ＧＭＯ−ＦＨ": "GMOフィナンシャルホールディングス",
    "ＧＭＯ": "GMOインターネットグループ",
    "ＧＭＯインタ": "GMOインターネット",
    "Ｊテック・Ｃ": "金属製品の会社、Ｘ線集光ミラーなど。PER28倍",
};

(function() {

  setInterval(function() {
    const isPriceBoardOpen = $("div#priceboard-chart").length > 0;
    if (isPriceBoardOpen) {
      openPriceBoardPage();
    }
  }, 1000);


  function openPriceBoardPage() {
    const activeBoardName = $("div#priceboard-groups li.active").text();
    const numOfCards = $("div#priceboard-chart li").length;

    // ボードが切り替わった場合はだけ処理を行う
    if (isUpdateRequired(activeBoardName, numOfCards)) {
      const cards = $("div#priceboard-chart li");
      cards.each(function() {
        // 会社名からメモを取得して、松井証券のカード UI に追加する
        const companyName = $(this).find("div.top div.left span:first").text();
        if (memo[companyName]) {
          $(this).find("div.header").children().eq(1).prepend("<div>" + memo[companyName] + "</div><hr>");
        }
      });
    }

    // 前回の状態を記憶
    previousActiveBoardName = activeBoardName;
    previousNumOfCards = numOfCards;
  }

  var previousActiveBoardName = "";
  var previousNumOfCards = null;
  function isUpdateRequired(activeBoardName, numOfCards) {
    // ボードが切り替わった場合は更新処理を行う
    if (previousActiveBoardName !== activeBoardName) {
      return true;
    }

    // ボードが切り替わっていない場合、
    // 読込中にカードの数が変わることがあるので、そうなったら更新処理は行う
    return numOfCards !== previousNumOfCards;
  }
})();
