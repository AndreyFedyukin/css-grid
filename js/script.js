// !Работа с картой
type = "text/javascript"
// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("myMap1", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.765, 37.62],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 14
  });

  // Создание геообъекта с типом точка (метка).
  var myPlacemark = new ymaps.Placemark([55.769535, 37.639985], {}, {
    iconLayout: 'default#image',
    iconImageHref: '/img/geometka.svg',
    iconImageSize: [12, 12],
    iconImageOffset: [-1, 1]
  });

  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
};
