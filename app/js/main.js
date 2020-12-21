document.addEventListener('DOMContentLoaded', function () {

    function initMenu() {
        const menuBtn = document.querySelector('.header__btn');
        const menuWrapper = document.querySelector('.profile-menu');

        document.body.addEventListener('click', event => {
            if (event.target.closest('.profile-menu')) {
                menuWrapper.classList.add('active');
                menuBtn.classList.add('active');
            } else if (event.target.closest('.header__btn')) {
                menuWrapper.classList.toggle('active');
                menuBtn.classList.toggle('active');
            } else {
                menuWrapper.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    }

    function initModals() {
        const modalLinks = document.querySelectorAll('a[data-micromodal-trigger]');
        const linksPreventDefault = document.querySelectorAll('a[data-prevent]');
        modalLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()
            });
        });
        linksPreventDefault.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()
            });
        });
        MicroModal.init({
            onShow: modal => document.querySelector('html').style.overflow = 'hidden',
            onClose: modal => document.querySelector('html').style.overflow = '',
            disableScroll: true,
            disableFocus: false, 
            awaitOpenAnimation: true, 
            awaitCloseAnimation: true, 
        });

        
    }

    function checkValuesToModal() {
        const presaleBtn = document.querySelectorAll('.presale__buy-btn');
        const presaleInput = document.querySelectorAll('.presale__buy-input input');
        console.log(presaleInput);
            presaleInput.forEach((input, i) => {
                input.addEventListener('input', () => {
                        if(input.value > 0) {
                            presaleBtn[i].dataset.micromodalTrigger = 'modal-congrats';
                        } else {
                            presaleBtn[i].dataset.micromodalTrigger = '';
                        }
                    });
                input.addEventListener('change', () => {
                    MicroModal.init({
                        onShow: modal => document.querySelector('html').style.overflow = 'hidden',
                        onClose: modal => document.querySelector('html').style.overflow = '',
                        disableScroll: true,
                        disableFocus: false, 
                        awaitOpenAnimation: true, 
                        awaitCloseAnimation: true, 
                    });
                });
        });
        
    }

    function initCalculator() {
        const deadline = '2020-12-31'; 
        const $days = document.querySelector('.presale__timer-num--days');
        const $hours = document.querySelector('.presale__timer-num--hours');
        const $minutes = document.querySelector('.presale__timer-num--mins');
        const $seconds = document.querySelector('.presale__timer-num--secs');

        function addZero(number) {
            return number < 10 ? '0' + number : number; 
        }

        function updateClock(){
            let t = Date.parse(deadline) - Date.parse(new Date());
            let seconds = Math.floor( (t/1000) % 60 );
            let minutes = Math.floor( (t/1000/60) % 60 );
            let hours = Math.floor( (t/(1000*60*60)) % 24 );
            let days = Math.floor( t/(1000*60*60*24) );
        
            

            $days.textContent = addZero(days);
            $hours.textContent = addZero(hours);
            $minutes.textContent = addZero(minutes);
            $seconds.textContent = addZero(seconds);

            if(t<=0){
            clearInterval(timeinterval);
            }
        }
        updateClock(); // запустите функцию один раз, чтобы избежать задержки
        var timeinterval = setInterval(updateClock,1000);

    }

    function initSliders() {
        var teamSwiper = new Swiper('.team__slider', {
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 40
        });
        var partnersSwiper = new Swiper('.partners__slider', {
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 70,
            breakpoints: {
                0: {
                    spaceBetween: 20,
                },
                768: {
                    spaceBetween: 20,
                },
                1920: {
                    spaceBetween: 70,
                }
            }
        });
    }

    // Функции работающие только на мобильных устройствах
    if (window.innerWidth <= 1200) {
        initSliders()
    }


    // initMenu();
    initModals();
    initCalculator();
    checkValuesToModal();
});