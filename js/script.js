'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // добавление события ввода на инпут в секции "О студии" для проверки введенной почты на корректность
  const aboutform = document.querySelector('.about__form');
  const aboutInp = aboutform.querySelector('.about__inp');
  const aboutHint = aboutform.querySelector('.about__hint');

  const checkInpVal = function (e) {

    e.preventDefault();
    if (
      !aboutInp.value.includes('@') &&
      aboutInp.value !== ''
    ) {
      aboutInp.classList.add('field_incorrect');
      aboutHint.classList.add('about__hint_active');
      aboutHint.style.display = "block";
    }
    else if (
      aboutInp.value.includes('@') ||
      aboutInp.value === ''
    ) {
      aboutInp.classList.remove('field_incorrect');
      aboutHint.classList.remove('about__hint_active');
    }

  };

  setTransitionendListenter(aboutHint, 'about__hint_active', 'block');

  aboutform.addEventListener('submit', checkInpVal);

  // карта
  // lazyload для яндекс-карты
  function showMap() {
    const mapWrap = document.querySelector('.contacts__left');
    if (mapWrap.getBoundingClientRect().top - document.documentElement.clientHeight < 0) {
      ymaps.ready(init);
      this.removeEventListener('scroll', showMap);
    }
  }
  window.addEventListener('scroll', showMap);
  function init() {
    // Создание карты.
    const myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.76963601332982, 37.63668850000002],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 17,
      controls: [], //убираем элементы управления с карты.
    });

    // Создание геообъекта с типом точка (метка).
    const myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point", // тип геометрии - точка
        coordinates: [55.76963601332982, 37.63668850000002] // координаты точки
      }
    });

    const myPlacemark = new ymaps.Placemark([55.76963601332982, 37.63668850000002], {
      hintContent: 'Шоурум №4, Леонтьевский переулок, дом 5, строение 1'
    },
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/sprite.svg#map',
        iconImageSize: [40, 40],
        balloonImageSize: [0, 0],
      });

    // Размещение геообъекта на карте.
    myMap.geoObjects.add(myPlacemark);
  }

  // показ адреса при нажатии на карту
  const contactsMap = document.querySelector('.map');
  const contactsDesc = document.querySelector('.contacts__desc');
  const contactsClose = document.querySelector('.contacts__close');

  contactsMap.addEventListener('click', () => {
    if (contactsDesc.classList.contains('contacts__desc_active')) {
      contactsDesc.classList.remove('contacts__desc_active');
    }
    else {
      contactsDesc.classList.add('contacts__desc_active');
      contactsDesc.style.display = 'block';
    }
  });

  contactsClose.addEventListener('click', () => {
    contactsDesc.classList.remove('contacts__desc_active');
  });

  setTransitionendListenter(contactsDesc, 'contacts__desc_active', 'block');

  function setTransitionendListenter(elem, elemClass, displayProp) {
    elem.addEventListener("transitionend", () => {
      if (!elem.classList.contains(elemClass)) {
        elem.removeAttribute('style');
      }
      else {
        elem.style.display = displayProp;
      }
    });
  }

  // проверка на корректность ввода данных в форме контактов
  const contactsForm = document.querySelector('.contacts__form');
  const contactsNameInp = document.querySelector('.contacts__inp_name');
  const contactsMailInp = document.querySelector('.contacts__inp_mail');

  contactsForm.addEventListener('submit', (e) => {

    e.preventDefault();

    if (!contactsMailInp.value.includes('@')) {
      contactsMailInp.classList.add('field_incorrect');
      contactsMailInp.previousElementSibling.classList.add('contacts__hint_active');
      contactsMailInp.previousElementSibling.style.display = "block";
    }
    else {
      contactsMailInp.classList.remove('field_incorrect');
      contactsMailInp.previousElementSibling.classList.remove('contacts__hint_active');
    }

    if (
      contactsNameInp.value.includes('!') ||
      contactsNameInp.value.includes('?') ||
      checkForNumExistence(contactsNameInp.value)
    ) {
      contactsNameInp.classList.add('field_incorrect');
      contactsNameInp.previousElementSibling.classList.add('contacts__hint_active');
      contactsNameInp.previousElementSibling.style.display = "block";
    }
    else {
      contactsNameInp.classList.remove('field_incorrect');
      contactsNameInp.previousElementSibling.classList.remove('contacts__hint_active');
    }

    setTransitionendListenter(contactsMailInp.previousElementSibling, 'contacts__hint_active', 'block');
    setTransitionendListenter(contactsNameInp.previousElementSibling, 'contacts__hint_active', 'block');

  });

  function checkForNumExistence(inpVal) {
    for (let i = 0; i < 10; i++) {
      if (inpVal.includes(i.toString())) {
        return true;
      }
    }
  }

  // открытие строки поиска на разрешении 768
  const headerBtn = document.querySelector('.header__search');
  const headerInp = document.querySelector('.header__inp-tablet');
  const headerClose = document.querySelector('.header__close');

  headerBtn.addEventListener('click', function () {
    headerInp.classList.add('header__inp-tablet_active');
    headerInp.style.display = 'block';
    headerClose.classList.add('header__close_active');
    this.classList.add('header__search_hidden');
  });

  headerClose.addEventListener('click', function () {
    this.classList.remove('header__close_active');
    headerBtn.classList.remove('header__search_hidden');
    headerInp.classList.remove('header__inp-tablet_active');
  });

  setTransitionendListenter(headerInp, 'header__inp-tablet_active', 'block');

  // реализация бургера
  const burgerBtn = document.querySelector('.header__btn');
  const burger = document.querySelector('.burger');
  const burgerClose = burger.querySelector('.burger__close');

  burgerBtn.addEventListener('click', () => {
    burger.style.display = 'block';
    burger.classList.add('burger_active');
  });

  burgerClose.addEventListener('click', () => {
    burger.classList.remove('burger_active');
  });

  setTransitionendListenter(burger, 'burger_active', 'block');

  // плавный скролл
  const anchors = document.querySelectorAll('a[href*="#"]');

  function setSmoothScroll(target, duration) {
    const elem = document.querySelector(target);
    const targetPosition = elem.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }
      const progress = currentTime - startTime;
      const run = easeInOutCubic(progress, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (progress < duration) {
        requestAnimationFrame(animation);
      }
    }

    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    requestAnimationFrame(animation);
  }

  anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      setSmoothScroll(href, 1000);
    });
  });

});
'use strict';

