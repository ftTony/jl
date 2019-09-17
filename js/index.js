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
    },
    on: {
        init: function () {

        },
        transitionStart: function () {
            for (var i = 0; i < this.slides.length; i++) {
                this.slides.eq(i).removeClass('ani-slide');
                this.slides.eq(i).removeClass('jy-slide');
            }
        },
        transitionEnd: function () {
            if (this.activeIndex === 1) this.slides.eq(this.activeIndex).addClass('ani-slide');
            if (this.activeIndex === 2) this.slides.eq(this.activeIndex).addClass("jy-slide");

        }
    }
});

new Swiper('.swiper-container-v', {
    direction: 'horizontal',
    spaceBetween: 30,
    slidesPerView: 3,
    loop: true,
    centeredSlides: true,
    on: {
        touchStart: function (e) {
            e.preventDefault();
            console.log(e);
        }
    },
    pagination: {
        el: '.swiper-pagination-v',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});