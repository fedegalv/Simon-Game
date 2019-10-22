var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var pressedBefore = false;
var levelCount = 0;


function nextSecuence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var button = "#" + randomChosenColor;
  $(button).fadeOut().fadeIn();
  playSound(randomChosenColor);
  levelCount++;
  changeTitle(levelCount);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSecuence();
      }, 1000);
    }
  } else {
    // console.log("fail");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press ENTER to Restart");
    startOver();
  }
}

function startOver()
{
  pressedBefore= false;
  levelCount= 0;
  gamePattern= [];
}

function animatePress(currentColor) {
  var colorId = "#" + currentColor;
  $(colorId).addClass("pressed");
  setTimeout(function() {
    $(colorId).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audioName = "sounds/" + name + ".mp3";
  var audio = new Audio(audioName);
  audio.play();
}

function changeTitle(levelCount) {
  var title = "Level " + levelCount;
  $("#level-title").text(title);
}

//

$("body").keypress(function(event) {
  var keyPressed = event.key;
  if (keyPressed == "Enter" && pressedBefore == false) {
    changeTitle(levelCount);

    nextSecuence();
    pressedBefore = true;
  }
});


$(".btn").on("click", function(event) {
  // alert(event.target.id);
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (pressedBefore) {
    checkAnswer(userClickedPattern.length - 1);
  }
});
