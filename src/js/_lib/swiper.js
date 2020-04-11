

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
const initSwiper = () => {

  const cardSwiper = new Swiper('.cardCarousel', {
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
			slideShadows: true,
		},
		centeredSlides: true,
		centeredSlidesBounds: true,
		centerInsufficientSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 100,
    on: {
      "touchMove": function () {
      	$(this.wrapperEl).closest('.card__carousel').addClass('is-touchMove');
			},
      "touchEnd": function () {
      	$(this.wrapperEl).closest('.card__carousel').removeClass('is-touchMove');
			},
    }
  });
};
