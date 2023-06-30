
//===== Preloader
window.onload = function () {
    window.setTimeout(fadeout, 200);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}


$(function() {
    
    "use strict";

    /*=============================================
    =                  Sticky                     =
    =============================================*/

	$(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll < 110) {
            $(".navigation").removeClass("sticky");
        } else{
            $(".navigation").addClass("sticky");
        }
    });
    
    /*=====  End of Sticky  ======*/
    
    
    /*=============================================
    =            product quantity                =
    =============================================*/

	$('.add').click(function () {
        if ($(this).prev().val()) {
            $(this).prev().val(+$(this).prev().val() + 1);
        }
    });
    $('.sub').click(function () {
        if ($(this).next().val() > 1) {
            if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
        }
    });
    
    /*=====  End of product quantity  ======*/
    
    
    
    /*=============================================
    =              Nice Select                    =
    =============================================*/

	$('select').niceSelect();
    
    /*=====  End of   ======*/    
    
    
    /*=============================================
    =                Mobile Menu                  =
    =============================================*/

    /*-------- Mobile Menu Sidebar 7 --------*/
    
    $('.mobile-menu-open-7').on('click', function(){
        $('.navbar-sidebar-7').addClass('open')
        $('.overlay-7').addClass('open')
    });
    
    $('.close-mobile-menu-7').on('click', function(){
        $('.navbar-sidebar-7').removeClass('open')
        $('.overlay-7').removeClass('open')
    });
    
    $('.overlay-7').on('click', function(){
        $('.navbar-sidebar-7').removeClass('open')
        $('.overlay-7').removeClass('open')
    });

    /*-------- Mobile Menu Dark Sidebar  7 --------*/

    $('.mobile-menu-open-dark-7').on('click', function(){
        $('.navbar-sidebar-dark-7').addClass('open')
        $('.overlay-dark-7').addClass('open')
    });
    
    $('.close-mobile-menu-dark-7').on('click', function(){
        $('.navbar-sidebar-dark-7').removeClass('open')
        $('.overlay-dark-7').removeClass('open')
    });
    
    $('.overlay-dark-7').on('click', function(){
        $('.navbar-sidebar-dark-7').removeClass('open')
        $('.overlay-dark-7').removeClass('open')
    });

    

    /*-------- Window Resize javascript Responsive Function --------*/
    
    let body = document.querySelector('body');
    function displayWindowSize(){
       var w = document.documentElement.clientWidth;

       if (w > 991) {
           // YOUR CODE...
           $('.main-navbar').removeClass('mobile-menu');
           $('.mega-dropdown-menu').removeClass('mobile-menu-dropdown');

           /*-------- Mobile Menu javascript Function --------*/
    
            /*Variables*/
            var $offCanvasNav = $('.mobile-menu');
            var $offCanvasNavSubMenu = $offCanvasNav.find('.sub-mega-dropdown, .sub-menu, .mega-dropdown-list ul');

            /*Add Toggle Button With Off Canvas Sub Menu*/
            $offCanvasNavSubMenu.parent().prepend('<span class="d-none"></span>');

            /*Close Off Canvas Sub Menu*/
            $offCanvasNavSubMenu.slideDown();

            /*Category Sub Menu Toggle*/
            $offCanvasNav.on('click', 'li a, li .menu-expand, .mega-dropdown-list .mega-title', function (e) {
                var $this = $(this);
                if (($this.parent().attr('class').match(('menu-item-has-children')))) {
                    
                    if ($this.siblings('ul:visible').length) {
                        e.preventDefault();
                            $this.parent('li').removeClass('active');
                            $this.siblings('ul').slideDown();
                        } else {
                            $this.parent('li').addClass('active');
                            $this.closest('li').siblings('li').find('ul:visible').slideDown();
                            $this.closest('li').siblings('li').removeClass('active');
                            $this.siblings('ul').slideUp();
                        }
                }
            });
       }
       else{
           // YOUR CODE...
           $('.main-navbar').addClass('mobile-menu');
           $('.mega-dropdown-menu').addClass('mobile-menu-dropdown');

           /*-------- Mobile Menu javascript Function --------*/
    
            /*Variables*/
            var $offCanvasNav = $('.mobile-menu');
            var $offCanvasNavSubMenu = $offCanvasNav.find('.sub-mega-dropdown, .sub-menu, .mega-dropdown-list ul');

            /*Add Toggle Button With Off Canvas Sub Menu*/
            $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand d-lg-none"></span>');

            /*Close Off Canvas Sub Menu*/
            $offCanvasNavSubMenu.slideUp();

            /*Category Sub Menu Toggle*/
            $offCanvasNav.on('click', 'li a, li .menu-expand, .mega-dropdown-list .mega-title', function (e) {
                var $this = $(this);
                if (($this.parent().attr('class').match(('menu-item-has-children')))) {
                    
                    if ($this.siblings('ul:visible').length) {
                        e.preventDefault();
                            $this.parent('li').removeClass('active');
                            $this.siblings('ul').slideUp();
                        } else {
                            $this.parent('li').addClass('active');
                            $this.closest('li').siblings('li').find('ul:visible').slideUp();
                            $this.closest('li').siblings('li').removeClass('active');
                            $this.siblings('ul').slideDown();
                        }
                }
            });
       }
    } 
    window.addEventListener("resize", displayWindowSize);
    displayWindowSize();    
	
    
    /*=====  End of Mobile Menu  ======*/
   
    
    /*=============================================
    =          Toggle Password Show               =
    =============================================*/

	 $(".toggle-password").click(function() {

      $(this).toggleClass("fa-eye fa-eye-slash");
        
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
    
    /*=====  End of   ======*/ 

    /*=============================================
    =           Product Size Active               =
    =============================================*/

	$('.filter-size ul li').on("click", function() {
		$(this).siblings(this).removeClass('active').end().addClass('active');
	});
    
    /*=====  End of Product Size Active ======*/
    
    /*=============================================
    =           Slick product Active  1           =
    =============================================*/

    $('.product-active').slick({
        dots: false,
        infinite: false,
        arrows: true,
        prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    });



    /*=====  End of Slick Collection Active  ======*/


    /*=============================================
    =           Product Item Active               =
    =============================================*/

	$('.items-wrapper .single-item').on("click", function() {
		$(this).siblings(this).removeClass('active').end().addClass('active');
	});
    
    /*=====  End of Product Size Active ======*/


    /*=============================================
    =           Product size Active               =
    =============================================*/

	$('.size-select li').on("click", function() {
		$(this).siblings(this).removeClass('active').end().addClass('active');
	});
    
    /*=====  End of Product Size Active ======*/


    /*=============================================
    =           Product Country Active               =
    =============================================*/

	$('.country-select li').on("click", function() {
		$(this).siblings(this).removeClass('active').end().addClass('active');
	});
    
    /*=====  End of Product Size Active ======*/

    
    /*=============================================
    =           Product Color Active               =
    =============================================*/

    $('.color-select li').each(function() {
		var get_color = $(this).attr('data-color');
		$(this).css("background-color", get_color);
    });
    
	$('.color-select li').on("click", function() {
		$(this).siblings(this).removeClass('active').end().addClass('active');
    });
    
    /*=====  End of Product Size Active ======*/
    
    
    /*=============================================
    =        slick Slider Product Details         =
    =============================================*/

    /*-------- Product Details 1 --------*/

    $('.product-image-active-1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.product-thumb-image-active-1',
        speed: 600,
    });

    
    
    $('.product-thumb-image-active-1').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.product-image-active-1',
        dots: false,
        arrows: true,
        prevArrow:'<span class="prev"><i class="fa fa-angle-up"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-down"></i></span>',
        focusOnSelect: true,
        vertical: true,
        speed: 600,
    });

    /*-------- Product Details 2 --------*/

    $('.product-image-active-2').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.product-thumb-image-active-2',
        speed: 600,
    });
    
    $('.product-thumb-image-active-2').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.product-image-active-2',
        dots: false,
        arrows: true,
        prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
        focusOnSelect: true,
        speed: 600,
    });
    
    /*=====  End of slick Slider Product Details ======*/

    /*=============================================
    =     slick Slider Content Card Style 3       =
    =============================================*/

    $('.content-preview-active').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
        dots: false,
        fade: true,
        asNavFor: '.content-thumb-active',
        speed: 400,
    });
    
    $('.content-thumb-active').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.content-preview-active',
        dots: false,
        infinite: false,
        arrows: false,
        focusOnSelect: true,
        speed: 400,
    });

    /*=====  End of slick Slider Content Card Style 3 ======*/
    
    /*=============================================
    =               Content Active                =
    =============================================*/

	$('.content-active').slick({
        dots: true,
        infinite: false,
        autoplay: true,
        arrows: false,
        prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    
    /*=====  End of Content Active  ======*/

    /*=============================================
    =            Header Items Active              =
    =============================================*/

	$('.header-items-active').slick({
        dots: true,
        infinite: false,
        autoplay: true,
        arrows: false,
        prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    
    /*=====  End of Header Items Active ======*/

    /*=============================================
    =          Header 4 Slider Active             =
    =============================================*/

	$('.header-4-active').slick({
        dots: true,
        infinite: false,
        autoplay: true,
        arrows: false,
        prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    
    /*=====  End of Header Items Active ======*/

    /*=============================================
    =          Header 5 Slider Active             =
    =============================================*/

	$('.header-5-active').slick({
        dots: true,
        infinite: false,
        autoplay: true,
        arrows: false,
        prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    
    /*=====  End of Header Items Active ======*/

    /*=============================================
    =          Header 7 Slider Active             =
    =============================================*/

	$('.header-7-active').slick({
        dots: true,
        infinite: false,
        autoplay: true,
        arrows: false,
        prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    
    /*=====  End of Header Items Active ======*/

    /*=============================================
    =               Rating Active                 =
    =============================================*/

    /*-------- Rating 1 --------*/

    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
        
        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e){
            if (e < onStar) {
                $(this).addClass('hover');
            }
            else {
                $(this).removeClass('hover');
            }
        });
        
    }).on('mouseout', function(){
        $(this).parent().children('li.star').each(function(e){
            $(this).removeClass('hover');
        });
    });
    
    
    /* 2. Action to perform on click */
    var spansCounts =  $('#stars li').length
    $('#stars li').on('click', function(e) {
        console.log($(this).index())
        $('#stars li').removeClass('selected');

        for(var i=0 ; i < $(this).index() + 1; i++){
            $('#stars li').eq(i).addClass('selected')
        }
    })    


    /*-------- Rating 2 --------*/

    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars2 li').on('mouseover', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
        
        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e){
            if (e < onStar) {
                $(this).addClass('hover');
            }
            else {
                $(this).removeClass('hover');
            }
        });
        
    }).on('mouseout', function(){
        $(this).parent().children('li.star').each(function(e){
            $(this).removeClass('hover');
        });
    });
    
    
    /* 2. Action to perform on click */
    var spansCounts =  $('#stars2 li').length
    $('#stars2 li').on('click', function(e) {
        console.log($(this).index())
        $('#stars2 li').removeClass('selected');

        for(var i=0 ; i < $(this).index() + 1; i++){
            $('#stars2 li').eq(i).addClass('selected')
        }
    })    

    /*=====  End of Rating Active ======*/
    
    /*=============================================
    =                                    =
    =============================================*/

	
    
    /*=====  End of   ======*/
    
    
    
    // client-logo-active 
    $('.client-logo-active').slick({
        dots: false,
        infinite: false,
        autoplay: true,
        arrows: false,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    
    $('.flavour-active').slick({
        dots: false,
        infinite: false,
        autoplay: true,
        arrows: false,
        speed: 600,
        slidesToShow: 8,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 2690,
                settings: {
                    slidesToShow: 8,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 7,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
});

$('.store-active').slick({
        dots: false,
        infinite: false,
        autoplay: true,
        arrows: false,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

$('.backry-active').slick({
        dots: false,
        infinite: false,
        autoplay: true,
        arrows: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

$(document).ready(function() {
        var CurrentUrl = document.URL;
        var CurrentUrlEnd = CurrentUrl.split('/').filter(Boolean).pop();

        $(".user-list a").each(function() {
            var ThisUrl = $(this).attr('href');
            var ThisUrlEnd = ThisUrl.split('/').filter(Boolean).pop();
            if (ThisUrlEnd == CurrentUrlEnd)
                $(this).addClass('active')
        });
    });



