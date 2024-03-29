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

function loadTweets(username) {
    var parentDiv = document.getElementById("tweets");
    var source = "http://deendisplaytweets.s3-website-us-east-1.amazonaws.com/" + username + ".json";
    benefits = $.get(source).success( function(data) {
      data.forEach(function(tweet) {
        if (tweet.retweeted_status) {
          tweet = tweet.retweeted_status;
        }
        var div = document.createElement('div');
        var content =  document.createElement('p');
        var date =  document.createElement('p');
        content.className = 'tweet-content';
        content.textContent = tweet.full_text;
        date.className = 'tweet-date';
        date.textContent = tweet.created_at;
        div.appendChild(content);
        div.appendChild(date);
        parentDiv.insertBefore(div, parentDiv[0]);
      });
      $("#tweets div").next().fadeOut();

    });

}

function jsonFlickrApi(data) {
  if (data.photoset) {
    var photos = data.photoset.photo;

    for(var i = photos.length - 1; i >= 0; i--) {
      var link = photos[i].title != "" ? photos[i].title : "#"
      $("#announcements").append("<div class=\"slide\"><a href=\""+link+"\"><img src=\""+ getLink(photos[i]) + "\"/></a></div>");
      if(photos[i].title != "") {
        $("#classes").append("<div><h2>"+photos[i].title+"</h2></div>");
      }
    }
    $('#announcements div').next().fadeOut();
  } else if(data.photo) {
    var converter = new showdown.Converter(),
    text      = data.photo.description._content,
    convertedHtml      = converter.makeHtml(text).replace('img src="','img src="https://');
    if(text) {
      $('#specialAnnouncement').html(convertedHtml);
    } else {
      loadBenefits();
    }
  } else {
    //TODO: Better fallback
    loadBenefits();
  }

}

function getLink(photo) {
  console.log(photo);
  return "https://live" +
         ".staticflickr.com/" + photo.server +
         "/" + photo.id + "_" + photo.secret + "_b_d.jpg";
}

function loadSpecialAnnouncements(photoId) {
  var link = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=5c053e417b99b7fe023ee6554a95c25b&photo_id='+photoId+'&format=json';
  console.log(link);
  jQuery.get(link, "jsonp");

}
