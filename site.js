/* Планировщик праздника: повод, дата и число гостей складываются в текст заявки. */
(function () {
  'use strict';
  var form = document.querySelector('form[data-lead]');
  if (!form) return;
  var date = document.getElementById('f-date');
  var guests = document.getElementById('f-guests');
  var out = document.getElementById('guests-out');
  var DAYS = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

  var t = new Date();
  date.min = new Date(t.getTime() - t.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  function human(v) {
    var p = v.split('-');
    if (p.length !== 3) return '';
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + DAYS[d.getDay()];
  }

  function sync() {
    document.getElementById('f-kind').value = form.querySelector('input[name=kind]:checked').value;
    document.getElementById('f-date-h').value = human(date.value);
    out.textContent = guests.value;
    document.getElementById('f-guests-h').value = guests.value;
  }
  form.addEventListener('input', sync);
  form.addEventListener('change', sync);
  sync();
})();
