/**
 * @author Fedor Pudeyan
 */

$(function(){
	
/* 	$('#bestsellers .details').hide(); */


	var controller = $.superscrollorama();
	
	// Header
	var win = $(window), header = $('header')
	$(window).on('scroll resize', function() {
		var scrollOffset = win.scrollLeft()
		header.css({left: scrollOffset > 0 ? -scrollOffset : 'auto'})
		
		$("#design .popular .items, #bestsellers .items").mCustomScrollbar("update")
	})

	controller.addTween(
		0,
		(new TimelineMax()).append([
			TweenMax.fromTo(
				$('header'),
				.5, 
				{css:{height: 88}, immediateRender:true}, 
				{css:{height: 31}}),
			TweenMax.fromTo(
				$('header .logo'),
				.5, 
				{css:{left: -30}, immediateRender:true}, 
				{css:{left: 0}}),
			TweenMax.fromTo(
				$('header .logo img'),
				.5, 
				{css:{height: 88}, immediateRender:true}, 
				{css:{height: 47}}),
			TweenMax.fromTo(
				$('header .contacts, header .sign-in, header .locale-switch'),
				.5, 
				{css:{opacity: 1}, immediateRender:true}, 
				{css:{opacity: 0}}),
	    ]),
		172
	)
	
	// Top promo
/*
	controller.addTween(
		0,
		(new TimelineMax()).append([
			TweenMax.fromTo(
				$('#top-promo .item .background'),
				.5, 
				{css:{marginTop: -214}, immediateRender:true}, 
				{css:{marginTop: 0}}),
	    ]),
		800
	)
*/

	// Constructor
	controller.addTween(
		0,
		(new TimelineMax()).append([
			TweenMax.fromTo(
				$('#design .latest .inner'),
				.5, 
				{css:{marginBottom: -130}, immediateRender:true}, 
				{css:{marginBottom: 90}}),

	    ]),
		500
	)

	// Constructor
	controller.addTween(
		0,
		(new TimelineMax()).append([
			TweenMax.fromTo(
				$('#design .pattern-1'),
				.5, 
				{css:{top: 158}, immediateRender:true}, 
				{css:{top: 48}}),
			TweenMax.fromTo(
				$('#design .arrow'),
				.5, 
				{css:{top: 160}, immediateRender:true}, 
				{css:{top: 50}}),
			TweenMax.fromTo(
				$('#design .pattern-2'),
				.5, 
				{css:{top: 139}, immediateRender:true}, 
				{css:{top: 70}}),
			TweenMax.fromTo(
				$('#design .pattern-3'),
				.5, 
				{css:{top: 128}, immediateRender:true}, 
				{css:{top: 90}}),
			TweenMax.fromTo(
				$('#design .item .front'),
				.5, 
				{css:{marginTop: 0}, immediateRender:true}, 
				{css:{marginTop: -100}}),
			TweenMax.fromTo(
				$('#design .item .back'),
				.5, 
				{css:{marginTop: 0}, immediateRender:true}, 
				{css:{marginTop: -50}}),
			TweenMax.fromTo(
				$('#design .item .plate'),
				.5, 
				{css:{marginTop: 0}, immediateRender:true}, 
				{css:{marginTop: -200}}),
			TweenMax.fromTo(
				$('#design .item .front-shadow, #design .item .back-shadow'),
				.5, 
				{css:{opacity: 1}, immediateRender:true}, 
				{css:{opacity: 0}}),
			TweenMax.fromTo(
				$('#design .connect'),
				.5, 
				{css:{marginTop: 0}, immediateRender:true}, 
				{css:{marginTop: -35}}),

	    ]),
		800
	)
	
	// Company
	controller.addTween(
		300,
		(new TimelineMax()).append([
			TweenMax.fromTo(
				$('#company .horse'),
				.5, 
				{css:{width: 150, height: 0}, immediateRender:true}, 
				{css:{width: 332, height: 315}}),
			TweenMax.fromTo(
				$('#company .how-it-works'),
				.5, 
				{css:{marginBottom: 0}, immediateRender:true}, 
				{css:{marginBottom: 150}}),
	    ]),
		800
	)
		
	$('#design .promo .switch span').click(function() {
		var choose = $(this).data('choose'),
		promo = $(this).closest('.promo')
		
		if(!promo.hasClass(choose))
			promo.attr('class', 'promo').addClass(choose)
	})

	// Popular items scroller 
	
	var popularItemsCount = $('#design .popular .items .item').size(),
	popularItemsScrollerWidth = popularItemsCount * 9 + (popularItemsCount - 1) * 14 + 10;

	$("#design .popular .items")
		.mCustomScrollbar({
			horizontalScroll:true,
			mouseWheel:false,
			autoDraggerLength:false
		})
		.find('.mCSB_draggerContainer, .mCSB_draggerRail')
		.css({'width': popularItemsScrollerWidth + 'px'});

	$("#design .popular .items")
		.mCustomScrollbar('update');
		
	// Bestseller items scroller 
	
	var bestsellerItemsCount = $('#bestsellers .items .item').size(),
	bestsellerItemsScrollerWidth = bestsellerItemsCount * 9 + (bestsellerItemsCount - 1) * 14 + 8;
	
	var detailsArrows = $('#bestsellers .details .arrows .inner');

	var updateDetailsArrowPosition = function() {
		var selectedItem = $("#bestsellers .items .item.selected"),
		scrollPosition = $('#bestsellers .mCSB_container').position().left;
	
		if(!selectedItem.size()) return;
		detailsArrows.css({left: selectedItem.position().left + scrollPosition + ((selectedItem.outerWidth())/2) + parseInt(selectedItem.css('margin-left')) + 'px'})
	},
	showDetails = function() {
		updateDetailsArrowPosition();
		$('#bestsellers .details').slideDown(800);
		$('#bestsellers .details .arrows .top').animate({'border-top-width': 0}, 800);
		$('#bestsellers .details').find('.next, previous, .close').fadeIn(800);
	},
	hideDetails = function() {
		$('#bestsellers .details').slideUp(800);
		$('#bestsellers .details .arrows .top').animate({'border-top-width': '19px'}, 800);
		$('#bestsellers .details').find('.next, previous, .close').fadeOut(800);
	},
	nextDetails = function(evt) {
		evt.preventDefault();
		var selectedItem = $("#bestsellers .items .item.selected"),
		nextItem = selectedItem.next('.item');
		if(!nextItem.size()) return;
		nextItem.find('a.model').click();
	},
	previousDetails = function(evt) {
		evt.preventDefault();
		var selectedItem = $("#bestsellers .items .item.selected"),
		previousItem = selectedItem.prev('.item');
		if(!previousItem.size()) return;
		previousItem.find('a.model').click();
	}
	$("#bestsellers .items")
		.mCustomScrollbar({
			horizontalScroll:true,
			mouseWheel:false,
			autoDraggerLength:false,
			scrollInertia:250,
			callbacks:{
				whileScrolling: updateDetailsArrowPosition
			}
		})
		.find('.mCSB_draggerContainer, .mCSB_draggerRail')
		.css({'width': bestsellerItemsScrollerWidth + 'px'});

	$("#bestsellers .items")
		.mCustomScrollbar('update');
	

	$('#bestsellers .items .model, #bestsellers .items .photo').click(function(evt) {
		evt.preventDefault();
		var item = $(this).closest('.item');
		item.addClass('selected').siblings('.selected').removeClass('selected');

		$("#bestsellers .items").mCustomScrollbar("scrollTo",'#'+item.attr('id'));
		showDetails();
	})
	$('#bestsellers .details .close').click(function(evt) {
			evt.preventDefault();
			hideDetails();
			$("#bestsellers .items .item.selected").removeClass('selected');
	})
	$('#bestsellers .details .next').click(nextDetails)
	$('#bestsellers .details .previous').click(previousDetails)

});