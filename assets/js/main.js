//swiper
$(window).on('load', function(){
let swipeOption1 = {
loop: true, // スライダーをループさせる設定
effect: 'fade', // フェードさせる為の設定
fadeEffect: {
crossFade: true//縦横比が統一されない画像の場合、重なる場合がある為、それを防ぐ設定
},
autoplay: {
delay: 4000, // 秒後に次の画像にいくようにする設定
disableOnInteraction: false,// ユーザーが操作後、自動再生を再開する設定
},
speed: 2000, // 2秒かけ次の画像へ移動させる設定
allowTouchMove: false, // マウスでのスワイプを禁止する設定
}
new Swiper('#swiper1', swipeOption1);



let swipeOption2 = {
  loop: true, // スライダーをループさせる設定
  effect: 'fade', // フェードさせる為の設定
  fadeEffect: {
  crossFade: true//縦横比が統一されない画像の場合、重なる場合がある為、それを防ぐ設定
  },
  autoplay: {
  delay: 4000, // 秒後に次の画像にいくようにする設定
  disableOnInteraction: false,// ユーザーが操作後、自動再生を再開する設定
  },
  speed: 2000, // 2秒かけ次の画像へ移動させる設定
  allowTouchMove: false, // マウスでのスワイプを禁止する設定
  }
  new Swiper('#swiper2', swipeOption2);

});


const swiper3 = new Swiper("#swiper3", {
  loop: true, // ループ有効
  slidesPerView: 5, // 一度に表示する枚数
  speed: 6000, // ループの時間
  allowTouchMove: false, // スワイプ無効
  spaceBetween: 40, // スライド間の余白（px）
  autoplay: {
    delay: 0, // 途切れなくループ
  },
  breakpoints: { // ブレークポイント
    250: { // 画面幅500px以上で適用
      slidesPerView: 3,
      spaceBetween: 10,
    },
    500: { // 画面幅500px以上で適用
      slidesPerView: 4,
      spaceBetween: 15,
    },
    600: { // 画面幅600px以上で適用
      slidesPerView: 4,
      spaceBetween: 25,
    },
      1025: { // 画面幅1025px以上で適用
      slidesPerView: 5,
      spaceBetween: 40,
    }
  },
});


//FAQ開閉
$(function () {
  $(".js-accordion-title").on("click", function() {
    $(this).next().slideToggle(200);
    $(this).toggleClass("open",200);
  });
});


//staff開閉
$(function () {
  $(".js-accordion-title1").on("click", function() {
    $(this).next().slideToggle(200);
    $(this).toggleClass("open",200);
  });
});



/*ハンバーガー*/
$("#j_openbtn").click(function () {//ボタンがクリックされたら
  $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#j_nav_erea").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与

});

$("#j_nav_erea a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#j_nav_erea").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});


/*スムーススクロール絶対パス用*/
$(function () {
  $('a[href*="#"]').click(function () {
    const speed = 400;
    const target = $(this.hash === '#' || '' ? 'html' : this.hash)
    if (!target.length) return;
    const targetPos = target.offset().top;
    $('html, body').animate({ scrollTop: targetPos }, speed, 'swing');
    return false;
  });
});

/*TOPへ戻る*/
$(function () {
  const $pageTop = $("#js-pagetop");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 500) {
      $pageTop.fadeIn(300).css('display', 'flex');
    } else {
      $pageTop.fadeOut(300);
    }
  });

  $pageTop.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 300);
  });
});

/*ローディング*/
window.onload = function() {
  const loadbefore = document.getElementById('loading');
  loadbefore.classList.add('loaded');
}

/*ふわっとフェードイン*/
$('.fbox').waypoint({
  handler: function (direction) {
    var activePoint = $(this.element);
    if (direction === 'down') {
      $(this.element).addClass('animate__fadeIn');
      // opacityが０に戻らないように1に変更しました
      $(this.element).css('opacity', '1');
      this.destroy();
    }
  },
  offset: '85%',
});

