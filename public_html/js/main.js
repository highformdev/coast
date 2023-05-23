let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh + 'px');
// document.documentElement.style.setProperty('--vh-2', vh + 'px');
let wh = window.innerHeight;
// var isMobile = /iPhone|iPad|iPod|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile|BlackBerry|IEMobile|Opera
// Mini|Android/i.test(navigator.userAgent);
window.addEventListener('resize', function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    // if (!isMobile) {
    //     document.documentElement.style.setProperty('--vh-2', vh + 'px');
    // }
});
$('[data-toggle="modal"]').on('click', function () {
    let modal = $(this).data('target');
    $('body').addClass('modal-open');
    $('.modal-backdrop').fadeIn(400);
    $(modal).fadeIn(400).addClass('show');
    return false;
})
function hide_modal(modal) {
    modal.fadeOut(400).removeClass('show');
    $('.modal-backdrop').fadeOut(400);
    $('body').removeClass('modal-open');
}
$('.modal .close').on('click', function () {
    hide_modal($(this).parents('.modal'))
})
$('.modal').on('click', function (e) {
    if ($(e.target).is('.modal')) {
        hide_modal($(this))
    }
})
// function header_st_2() {
//     let scroll_top = $(window).scrollTop();
//     if (scroll_top > 0) {
//         $('body').addClass('body-scroll');
//     }
//     if (scroll_top <= 0) {
//         $('body').removeClass('body-scroll');
//     }
// }
// header_st_2();
// $(window).on('scroll', function () {
//     header_st_2();
// });
if ($('[data-scrollto]').length) {
    $('[data-scrollto]').on('click', function (event) {
        let elementId = $(this).data('scrollto'),
            trip = $(elementId).offset().top;
        let paddingOffset = 0;
        let idOffset = trip - paddingOffset;
        $('html,body').animate(
            {
                scrollTop: idOffset
            },
            2000
        );
        return false;
    });
}
$(window).on('load', function () {
    // if ($('.s-map').length) {
    //     document.documentElement.style.setProperty('--map-height', $('.s-map__form-wrap').height() + 'px');
    //     $('.s-map').css('min-height', $('.s-map__form-wrap').height() + 40)
    //     $(window).on('resize', () => {
    //         $('.s-map').css('min-height', $('.s-map__form-wrap').height() + 40)
    //     })
    //     map.resize();
    // }
    $('html').addClass('page-load');
    // $('.second-bg').addClass('show');
    // if (window.innerWidth > 1199) {
    if ($('.wow').length) {
        $('.wow').each(function (i, el) {
            let thisBlock = $(el);
            let start_val = 'top 90%';
            if (thisBlock.is('.hero-wow')) {
                start_val = 'top bottom';
            }
            if (thisBlock.is('.swiperNav')) {
                start_val = 'top bottom+=50px';
            }
            let wow_tl = gsap.timeline({
                scrollTrigger: {
                    trigger: thisBlock,
                    start: start_val,
                    once: true,
                }
            });
            wow_tl.to(thisBlock, {
                ease: 'none',
                duration: .1,
                autoAlpha: 1,
                y: 0,
                x: 0,
                stagger: .1,
            });
        });
    }
    $('.parallax-js').each(function (i, el) {
        let thisBlock = $(el);
        let start_val = 'top 85%';
        let end_val = 'bottom top';
        let translate_sign = '-';
        let translateY_val = '30px';
        let translateX_val = '0';
        let rotate_val = '0';
        let scale_val = 1;
        if (thisBlock.is('.parallax-hero-cloud-js')) {
            start_val = 'top top';
        }
        if (thisBlock.is('.parallax-hero-img-js')) {
            start_val = 'top 50%';
        }
        if (thisBlock.is('.parallax-down-js')) {
            translate_sign = ' ';
        }
        if (thisBlock.is('.parallax-right-js')) {
            translateY_val = '0';
            translateX_val = '30px';
            translate_sign = ' ';
        }
        if (thisBlock.is('.parallax-left-js')) {
            translateY_val = '0';
            translateX_val = '30px';
        }
        if (thisBlock.is('.parallax-1-js')) {
            translateY_val = '50px';
        }
        if (thisBlock.is('.parallax-2-js')) {
            translateY_val = '70px';
        }
        if (thisBlock.is('.parallax-3-js')) {
            translateY_val = '100px';
        }
        if (thisBlock.is('.parallax-rotate-js')) {
            rotate_val = '80';
            start_val = 'top 10%';
            if (thisBlock.is('.parallax-rotate-hero-js')) {
                start_val = 'top top+=' + $('.hero__compass')[0].getBoundingClientRect().y
            }
        }
        if (thisBlock.is('.parallax-1-js') && thisBlock.is('.parallax-right-js') || thisBlock.is('.parallax-1-js') && thisBlock.is('.parallax-left-js')) {
            translateY_val = '0';
            translateX_val = '50px';
        }
        if (thisBlock.is('.parallax-2-js') && thisBlock.is('.parallax-right-js') || thisBlock.is('.parallax-2-js') && thisBlock.is('.parallax-left-js')) {
            translateY_val = '0';
            translateX_val = '70px';
        }
        if (thisBlock.is('.parallax-3-js') && thisBlock.is('.parallax-right-js') || thisBlock.is('.parallax-3-js') && thisBlock.is('.parallax-left-js')) {
            translateY_val = '0';
            translateX_val = '100px';
        }
        if (thisBlock.is('.parallax-hero-cloud-1-js')) {
            translateY_val = '100px';
            start_val = 'top 50px';
        }
        if (thisBlock.is('.parallax-scale-js')) {
            translateY_val = '0';
            translateX_val = '0';
            scale_val = 1.1;
        }
        let scrubValue = 1.5;
        let translateY_el = translate_sign + translateY_val;
        let translateX_el = translate_sign + translateX_val;
        let parallax_tl = gsap.timeline({
            scrollTrigger: {
                trigger: thisBlock,
                start: start_val,
                scrub: scrubValue,
                end: end_val,
                onEnter: () => {
                    if ($(el).is('.parallax-rotate-js')) {
                        gsap.to('.hero__compass--arrow', .3, {scale: '1.5', transformOrigin: '94% 50%'})
                    }
                },
                onLeaveBack: () => {
                    if ($(el).is('.parallax-rotate-js')) {
                        gsap.to('.hero__compass--arrow', .3, {scale: '1', transformOrigin: '94% 50%'})
                    }
                }
            },
        })
        parallax_tl.to(thisBlock, {
            ease: 'none',
            y: translateY_el,
            x: translateX_el,
            rotation: rotate_val,
            scale: scale_val
        })
        $('.svg-obj-anim-js').each((i, el) => {
            let path_anim = $(el).find('path')
            let svg_tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                }
            })
            svg_tl.fromTo(path_anim, {drawSVG: '0'}, {ease: 'none', duration: .2, stagger: .1, drawSVG: true})
        })
    })
    // } else {
    //     $('html').addClass('disable-page-anim');
    // }
    // if ($(window).width() > 1199) {
    //     $('.s-floorplans__item').mouseenter(function() {
    //         $('.s-floorplans__content-wrap').removeClass('show');
    //         $(this).find('.s-floorplans__content-wrap').addClass('show');
    //     });
    //     $('.s-floorplans__item').mouseleave(function() {
    //         $('.s-floorplans__content-wrap').removeClass('show');
    //     })
    // }
    // if ($('.main-bg').length) {
    //     let end_val = 'top+=10% bottom';
    //     if ($(window).width() < 1200) {
    //         end_val = 'top bottom';
    //     }
    //     let bg_tl = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: '.main-bg',
    //             start: 'top top',
    //             endTrigger: '.switchback',
    //             end: end_val,
    //             pin: true,
    //             pinSpacing: false,
    //         }
    //     })
    // }
    // let bg_tl_2 = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: '.second-bg',
    //         start: 'top top',
    //         endTrigger: '.benefits-lists',
    //         end: 'bottom bottom',
    //         pin: true,
    //         pinSpacing: false,
    //     }
    // })
})
