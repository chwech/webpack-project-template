import 'normalize.css'
import './index.less'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper.js';
import 'lazysizes';

const mySwiper = new Swiper ('.swiper-container', {
  autoplay: true,
  pagination: {
    el: '.swiper-pagination',
    bulletClass : 'pagination-bullet',
    bulletActiveClass: 'pagination-bullet-active',
    clickable: true
  }
})