// табы проектов
function projectsTabs(tabsParentSelector) {
  const tabs = document.querySelector(tabsParentSelector);
  const tabBtns = tabs.querySelectorAll('.projects__tab');
  const projectsHolders = document.querySelectorAll('.projects__holder');
  tabs.addEventListener('click', (e) => {
    const target = e.target;
    const index = Array.from(tabBtns).indexOf(target);
    if (target.matches('.projects__tab')) {
      showElem(projectsHolders, 'projects__holder-active', index);
      showElem(tabBtns, 'projects__tab-active', index);
    }
  });
}

projectsTabs('.projects__tabs_desk');
projectsTabs('.projects__tabs-mobile');

// табы услуг
const servicesTabs = document.querySelector('.services__tabs');
const servicesBtns = servicesTabs.querySelectorAll('.services__tab');
const servicesLists = document.querySelectorAll('.services__list');
const servicesWorks = document.querySelectorAll('.services__works');

servicesTabs.addEventListener('click', (e) => {
  const target = e.target;
  const index = Array.from(servicesBtns).indexOf(target);
  if (target.matches('.services__tab')) {
    showElem(servicesLists, 'services__list-active', index);
    showElem(servicesWorks, 'services__works_active', index);
    showElem(servicesBtns, 'services__tab-active', index);
  }
});

function showElem(elems, elemsClass, ind) {
  elems.forEach((elem, i) => {
    switch (i) {
      case ind:
        elem.classList.add(elemsClass);
        break;
      default:
        elem.classList.remove(elemsClass);
        break;
    }
  });
}
