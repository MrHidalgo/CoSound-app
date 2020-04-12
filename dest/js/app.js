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
		speed: 350,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			stretch: 80,
			depth: 200,
			modifier: 1,
			slideShadows: true
		},
		centeredSlides: true,
		centeredSlidesBounds: true,
		centerInsufficientSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 100,
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
	var waveSurferCard = undefined;
	/*
 * =============================================
 * CALLBACK :: start
 * ============================================= */
	var footerBtnToggle = function footerBtnToggle() {
		$('[footer-toggle-js]').on('click', function (ev) {
			$('[footer-toggle-js]').removeClass('is-active');
			$(ev.currentTarget).addClass('is-active');
		});
	};

	var favoriteToggle = function favoriteToggle() {
		$('[favorite-js]').on('click', function (ev) {
			$(ev.currentTarget).toggleClass('is-active');
		});
	};

	var cardOpen = function cardOpen() {
		var formatTime = function formatTime(time) {
			return [Math.floor(time % 3600 / 60), // minutes
			('00' + Math.floor(time % 60)).slice(-2) // seconds
			].join(':');
		};

		$('[card-btn-open-js]').on('click', function (ev) {
			var _elParent = $(ev.currentTarget).closest('[card-js]');

			$('body, html').addClass('is-card');

			$('[card-preview-js]').append(_elParent.clone());

			setTimeout(function () {
				waveSurferCard = WaveSurfer.create({
					container: document.querySelector('[card-preview-js] #cardwave'),
					waveColor: '#5A5A5A',
					progressColor: '#fff',
					cursorColor: '#fff',
					barWidth: 3,
					barRadius: 3,
					cursorWidth: 0,
					height: 110,
					barGap: 3,
					responsive: true
				});

				waveSurferCard.load('media/audio.mp3');

				waveSurferCard.on('audioprocess', function () {
					$('.card__box-audio-currentTime').text(formatTime(waveSurferCard.getDuration() - waveSurferCard.getCurrentTime()));
				});

				waveSurferCard.on('ready', function () {
					$('.card__box-audio-currentTime').text(formatTime(waveSurferCard.getDuration()));
					$('.card__box-audio-duration').text(formatTime(waveSurferCard.getDuration()));
				});
			}, 0);

			cardPlayToggle();
		});
	};

	var cardBack = function cardBack() {
		$('[card-back-js]').on('click', function (ev) {
			$('body, html').removeClass('is-card');

			$('[card-preview-js]').find('[card-js]').remove();

			waveSurferCard.empty();
			waveSurferCard.destroy();
		});
	};

	var cardVolume = function cardVolume() {
		var _count = 0;

		$(document).on('click', '[card-preview-js] [card-volume-js]', function (ev) {
			var _el = $(ev.currentTarget),
			    _countNode = $('[card-volume-count-js]');

			if (_count > 3 || _count < 0) {
				return false;
			}

			_count += 1;

			if (_count === 1) {
				_countNode.text('+ 1');
				_el.addClass('is-volume-one');
			} else if (_count === 2) {
				_countNode.text('+ 2');
				_el.removeClass('is-volume-one').addClass('is-volume-two');
			} else if (_count === 3) {
				_countNode.text('+ 3');
				_el.removeClass('is-volume-one, is-volume-two').addClass('is-volume-three');
			}
		});
	};

	var cardPlayToggle = function cardPlayToggle() {
		$('[card-play-js]').on('click', function (ev) {
			if ($(ev.currentTarget).hasClass('is-play')) {
				$(ev.currentTarget).removeClass('is-play');
				waveSurferCard.pause();
			} else {
				$(ev.currentTarget).addClass('is-play');
				waveSurferCard.play();
			}
		});
	};

	var slideToAction = function slideToAction() {
		var xDown = null,
		    yDown = null;

		function handleTouchStart(evt) {
			xDown = evt.touches[0].clientX;
			yDown = evt.touches[0].clientY;
		}

		function handleTouchMove(evt) {

			if (!xDown || !yDown) {
				return;
			}

			var xUp = evt.touches[0].clientX,
			    yUp = evt.touches[0].clientY,
			    xDiff = xDown - xUp,
			    yDiff = yDown - yUp;

			if (Math.abs(xDiff) + Math.abs(yDiff) > 150) {

				if (Math.abs(xDiff) > Math.abs(yDiff)) {
					if (xDiff > 0) {
						// left swipe
					} else {
						// right swipe
						$('body, html').removeClass('is-card');

						$('[card-preview-js]').find('[card-js]').remove();

						waveSurferCard.empty();
						waveSurferCard.destroy();
					}
				} else {
					// if ( yDiff > 0 ) {
					// // up swipe
					// } else {
					// // down swipe
					// }
				}

				xDown = null;
				yDown = null;
			}
		}

		var _swipeNode = document.querySelector('[card-preview-js]');

		if (_swipeNode) {
			_swipeNode.addEventListener('touchstart', handleTouchStart, false);
			_swipeNode.addEventListener('touchmove', handleTouchMove, false);
		}
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
		favoriteToggle();
		cardOpen();
		cardBack();
		cardVolume();
		slideToAction();
		// ==========================================
	};
	initNative();
})();