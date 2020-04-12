/**
 * @description Document DOM ready.
 */
(function () {
	let waveSurferCard = undefined;
	/*
	* =============================================
	* CALLBACK :: start
	* ============================================= */
	const footerBtnToggle = () => {
		$('[footer-toggle-js]').on('click', (ev) => {
			$('[footer-toggle-js]').removeClass('is-active');
			$(ev.currentTarget).addClass('is-active');
		});
	};


	const favoriteToggle = () => {
		$('[favorite-js]').on('click', (ev) => {
			$(ev.currentTarget).toggleClass('is-active');
		});
	};


	const cardOpen = () => {
		const formatTime = function (time) {
			return [
				Math.floor((time % 3600) / 60), // minutes
				('00' + Math.floor(time % 60)).slice(-2) // seconds
			].join(':');
		};

		$('[card-btn-open-js]').on('click', (ev) => {
			const _elParent = $(ev.currentTarget).closest('[card-js]');

			$('body, html').addClass('is-card');

			$('[card-preview-js]').append(_elParent.clone());

			setTimeout(() => {
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
					$('.card__box-audio-currentTime').text( formatTime(waveSurferCard.getDuration() - waveSurferCard.getCurrentTime()) );
				});

				waveSurferCard.on('ready', function () {
					$('.card__box-audio-currentTime').text( formatTime(waveSurferCard.getDuration()) );
					$('.card__box-audio-duration').text( formatTime(waveSurferCard.getDuration()) );
				});
			}, 0);

			cardPlayToggle();
		});
	};


	const cardBack = () => {
		$('[card-back-js]').on('click', (ev) => {
			$('body, html').removeClass('is-card');

			$('[card-preview-js]').find('[card-js]').remove();

			waveSurferCard.empty();
			waveSurferCard.destroy();
		});
	};


	const cardVolume = () => {
		let _count = 0;

		$(document).on('click', '[card-preview-js] [card-volume-js]', (ev) => {
			const _el = $(ev.currentTarget),
				_countNode = $('[card-volume-count-js]');

			if (_count > 3 || _count < 0) {
				return false;
			}

			_count += 1;

			if(_count === 1) {
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


	const cardPlayToggle = () => {
		$('[card-play-js]').on('click', (ev) => {
			if($(ev.currentTarget).hasClass('is-play')) {
				$(ev.currentTarget).removeClass('is-play');
				waveSurferCard.pause();
			} else {
				$(ev.currentTarget).addClass('is-play');
				waveSurferCard.play();
			}
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
	const initNative = () => {
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
		// ==========================================
	};
	initNative();
})();
