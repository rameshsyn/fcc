//js 
$(document).ready(function() {
  //scrolls upto portfolio
  $("#to-pf").click(function() {
    $("body").animate({
      scrollTop: $("#portfolio").offset().top
    }, "slow");
  });
  
  //scrolls upto contact
  $("#to-c").click(function() {
    $("body").animate({
      scrollTop: $("#contact").offset().top
    },"slow");
  });
  $("footer span").text(new Date().getFullYear());
  
});