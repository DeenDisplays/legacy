function Divs(divs) {
  if (divs.length < 2) return;

  now = divs.filter(':visible');
  next = now.length && now.next().length ? now.next() : divs.first();
  speed = 1000;

  now.fadeOut(speed);
  next.fadeIn(speed);
}

$(function () {
  setInterval(function () { Divs($('#announcements div')) }, 10000);
  setInterval(function () { Divs($('#benefits div')) }, 41000);
});

function loadContent(user, album) {
  var link = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=5c053e417b99b7fe023ee6554a95c25b&photoset_id='+album+'&user_id='+user+'&format=json';
  console.log(link);
  jQuery.get(link, "jsonp");

}

function loadBenefits() {
  var parentDiv = document.getElementById("benefits");
  benefits = $.get("../common/benefits.json?2").success( function(data) { 
    data.list.forEach(function(benefit) {
      var div = document.createElement('div');
      var content =  document.createElement('p');
      var source =  document.createElement('p');
      var height = $("#benefits").parent().height() / 3;
      div.style.marginTop = height - benefit.content.length / 4;
      content.className = 'benefit-content';
      content.textContent = benefit.content;
      source.className = 'benefit-source';
      source.textContent = benefit.source;
      div.appendChild(content);
      div.appendChild(source);
      randomIndex = Math.floor(Math.random() * parentDiv.childElementCount);
      parentDiv.insertBefore(div, parentDiv[randomIndex]);
    });
    $("#benefits div").next().fadeOut();
    
  });

}

function jsonFlickrApi(data) {
    var photos = data.photoset.photo;
    
    for(var i = 0; i < photos.length; i++) {
      $("#announcements").append("<div class=\"slide\"><img src=\""+ getLink(photos[i]) + "\"/></div>");
      if(photos[i].title != "") {
        $("#classes").append("<div><h2>"+photos[i].title+"</h2></div>"); 
      }
    }
    $('#announcements div').next().fadeOut();

}

function getLink(photo) {
  console.log(photo);
  return "https://farm" + photo.farm +
         ".staticflickr.com/" + photo.server + 
         "/" + photo.id + "_" + photo.secret + "_h.jpg";
}
