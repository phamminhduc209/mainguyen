/*
 * ---------------------------------------------------
 * 1. Slide Carousel
 * 2. Scroll to Top
 * 3. Sticky Menu
 * 4. Accordion has icon
 * 5. Hover tag a show ul page Product
 * 6. POPUP order a product - check on info Payment
 * 7. Scroll News Item Tablet & Mobile
 */

  (function($){
    "use strict";
  /* ==================================================== */

  /*
   * 1. Slide Carousel
  */
  $(document).ready(function() {
    $('.owl-carousel').each(function(index, el) {
      var config = $(this).data();
      config.navText = ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'];
      config.smartSpeed="800";
      
      if($(this).hasClass('owl-style2')){
        config.animateOut='fadeOut';
        config.animateIn='fadeIn';    
      }
      if($(this).hasClass('dotsData')){
        config.dotsData="true";
      }
      $(this).owlCarousel(config);
    });
  });

  /*
   * 2. Scroll to Top
  */
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 200) {
      $('#return-to-top').addClass('td-scroll-up-visible');
    } else {
      $('#return-to-top').removeClass('td-scroll-up-visible');
    }
  });
  $('#return-to-top').click(function() {
    $('body,html').animate({
      scrollTop : 0
    }, 'slow');
  });

  /*
   * 3. Sticky Menu
  */
  $('.fixed').sticky({ topSpacing: 0 });

  /*
   * 4. Accordion has icon
  */
  $(document).on('click','.box-accordion > .accordion-header',function(event){
    $(this).toggleClass('active');
    $(this).toggleClass('opened');
    $(this).next('.box-collapse').slideToggle(200);
  });

  /*
   * 5. Hover tag a show ul page Product
  */
  $('.dpl-status').hover(function() {
    $(this).parent().toggleClass('shw');
  });
  // $('.block_status').hover(
  //   function() {
  //     $(this).find('.pro-sts').addClass('shw');
  //   }, function() {
  //     $(this).find('.pro-sts').removeClass('shw');
  //   }
  // );

  /*
   * 6. POPUP order a product - check on info Payment
  */
  $('.info-payment .item-group > input[type="checkbox"]').on('change', function(e){
    console.log($(this).attr('checked'));
    if ($(this).is(':checked')) {
      $(this).siblings('.sub-hide-box').show();
    } else {
      $(this).siblings('.sub-hide-box').hide();
    }
  });

  /*
   * 7. Main Menu
  */
  $(".navbar-toggle").on( 'click', function() {
    $( this ).toggleClass('has-open');
    $("header .menu").toggleClass("has-open");
    $("body").toggleClass("menu-open");
  });

 /** Menu, Menu Mega Responsive **/
  $(document).ready(function(){
    $('.menu ul li.parent').append('<span class="plus"></span>');
    $('.menu ul li.parent .plus').click(function(){
      $(this).toggleClass('open').siblings('.submenu').slideToggle();
    });
  });

  /*
   * 7. Click show hide Search Mobile
  */
  $('.block_search_mobile .fa_search_show').on('click', function() {
    $('.block_search_mobile .block_search_inner').toggleClass('show');
})

})(jQuery); // End of use strict

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