var buttonColors=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedPattern=[];

 var level=0;
var started=false;
$(document). keypress(function(){

    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextsequence();
        started=true;
    }

});

$(".btn").click(function () { 
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
 });
 
function checkAnswer(currentLevel)
{
    if(gamepattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(gamepattern.length===userClickedPattern.length)
            {
                setTimeout(function () {
                    nextsequence();
                  }, 1000);
          
            }
    }

   
    else{
        console.log("Failure");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);


        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
    }

}
function nextsequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomnumber];
    gamepattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
   
   

}


function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();

}


function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");

    },100);
}


function startover()
{
    level=0;
    started=false;
    gamepattern=[];
}