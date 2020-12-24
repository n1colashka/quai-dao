"use strict";

document.addEventListener('DOMContentLoaded', function () {
  function initMenu() {
    var menuBtn = document.querySelector('.header__btn');
    var menuWrapper = document.querySelector('.profile-menu');
    document.body.addEventListener('click', function (event) {
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
    var modalLinks = document.querySelectorAll('a[data-micromodal-trigger]');
    var linksPreventDefault = document.querySelectorAll('a[data-prevent]');
    modalLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
    linksPreventDefault.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
    MicroModal.init({
      onShow: function onShow(modal) {
        return document.querySelector('html').style.overflow = 'hidden';
      },
      onClose: function onClose(modal) {
        return document.querySelector('html').style.overflow = '';
      },
      disableScroll: true,
      disableFocus: false,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true
    });
  }

  function checkValuesToModal() {
    var presaleBtn = document.querySelectorAll('.presale__buy-btn');
    var presaleInput = document.querySelectorAll('.presale__buy-input input');
    presaleInput.forEach(function (input, i) {
      input.addEventListener('input', function () {
        if (input.value > 0) {
          presaleBtn[i].dataset.micromodalTrigger = 'modal-congrats';
        } else {
          presaleBtn[i].dataset.micromodalTrigger = '';
        }
      });
      input.addEventListener('change', function () {
        MicroModal.init({
          onShow: function onShow(modal) {
            return document.querySelector('html').style.overflow = 'hidden';
          },
          onClose: function onClose(modal) {
            return document.querySelector('html').style.overflow = '';
          },
          disableScroll: true,
          disableFocus: false,
          awaitOpenAnimation: true,
          awaitCloseAnimation: true
        });
      });
    });
  }

  function initClock() {
    var deadline = '2021-01-14';
    var $days = document.querySelector('.presale__timer-num--days');
    var $hours = document.querySelector('.presale__timer-num--hours');
    var $minutes = document.querySelector('.presale__timer-num--mins');
    var $seconds = document.querySelector('.presale__timer-num--secs');

    function addZero(number) {
      return number < 10 ? '0' + number : number;
    }

    function updateClock() {
      var t = Date.parse(deadline) - Date.parse(new Date());
      var seconds = Math.floor(t / 1000 % 60);
      var minutes = Math.floor(t / 1000 / 60 % 60);
      var hours = Math.floor(t / (1000 * 60 * 60) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      $days.textContent = addZero(days);
      $hours.textContent = addZero(hours);
      $minutes.textContent = addZero(minutes);
      $seconds.textContent = addZero(seconds);

      if (t <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock(); // запустите функцию один раз, чтобы избежать задержки

    var timeinterval = setInterval(updateClock, 1000);
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
          spaceBetween: 20
        },
        768: {
          spaceBetween: 20
        },
        1920: {
          spaceBetween: 70
        }
      }
    });
  } // Функции работающие только на мобильных устройствах


  if (window.innerWidth <= 1200) {
    initSliders();
  } // initMenu();


  initModals();
  initClock();
  checkValuesToModal();
});