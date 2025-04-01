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
  // サンプル
  "キッズスター": "子供向け体験アプリごっこランド、時価総額38億、筆頭株主が社長ではない、売上は伸びており、自己資本83%",
};

(function() {

  setInterval(function() {
    const isPriceBoardOpen = $("div#priceboard-chart").length > 0;
    if (isPriceBoardOpen) {
      openPriceBoardPage();
    }
  }, 1000);


  function openPriceBoardPage() {
    // console.log("openPriceBoardPage");
    const activeBoardName = $("div#priceboard-groups li.active").text();
    const numOfCards = $("div#priceboard-chart li").length;

    // console.log("activeBoardName: ", activeBoardName);
    // console.log("numOfCards: ", numOfCards);
    // ボードが切り替わった場合はだけ処理を行う
    if (isUpdateRequired(activeBoardName, numOfCards)) {
      // console.log("update");
      const cards = $("div#priceboard-chart li");
      cards.each(function() {
        $(this).find("div.header").children().eq(1).prepend("<div>説明をここに</div><hr>");
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
