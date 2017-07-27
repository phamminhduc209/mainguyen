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

/*  [ Main Menu ]
  - - - - - - - - - - - - - - - - - - - - */
  $(".navbar-toggle").on( 'click', function() {
    $( this ).toggleClass('has-open');
    $("header .menu").toggleClass("has-open");
    $("body").toggleClass("menu-open");
  });

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

/**
 * 2. Fix MAIN MENU MOBILE
 */
var allpage_fn = {};
allpage_fn.fixMainMenu = {
    properties : {
        pcWidth : 1138,
        ex_width : 32,
        ul_menu : '.header_nav_main ul.nav_main_list',
        tbt_class : 'tbt-menu'
    },
    init : function() {
        if ($(window).width() < 768) {return;}
        if (!$(allpage_fn.fixMainMenu.properties.ul_menu).length) {return;}

        // vars
        $menu = $(allpage_fn.fixMainMenu.properties.ul_menu);
        opts  = allpage_fn.fixMainMenu.properties;

        // action INIT
        allpage_fn.fixMainMenu.fixWMenu($menu, opts, 0);
        allpage_fn.fixMainMenu.detroyM_btn($menu, opts);

        // ON RESIZE WINDOW
        $( window ).resize($.debounce(300, function(e){
            allpage_fn.fixMainMenu.init();
            allpage_fn.fixMainMenu.detroyBtnMenu();
        }));
    },
    fixWMenu : function($menu, opts, ex_more_width) {
        var cur_witdh = $menu.outerWidth() - (opts.ex_width + ex_more_width);
        var pcWidth   = opts.pcWidth;
        var lis_w     = 0;
        var tbt_class = opts.tbt_class;

        $menu.find('> li').removeClass(tbt_class);
        $menu.find('> li').each(function(i) {
            lis_w += $(this).outerWidth();
            if (lis_w > cur_witdh) {
                $(this).addClass(tbt_class);
            }
        });

        if (cur_witdh < pcWidth) {
            allpage_fn.fixMainMenu.insertM_btn($menu, opts);
        }
    },
    insertM_btn : function ($menu, opts) {
        if ($('.call-tbt-menu').length) {return;}

        var a_html = '<a href="javascript:;" class="call-tbt-menu">'
                   +    '<i class="fa fa-plus"></i>'
                   + '</a>';

        $menu.parent().append(a_html);
    },
    detroyM_btn : function ($menu, opts) {
        if ($(window).width() <= 1170) {return;}
        if (!$('.call-tbt-menu').length) {return;}
        $('.call-tbt-menu').remove();
    },
    clickPlus : function ($menu, opts) {
        var tbt_class = opts.tbt_class;
        var li_html   = '<ul class="tbt-hmenu"></ul>';

        $('body').on('click', '.call-tbt-menu', function(e) {
            if ($('.tbt-hmenu').length) {
                $('.tbt-hmenu').html('');
            } else {
                $menu.parent().append(li_html);
            }

            var $btn_plus = $(this);
            $menu.find('> li.' + tbt_class).each(function(i) {
               var $clone_obj =  $(this).clone();
               if ($clone_obj.hasClass('has_dropdown')) {
                   $clone_obj.find('.sub_dropdow_list').remove();
                   $clone_obj.removeClass('has_dropdown');
               }
               $clone_obj.attr('id', '');
               $clone_obj.appendTo( ".tbt-hmenu" );
               // console.log(clone_obj);
            });

            if ($('.tbt-hmenu').hasClass('show')) {
                $('.tbt-hmenu').removeClass('show');
                $btn_plus.removeClass('active');
            } else {
                $btn_plus.addClass('active');
                $('.tbt-hmenu').addClass('show');
            }
        });
    },
    detroyBtnMenu : function () {
        if (!$('.tbt-hmenu').length) { return; }
        $('.tbt-hmenu').remove();
    },
    clickShowSubMenu : function ($menu, opts) {
        if ($(window).width() > 1170) {return;}
        $menu.find('> li.has_dropdown').on('click', function(e) { 
            //e.preventDefault();
            if (!$(this).find('.sub_dropdow_list').hasClass('lishow')) {
                $(this).find('.sub_dropdow_list').addClass('lishow');
            } else {
                $(this).find('.sub_dropdow_list').removeClass('lishow');
            }
            $(this).bind( "clickoutside", function(event){
                $(this).find('.sub_dropdow_list').removeClass('lishow');
            });
        });
    },
    fixAffixMenu : function($menu, opts, extra_width) {
        // action INIT
        allpage_fn.fixMainMenu.fixWMenu($menu, opts, extra_width);
        allpage_fn.fixMainMenu.detroyM_btn($menu, opts);
    }

};