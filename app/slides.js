/**
 * Slides - a HTML5 & CSS3 presentations boilerplate
 * @author Ondrej Slamecka, www.slamecka.cz
 * @copyright 2012, Ondrej Slamecka
 * @license BSD-3
 */

;(function($){
	"use strict";

	var options = {
		speed: 500
	};

	/* --- Variables --- */
	var $slides = $('.slide');
	var $landscape = $('html,body');

	/* --- Setup ids for slides --- */
	$slides.each(function(index, element){
		var $element = $(element);
		if (typeof $element.attr('id') === "undefined") {
			$element.attr('id', 'slide-' + (index + 1));
		}
	});

	/* --- Landing slide --- */
	var shownSlide = 1;
	if (window.location.hash !== "") {
		shownSlide = $slides.index($(location.hash)) + 1;

		if(shownSlide === 0) { // usually -1 but we did + 1
			console.log('Warning: Slide with id ' + location.hash + ' does not exist.');
			shownSlide = 1;
		}
	}

	/* --- Dimensions --- */
	var window_width,
		window_height;

	function resize()
	{
		window_width = $(window).width();
		window_height = $(window).height();

		// Landscape width	
		$landscape.width(window_width * $slides.length);

		// Slides dimensions
		$slides.width(window_width);
		$('article', $slides).each(function(i, el){
			$(el).css('margin-top', (window_height - el.offsetHeight)/(5/2) + 'px');
		});

		$landscape.scrollLeft(window_width * (shownSlide - 1));
	}

	resize();
	window.onresize = resize;

	/* --- Sliding --- */
	function next()
	{
		shownSlide++;
		if(shownSlide > $slides.length) {
			shownSlide--;
		} else {
			$landscape.stop().animate({scrollLeft: window_width * (shownSlide - 1)}, options.speed, function() {
				window.location.hash = $($slides.get(shownSlide - 1)).attr('id') || shownSlide;
			});
		}
	}

	function previous()
	{
		shownSlide--;
		if(shownSlide === 0) {
			shownSlide++;
		} else {
			$landscape.stop().animate({scrollLeft: window_width * (shownSlide - 1)}, options.speed, function() {
				window.location.hash = $($slides.get(shownSlide - 1)).attr('id') || shownSlide;
			});					
		}
	}

	/* --- Event handling --- */
	var isTouchDevice = (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);	
	
	if (isTouchDevice) {
		// Touch
		$landscape.addSwipeEvents()
			.bind('swipeleft', function() {
				next();
			})
			.bind('swiperight', function() {
				previous();
			});
		
		$('#control-instructions').text('Swipe to move');
	} else {
		// Click
		$landscape.mousedown(function(event) {
			if ($slides.index(event.target) !== -1) {
				event.stopImmediatePropagation();
				if (event.which === 3) { // right click
					previous();
				} else {
					next();
				}
			}
		});

		$landscape.bind('contextmenu', function(event){
			if ($slides.index(event.target) !== -1) {
				return false;
			}
		}); 

		// Keyboard
		$(window).keydown(function(event) {
			switch(event.keyCode) {
				case 39: // right arrow
					next();
					break;
				case 37: // left arrow
					previous();
					break;
			}		
		});
	} // if is not a touch device

})(jQuery);
