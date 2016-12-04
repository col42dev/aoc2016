let _ = require('underscore');

let day = [];
_.each(_.range(4), function(dayDatum, dayIndex, dayList) {
    day.push(require('./day' + pad(dayDatum+1, 2)));
});

_.each(day, function(dayDatum, dayIndex, dayList) {
    console.log('DAY ' + (dayIndex+1));
    dayDatum.parts[0]();
    dayDatum.parts[1]();
    console.log('\n');
});


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
