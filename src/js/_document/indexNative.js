/**
 * @description Document DOM ready.
 */
(function () {
	/*
	* =============================================
	* CALLBACK :: start
	* ============================================= */
	const footerBtnToggle = () => {
		$('[footer-toggle-js]').on('click', (ev) => {
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
	const initNative = () => {
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
