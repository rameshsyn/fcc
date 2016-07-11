// channel info
function info(stat) {
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","rameshsyn", "ghuitvvvv", "comster404","brunofin"]; // twitch.tv streamers
  streamers.forEach(function(streamer) {
    $.getJSON("https://api.twitch.tv/kraken/streams/" + streamer + "?callback=?", function(data) { // getting streamers data
      var link, g, des, viewers, followers, profileBnr, logo, stream, status, hideIt;
      stream = data['stream']; // streaming status
      if (stream === null) {
        g = "Offline";
        des = "";
        viewers = 0;
        status = "offline";
        if (stat == "all") hideIt = "visible";
        else if (stat == "offline") hideIt = "visible";
        else hideIt = "hidden";

      } else if (stream === undefined) {
        g = "Account Closed";
        viewers = 0;
        des = "";
        status = "offline";
        if (stat == "all") hideIt = "visible";
        else if (stat == "offline") hideIt = "hidden";
        else hideIt = "hidden";

      } else {
        g = data['stream']['game'];
        des = data['stream']['channel']['status'];
        viewers = data['stream']['viewers'];
        status = "online";
        if (stat == "all") hideIt = "visible";
        else if (stat == "offline") hideIt = "hidden";
        else hideIt = "visible";
      }
      $.getJSON("https://api.twitch.tv/kraken/channels/" + streamer + "?callback=?", function(chanData) { // getting channel data
        var html = "";
        followers = chanData['followers'] == undefined?  0: chanData['followers'];
        profileBnr = chanData['profile_banner'];
        logo = chanData['logo'];
        if (logo == null) {
          logo = "https://heatherchristenaschmidt.files.wordpress.com/2011/09/facebook_no_profile_pic2-jpg.gif";
        } else if (profileBnr == null) {
          profileBnr = "http://abg-news.com/images/NoBannerImage.gif";
        }
        html = "<div id='" + hideIt + "' class='channel " + status + "'><div class='profile'><img class='profile-img' src='" + logo + "' title='" + streamer + "'><a href='https://twitch.tv/" + streamer + "' target='_blank'><i>" + streamer + "</i></a></div><div class='additional-info'><h5>" + g + "  " + des + "</h5></div><div class='views'><img class='profile-banner' src='" + profileBnr + "'><div><img class='viewer-img' src='http://banglatv.org/wp-content/uploads/2015/10/Drawing-1.png' alt='Viewers' title='Viewers'><span class='viewers' title='Viewers'>" + viewers + "</span><img class='viewer-img' src='http://xboxresource.com/images/icon_friends.png' alt='Followers' title='Followers'><span class='followers' title='Followers'>" + followers + "</span></div></div></div>";
        (status === "online") ? $("#body-stuff").prepend(html): $("#body-stuff").append(html);

      });

    });

  });
}
$(document).ready(function() {
  info("all");
  $("#all").click(function() {
    $("#arrow-online,#arrow-offline").removeClass('arrow-down');
    $("#arrow-all").addClass('arrow-down');
    $("#body-stuff").html("");
    info("all");

  });
  $("#online").click(function() {
    $("#arrow-offline,#arrow-all").removeClass('arrow-down');
    $("#arrow-online").addClass('arrow-down');
    $("#body-stuff").html("");
    info("online");
  });
  $("#offline").click(function() {
    $("#arrow-all,#arrow-online").removeClass('arrow-down');
    $("#arrow-offline").addClass('arrow-down');
    $("#body-stuff").html("");
    info("offline");
  });

});