"use strict";

/**
 * @name initPreventBehavior
 *
 * @description
 */
var initPreventBehavior = function initPreventBehavior() {

	var link = document.querySelectorAll("a");

	link.forEach(function (val, idx) {

		val.addEventListener("click", function (e) {
			if (val.getAttribute("href") === "#") {
				e.preventDefault();
			}
		});
	});
};

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
var initSwiper = function initSwiper() {

	var cardSwiper = new Swiper('.cardCarousel', {
		direction: 'vertical',
		loop: false,
		grabCursor: true,
		freeMode: false,
		speed: 800,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			stretch: 80,
			depth: 200,
			modifier: 1,
			slideShadows: false
		},
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 30,
		on: {
			"touchMove": function touchMove() {
				$(this.wrapperEl).closest('.card__carousel').addClass('is-touchMove');
			},
			"touchEnd": function touchEnd() {
				$(this.wrapperEl).closest('.card__carousel').removeClass('is-touchMove');
			}
		}
	});
};

/**
 * @description Document DOM ready.
 */
(function () {
	/*
 * =============================================
 * CALLBACK :: start
 * ============================================= */
	var footerBtnToggle = function footerBtnToggle() {
		$('[footer-toggle-js]').on('click', function (ev) {
			// $('[footer-toggle-js]').removeClass('is-active');
			// $(ev.currentTarget).addClass('is-active');
		});
	};
	/*
 * CALLBACK :: end
 * ============================================= */

	/**
  * @name initNative
  *
  * @description Init all method
  */
	var initNative = function initNative() {
		// default
		initPreventBehavior();
		// ==========================================

		// lib
		initSwiper();
		// ==========================================

		// callback
		footerBtnToggle();
		// ==========================================
	};
	initNative();
})();