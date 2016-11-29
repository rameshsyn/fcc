$(document).ready(function() {
  $("#title").on("keyup",function() {
    var title = $("#title").val();
    var url = "http://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&gsrnamespace=0&gsrlimit=10&format=json&search=" + title;
    $.getJSON(url, function(result) {
      var html = "";
        for (var j = 0; j < result[1].length; j++) {
          html += "<a href='" + result[3][j] + "' target='_blank'><div class='result'><h2>" + result[1][j] + "</h2> <p>" + result[2][j] + "</p></div></a>"
        }
      
      $(".result-area").html(html);
    });
  });
});