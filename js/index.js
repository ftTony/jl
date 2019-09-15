import 'swiper/dist/css/swiper.min.css'
import '../style/index.css'
import Swiper from 'swiper'
import '../style/fonts/iconfont.css'

var style_list = [
    'icon-zhuye',
    'icon-jinengzhangwo',
    'icon-gongzuojingyan',
    'icon-zuopinzhanshi',
    'icon-lianxifangshi'
];

new Swiper('.swiper-container-h', {
    direction: 'vertical',
    slidesPerView: 1,
    mousewheel: true,
    pagination: {
        el: '.swiper-pagination-h',
        clickable: true,
        renderBullet: function (index, className) {
            var text = '';
            switch (index) {
                case 0:
                    text = '基本信息';
                    break;
                case 1:
                    text = '专业技能';
                    break;
                case 2:
                    text = '工作经验';
                    break;
                case 3:
                    text = '个人作品';
                    break;
                case 4:
                    text = '联系方式';
                    break;
            }
            return '<div class="' + className + '"><i class=" icon iconfont ' + style_list[index] + '"></i><span class="msg">' + text + '</span></div>';
        }
    }
});

var swiperV = new Swiper('.swiper-container-v', {
    direction: 'horizontal',
    spaceBetween: 50,
    slidesPerView: 3,
    loop: true,
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination-v',
        clickable: true,
    },
});