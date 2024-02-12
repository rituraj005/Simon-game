//simon game code is here.

var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

//game start function
function nextSequence () {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  level++;
  $("h1").text("Level " + level);
}



//when button is clicked this function will be trigerd.
$(".btn").click( function() {
  var userChosenColor = this.id;
  // var userClickedPattern = [];
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  // playSound(userChosenColor);

  if(userClickedPattern.length === gamePattern.length) {
    checkAnswer();
  }
});



//keyevent listener
$("#start-button").click(function() {
  if(gamePattern.length === 0)
  nextSequence();
});



//sound play for button press.
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}


//animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() { $("#" + currentColor).removeClass("pressed"); }, 50);
}


$(".btn").hover(function() {
    $(this).css('cursor','pointer');
}, function() {
    $(this).css('cursor','auto');
});



// answer checking
  var ansCount = 0;
function checkAnswer()
{
  for(var i=0; i<gamePattern.length; i++)
  {
    if(gamePattern[i] === userClickedPattern[i]){
      ansCount++;
      console.log(ansCount);
    } else {
      var audio2 = new Audio("./sounds/wrong.mp3");
      audio2.play();
      $("body").addClass("game-over");
      setTimeout( function() { $("body").removeClass("game-over");}, 200 );
      $("h1").text("Game Over. Refresh To Continue.");
      break;
    }
  }
  if (ansCount === gamePattern.length) {
    setTimeout(function(){
      userClickedPattern = [];
      ansCount = 0;
      nextSequence();
    }, 1300);
  } else {
      console.log("ans count not matched.");
      console.log("gamePattern = " + gamePattern.length);
      console.log("userClickedPattern = " + userClickedPattern.length);
      console.log("ansCount = " + ansCount);
  }
}
