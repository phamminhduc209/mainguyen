/**
* CATEGORY PAGE JS
* Update on : 06.01.2015
* ---------------------------------------------------
* 1. CONTROL MODULE
* 2. ORDER PRODUCT
* 3. LOAD MORE PRODUCT
* 4. SCROLL BLOCK PRODUCT
* 5. SALE OFF COUNTDOWN
*/
var catpage_fn = {};

catpage_fn.orderProd = {

	/** 
	* Show Status
	*/
	showStatus : function () {
		if (!$('.pro-sts > a')) { return; }
		$('.pro-sts').on( "mouseover", function() {	
			$(this).addClass('shw');
		}).on( "mouseout", function() {
			$(this).removeClass('shw');
		});
	},
	/** 
	* Change Status
	*/ 
	changeStatus : function (objClick, objParent, objDisplay) {
		if (!$( objClick )) { return; }
		$( objClick ).on('click', function (e) {
			var $a_status       =   $(this),
			$a_parent       =   $a_status.closest( objParent ),
			$data_status    =   $a_status.data('status'),
			$ul             =   $a_status.closest('ul'),
			$span           =   $ul.siblings(objDisplay).find('span');
			$span.text($data_status);
			$a_parent.removeClass('shw');
		});
	},

	/** 
	* Show Filter on Device Tablet, Mobile
	*/
	 showFilter : function (objShow) {
        if(!$( objShow )) { return; }

        $( objShow ).on('click', function (e) { 
            var $a_filter   =   $(this),
                $col_right  =   $a_filter.closest('.block_cate_right'),
                $col_left   =   $col_right.siblings('.block_cate_left'),
                $body       =   $a_filter.closest('body');

            if($a_filter.hasClass('active')) {
                $a_filter.removeClass('active');
                $col_left.removeClass('cl-active');
                $body.removeClass('body-block');
            } else {
                $a_filter.addClass('active');
                $col_left.addClass('cl-active');
                $body.addClass('body-block');
            }

            // get offset top block
            if($(window).width() <= 1024 && $(window).width() > 767) {
                var $blk_filter = $a_filter.closest('.block_view'),
                    $h_cat_banner   = $blk_filter.siblings('.block_caption').outerHeight(),
                    top         = $h_cat_banner + 100;                  
                $col_left.css('top', top);
            }

            if($(window).width() < 767) {
                $col_left.addClass('sticky-filter');
                allpage_fn.modScrollBar ('.sticky-filter');
            }

        });

        catpage_fn.orderProd.modLeftResize ();
        catpage_fn.orderProd.modLeftClickOut ();
    },
    modLeftResize : function () {
        // window resize
        $(window).resize(function (e) {
            $('.filter-prod').removeClass('active');
            $('.block_cate_left').removeClass('cl-active');
            $('.block_cate_left').css('top', 'inherit');
        });
    },
    modLeftClickOut : function () {
        // click out
        $(document).click(function (e){
            if($(e.target).is('.block_cate_left *') || $(e.target).is('.filter-prod') || $(e.target).is('.filter-prodmb')) { return; }
            $('.filter-prod').removeClass('active');
            $('.block_cate_left').removeClass('cl-active');
            $('body').removeClass('body-block');
        });
    },
    /** 
     * Add event fix scroll block view & filter
     */
    stickyFilter : function () {
        $(window).scroll( function (e) { 
            var top = $(this).scrollTop(),
                footer  =   $('.footer').offset().top - 100;

            if( $(window).width() < 767 ) {
                if(top >= 200) {
                    // $('.blk-mb-cateview').addClass('sticky-view');
                    $('.block_cate_left').addClass('sticky-filter');
                } else {
                    $('.blk-mb-cateview').removeClass('sticky-view');
                    $('.block_cate_left').removeClass('sticky-filter');
                }
            } else {
                if(top >= 350) {
                    // $('.blk-view-by').addClass('sticky-view');
                    $('.block_cate_left').addClass('sticky-filter');
                } else {
                    // $('.blk-view-by').removeClass('sticky-view');
                    $('.block_cate_left').removeClass('sticky-filter');
                }

                if(top >= footer) {
                    $('.block_cate_left').addClass('sticky-footer');
                } else {
                    $('.block_cate_left').removeClass('sticky-footer');
                }
            }
        });
    },
}

/* ==================================================== */
/* OnLoad Page */
$(document).ready(function($){
	catpage_fn.orderProd.showStatus ();
	catpage_fn.orderProd.changeStatus ('.pro-sts li a', '.pro-sts', 'a.dpl-status');
	catpage_fn.orderProd.showFilter ('.filter-prod');
    catpage_fn.orderProd.showFilter ('.filter-prodmb');
    catpage_fn.orderProd.stickyFilter ();
});
/* OnLoad Window */
var init = function () {};
window.onload = init;