/*
 * 7. Scroll News Item Tablet & Mobile
 */
var homepage_fn = {};
homepage_fn.newsSliderMB = {
  init : function () {
    homepage_fn.newsSliderMB.runSlider ('.block_news_hot .list');
    $( window ).resize(
      $.debounce(100, function(e){
        homepage_fn.newsSliderMB.runSlider ('.block_news_hot .list');
      })
    );
  },
  runSlider : function (objSlide) {
    if(!$( objSlide )) {return};
    var $newsmb_slider = $( objSlide );

    var w_scroll_window = 0;
    if (navigator.appVersion.indexOf("Win")!=-1) {
      w_scroll_window = 17;
    }

    if(($(window).width() + w_scroll_window) <= 1024 ) {
      $newsmb_slider.each(function (i) {
        if($(this).hasClass('slick-initialized')) {return;}
        $(this).slick({
          infinite: true,
          speed: 300,
          slidesToShow: 3,
          centerMode: false,
          variableWidth: true,
          arrows: false,
          dots: false,
          lazyLoad: 'progressive',
          responsive: [
            {
              breakpoint: 660,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1
              }
            },
          ]
        });
      });
    } else {
      $newsmb_slider.each(function (i) {
        if($(this).hasClass('slick-initialized')) {
          $(this).slick('unslick');
        }
      });
    }
  }
};
$(document).ready(function($){
  // product slick slider mobile
  homepage_fn.newsSliderMB.init ();
});