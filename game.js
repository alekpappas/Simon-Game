
var gamePattern=[];

var userClickedPattern=[];

const buttonColours = ["red", "blue", "green", "yellow"];

var level=0;

var started = false;


$(document).keypress(function() {
    if (!started) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").on( "click", function() {
    var userChosenColour = this.id;    
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(this.id);

    checkAnswer(userClickedPattern.length-1);
}
)



  

function nextSequence() {

    userClickedPattern=[];
    level+=1;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+ color).addClass("pressed");
    setTimeout(function(){
        $("#"+ color).removeClass("pressed");
    },100)
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }

}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}