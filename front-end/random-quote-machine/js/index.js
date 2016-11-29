$(document).ready(function(){
  var quotes = ['Life is about making an impact, not making an income.','Whatever the mind of man can conceive and believe, it can achieve.','Strive not to be a success, but rather to be of value.','Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.','I attribute my success to this: I never gave or took any excuse.','You miss 100% of the shots you don’t take.','The most difficult thing is the decision to act, the rest is merely tenacity. ','Every strike brings me closer to the next home run.','Definiteness of purpose is the starting point of all achievement.','Life isn’t about getting and having, it’s about giving and being.','Life is what happens to you while you’re busy making other plans. ','We become what we think about.','Life is 10% what happens to me and 90% of how I react to it. ','The most common way people give up their power is by thinking they don’t have any.','The mind is everything. What you think you become.','The best time to plant a tree was 20 years ago. The second best time is now.','An unexamined life is not worth living.','Eighty percent of success is showing up.','Your time is limited, so don’t waste it living someone else’s life. ','Winning isn’t everything, but wanting to win is. '];
  
  var authors = ['Kevin Kruse','Napoleon Hill','Albert Einstein','Robert Frost','Florence Nightingale','Wayne Gretzky','Amelia Earhart','Babe Ruth','W. Clement Stone','Kevin Kruse','John Lennon','Earl Nightingale','Charles Swindoll','Alice Walker','Buddha','Chinese Proverb','Socrates','Woody Allen','Steve Jobs','Vince Lombardi'];
  
  var btnTexts = ['New Quote','More','Inspire'];
  var count = 0;
  $(".new-quote").click(function(){
    var ranQuote = Math.floor(Math.random() * 21);
    var tweetText = "https://twitter.com/intent/tweet?text=" + quotes[ranQuote] + " - " + authors[ranQuote] + "\n http://codepen.io/rameshsyn/full/ZQENOq";
    if(count === 3) count = 0;
    $(this).text(btnTexts[count]);    
    $("blockquote p").text(quotes[ranQuote]);
    $("blockquote i span ").text(authors[ranQuote]);
    $('.tweet').html("<a class='btn btn-primary twitter-share-button' id='tweet-link' href=''>Tweet</a>");
    $('#tweet-link').attr('href',tweetText);    
    count++;   
    
  });  
});