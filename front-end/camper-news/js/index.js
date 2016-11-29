$(document).ready(function() {  
  $.getJSON("http://www.freecodecamp.com/news/hot", function(news) {
    var html = "";
    news.forEach(function(prop) {
      var croppedHl = prop['headline'].substr(0, 18) + "...."; // news headline crop
      var userUrl = "http://www.freecodecamp.com/" + prop['author']['username']; // link to username
      var upVotes = prop['upVotes'].length;
      var time = new Date(prop['timePosted']).toDateString(); // posted date
      var newsImage = prop['image'];
      if (prop['image'] === "") newsImage = prop['author']['picture'];

      html += "<div class='news'><a href='" + prop['link'] + "'><img class='news-img img-responsive img-rounded' src='" + newsImage + "' alt=' ----------- News Image ---------'></a>";

      html += "<div class='meta'><a class='news-title' href='" + prop['link'] + "'><h4>" + croppedHl + "</h4></a>";

      html += "<div class='news-by row'><div class='col-xs-8 user'>by:<i><a href='" + userUrl + "' class='username'>" + prop['author']['username'] + "</a></i>";

      html += "<div class='upvotes'><img src='http://images.clipartpanda.com/pink-heart-outline-clipart-gray-heart-with-pink-outline-md.png' alt='upvotes'> <span>" + upVotes + "</span></div></div>";

      html += "<div class='col-xs-4'><a href='" + userUrl + "'><img src='" + prop['author']['picture'] + "' alt='user-image' class='user-img'></a></div></div>";

      html += "<b class='time-posted'>Posted on: <span> " + time + "</span> </b></div></div>";
    });
    $(".news-container").html(html);      
  });
});