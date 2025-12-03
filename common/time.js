function setTimesWithTimes(timesFile, offsets) {

  var day = getDay();

  jQuery.get(timesFile, function(data){ 
    var startOfLine = data.indexOf(day+"_");
    var offset = (day+"_").length;
    var endOfLine = data.indexOf(day+1+"_");
    var line = data.substring(startOfLine+offset, endOfLine);
    var x = line.split(",");
    displayTimes(x, offsets);
  });
}

function displayTimes(athanTimes, offsets) {
    $("#fajrTime").html(getIqamahTime(athanTimes[0], offsets[0]));
    $("#dhuhrTime").html(getIqamahTime(athanTimes[1], offsets[1]));
    $("#asrTime").html(getIqamahTime(athanTimes[2], offsets[2]));
    $("#maghribTime").html(getIqamahTime(athanTimes[3], offsets[3]));
    $("#ishaTime").html(getIqamahTime(athanTimes[4], offsets[4]));
}

function getDay(){
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 1);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.ceil(diff / oneDay);
  return day;
}

function getIqamahTime(athanTime, offset) {
  var x = athanTime.split(":");
  var athan = new Date();
  athan.setHours(x[0]);
  athan.setMinutes(x[1]);
  var iqamah = new Date();
  iqamah.setTime(athan.getTime() + offset * 60000);

  var hour = iqamah.getHours() != 12 ? iqamah.getHours() % 12 : 12;
  var ampm = iqamah.getHours() < 12 ? "AM" : "PM";
  var minute = iqamah.getMinutes() >= 10 ? iqamah.getMinutes() : "0" + iqamah.getMinutes();

  return hour + ":" + minute + " " + ampm;
}

function setClock() {
  var now = new Date();
  $("#clock").html(getIqamahTime(now.getHours() + ":" + now.getMinutes(), 0));
}


function setDate() {
  var o = {month: "long", day: "numeric", year : "numeric"};
  $("#gregorianDate").html((new Intl.DateTimeFormat("en-US", o)).format());
  $("#hijriDate").html(getIslamicDate());
}

function refreshDaily() {
  if((new Date()).getHours() == 0) {
    location.reload();
  }
}

function setTimes(coordinates, timezone, offset, givenMethod, ishaFixedHour, ishaFixedMinute) {
function setTimes(coordinates, timezone, offset, givenMethod, ishaFixedHour, ishaFixedMinute, asrFixedHour, asrFixedMinute) {
  var method = (typeof givenMethod == 'undefined') ? 'ISNA' : givenMethod;
  var PT = new PrayTimes(method);
  var date = new Date();

  var offsets = {"fajr":offset[0], "dhuhr":offset[1], "asr":offset[2], "maghrib":offset[3], "isha":offset[4]};
  var athanTimes = PT.getTimes(date, coordinates, timezone, 'auto', '12h');

  PT.tune(offsets);
  var times = PT.getTimes(date, coordinates, timezone, 'auto', '12h');

  var prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

 
  times = adjustIshaTime(times, ishaFixedHour, ishaFixedMinute);
  times = adjustAsrTime(times, athanTimes, asrFixedHour, asrFixedMinute);

  prayers.map(p => $("#" + p + "Time").html(times[p].toUpperCase()));

}
