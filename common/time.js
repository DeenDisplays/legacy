function setTimesWithTimes(timesFile, offsets) {

  var day = getDay();

  jQuery.get(timesFile, function(data){ 
    var startOfLine = data.indexOf(day+"_");
    var offset = (day+"_").length;
    var endOfLine = data.indexOf(day+1+"_");
    var line = data.substring(startOfLine+offset, endOfLine);
    var x = line.split(",");
    $("#fajrTime").html(getIqamahTime(x[0], offsets[0]));
    $("#dhuhrTime").html(getIqamahTime(x[1], offsets[1]));
    $("#asrTime").html(getIqamahTime(x[2], offsets[2]));
    $("#maghribTime").html(getIqamahTime(x[3], offsets[3]));
    $("#ishaTime").html(getIqamahTime(x[4], offsets[4]));
  });
}

function setTimes() {
  setTimesWithTimes('/announcements/times.csv');
}

function getDay(){
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 1);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.ceil(diff / oneDay);
  return day;
}

function setTodaysClass() {

  var today = (new Date(Date.now())).getDay();
  jQuery.get('/announcements/classes', function(data) {
    var classList = jQuery.parseJSON(data);
    for(var i = 0; i < classList[today].classes.length; i++) {
      $("#classbar").append("<div class=\"classes special\"><br/>" +
                            "<span class=\"title special\">" +
                            "Time: "+classList[today].classes[i].time + "<br/><br/>" +
                            classList[today].classes[i].class + "</div>");
    }

  });

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
