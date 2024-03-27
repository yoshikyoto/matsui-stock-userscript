// ==UserScript==
// @name     松井証券株価ボード
// @version  1
// @grant    none
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @match    https://trade.matsui.co.jp/*
// ==/UserScript==
// https://trade.matsui.co.jp/mgap/member

let isPriceBoardOpen;
let isPriceBoardOpenPrev;

function getText(stockName) {
  console.log("getText: " + stockName);
  switch (stockName) {
    case "オーウエル": 
      return `
    `
      
    default:
      return `(説明無し)`
  }
  
}

// 株価ボードが https://trade.matsui.co.jp/mgap/member#price-board みたいな URL だが、
// ページ遷移が発生しないので、定期的にチェックする
setInterval(function() {
  // https://trade.matsui.co.jp/mgap/member#price-board で、
  // 「チャート」を選択すると priceboard-chart になる
  let chartPriceBoards = $(".priceboard-chart");
  isPriceBoardOpen = chartPriceBoards.length > 0;
  let isPriceBoardOpenNow = !isPriceBoardOpenPrev && isPriceBoardOpen;
  let isPriceBoardCloseNow = isPriceBoardOpenPrev && !isPriceBoardOpen;

  console.log("isPriceBoardOpen: " + isPriceBoardOpen);

  if (isPriceBoardOpenNow) {
    let chartPriceBoard = chartPriceBoards[0];
    let stockNameDivs = $(chartPriceBoard).find("div.name");
    for (var i = 0; i < stockNameDivs.length; i++) {
      let stockNameDiv = stockNameDivs[i];
      $(stockNameDiv).on("click", function(){
        let stockNameSpan = $(stockNameDiv).find("span")[0];
        let stockName = $(stockNameSpan).text().trim();
        console.log("click: " + stockName);

        let text = getText(stockName);
        let modal = $(`<p style="position:fixed; top:0; right:0; z-index:100; background-color: white">${text}</p>`)
        modal.on("click", function() { modal.remove() });
        $("body").append(modal);
      });
    }
  }

  isPriceBoardOpenPrev = isPriceBoardOpen;
}, 1000); // 1000=1秒
