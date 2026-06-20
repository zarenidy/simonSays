//   $(document).ready(function() {
//   console.log("Element count on load:", $("button").length); //this helps test if DomReady timing issue - if 0 then yes
// });

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

let gameStarted = false;
let level = 0;



$(document).on('keydown', function() {
  
if (!gameStarted){

  $("#level-title").text("Level " + level);
  nextSequence();
  gameStarted = true;
} 
});

$(".btn").on ("click", function() {
    // alert("button was clicked");
    var userChosenColour = $(this).attr('id');
    // alert(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
checkAnswer(userClickedPattern.length-1);


});



function checkAnswer(currentLevel) {

  console.log(currentLevel);
  console.log(gamePattern);

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length) { 
          setTimeout(function () {
            nextSequence();
          }, 1000);
      }

    } else {
      console.log("wrong");

      // var wrong = new Audio("sounds/wrong.mp3");
      // wrong.play();
    
      playSound("wrong");
    
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver()
    }
}





function nextSequence() {
 userClickedPattern = []; 

 level++;
$("#level-title").text("Level " + level);


var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor)

}

function playSound(name) {

var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}



function animatePress(currentColor) {

    var activeButton = $("." + currentColor)

    activeButton.addClass("pressed");

    setTimeout(function() {
        activeButton.removeClass("pressed");

    }, 100);
}




function startOver() {
gameStarted = false;
level = 0;
gamePattern = [];

}

