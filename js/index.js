import 'swiper/dist/css/swiper.min.css'
import '../style/index.css'
import Swiper from 'swiper'

new Swiper('.swiper-container', {
    direction: 'vertical',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});