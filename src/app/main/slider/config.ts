import { SwiperOptions } from "swiper";

export const swiperConfig: SwiperOptions = {
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    spaceBetween: 1500
};