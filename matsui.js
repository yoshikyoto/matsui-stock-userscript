// ==UserScript==
// @name     松井証券株価ボード
// @version  1
// @grant    none
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @match    https://trade.matsui.co.jp/*
// ==/UserScript==
// https://trade.matsui.co.jp/mgap/member

console.log("松井証券株価ボード.js が読み込まれました")

let isPriceBoardOpen;
let isPriceBoardOpenPrev;

function getText(stockName) {
  console.log("getText: " + stockName);
  switch (stockName) {
    case "オーウエル":
      return `ものづくりトータルコーディネートをやっている会社で、塗料、照明器具、半導体などを販売している。<br>
      300株から株主優待、関西や九州の食べ物がもらえるカタログギフト1000円分`

    case "ウェルネオＳ":
    	return `ウェルネオシュガー　砂糖の会社。<br>
      100株から、株主優待で砂糖の製品1000円相当<br>3年以上保有で2000円相当`

    case "ＳＤＳＨＤ":
    	return `SDSホールディングス<br>再生可能エネルギー事業をおこなう会社<br>
      1000株から、石川県産ご当地グルメの詰め合わせ（10,000円相当）`

    case "ペッパー":
    	return `ペッパーランチ
      株主優待は自社商品<br>500株 	3,000円相当<br>5,000株 	6,000円相当<br>10,000株 	9,000円相当`

    case "ライドオンＥ":
      return `銀のさらとか釜寅とか。ライドオンエクスプレス<br>
      100株で株主優待2500円、300株で5000円`

    case "ペッパー":
    	return `ペッパーランチ
      株主優待は自社商品<br>500株 	3,000円相当<br>5,000株 	6,000円相当<br>10,000株 	9,000円相当`

    case "ＳＴＩＦＨＤ":
      return `STIフードホールディングス<br>水産品を取り扱う食品メーカー<br>
      100株を1年以上保持すると、自社ブランドの缶詰セット（3,000円相当）`

    case "ＰＲＴＩＭＥ":
      return `PR TIMES<br>
      株主優待　PRTIMESを利用している企業の割引券<br>100株を6ヶ月以上保持で1点、3年以上保持で2点選択できる`

    case "Ｒフィールド":
      return `ロック・フィールドで使えるおそうざい券<br>
      100株 	1,000円相当<br>200株 	2,000円相当<br>...`

    case "ソフィア":
      return `ソフィアホールディングス<br>インターネット関連事業をおこなう会社<br>MVNO事業、調剤薬局事業なども<br>
      100株 	「キル フェ ボン」で使えるギフトカード（3,000円相当`

    case "ＵＮＩＶＡ":
      return `中小企業に投資する「投資銀行事業」をおこなっている会社<br>要注意が出ているので微妙かも...<br>
      株主優待は、“「株主優待ショッピングサイト」で使えるポイント（2,500円相当～）”がもらえます<br>
      オーガニック製品・自然食品・無添加食品など安心安全にこだわった食品を買うことができます。<br>
      1,000株 	2,500円相当（2,500ポイント）`

    case "ＭＤＶ":
      return `メディカル・データ・ビジョン<br>医療機関や健康保険組合などで扱われる医療・医薬品などのデータ<br>
      株主優待が限定的なので微妙かもしれない（事業内容もそこまですごいかと言われると微妙）<br>
      2024年6月限定 Apple Gift Card（2,000円相当）`

    case "名港海":
      return `名古屋港を地盤に港湾運送事業をおこなう会社<br>
      300株 	1,000ポイント 6ヶ月以上保持で<br>
      愛知県に関する商品と交換できます`

    case "フラベッドＨ":
      return `フランスベッドホールディングス<br>
      200株で株主優待がもらえる<br>
      自社商品がもらえて、1年、5年と保持するとより良いものがもらえる`

    case "東映アニメ":
      return `100株 	1,200円相当　キャラクターQUOカード`

    case "モスフード":
      return `モスバーガー<br>
      優待食事割引券<br>
      100株 	1,000円相当<br>
      300株 	3,000円相当`

    case "ＭＣＪ":
      return `マウスコンピューター、パソコン工房<br>
      1000株　オリジナルカタログギフト10000円`

    case "三井不":
      return `三井不動産<br>
      株主優待　三井ショッピングパークポイント　ららぽーとで使える<br>
      アルカキット錦糸町でも使える<br>
      保有期間1年以上が必要
      100株 	1,000円相当（以降、100株ごとに1,000円相当を贈呈）
      1,200株 	12,000円相当<br><br>
      3年、5年保持でさらに追加贈呈`

    case "飯野海":
    	return `飯野海運。<br>500株から株主優待がもらえて、カタログギフト。海産物とかもらえるっぽい。`

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
        let modal = $(`<p style="position:fixed; top:0; right:0; z-index:100; padding: 6px; border: 2px solid #ccc; background-color: white">${text}</p>`)
        modal.on("click", function() { modal.remove() });
        $("body").append(modal);
      });
    }
  }

  isPriceBoardOpenPrev = isPriceBoardOpen;
}, 1000); // 1000=1秒
