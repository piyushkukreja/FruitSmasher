//scripts for fruits
var playing = false;
var score;
var trialsLeft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;

$(function(){
   
    $('#startreset').click(function(){
        if(playing == true){
            location.reload();
        }else{
            //we are not playing
            playing = true;//initiate the game
            
            score = 0;//set the score to 0
            $('#scoreValue').html(score);
            
            $('#gameover').hide();
            
            $('#trailsLeft').show();
            trialsLeft = 3;
            addHearts();
            
            //change the button text to reset game
            $('#startreset').html('Reset Game');
            
            //start sending the fruits
            startAction();
            
        }
    });//startreset click function ends here
    
});//on load function ends here
function addHearts(){
    $('#trialsLeft').empty();
    for(i=0; i<trialsLeft; i++){
        $('#trialsLeft').append('<img src="images/heart.png" class="life">');
        $('#trialsLeft').show();
    }
}
function startAction(){
    $('#fruit1').show();
    chooseFruit();
    
    $('#fruit1').css({
        'left' : Math.round(Math.random()*550),
        'top': -50
    });
    //change the step randomly
    step = 1 + Math.round(Math.random() * 5);
    
    //Move fruit down by one step every 10ms
    action = setInterval(function(){
        //move the fruit by one step
        $('#fruit1').css('top', $('#fruit1').position().top + step);
        if($('#fruit1').position().top > $('#fruitsContainer').height()){
            if(trialsLeft > 1){
                
                $('#fruit1').show();
                chooseFruit();

                $('#fruit1').css({
                    'left' : Math.round(Math.random()*550),
                    'top': -50
                });
                //change the step randomly
                step = 1 + Math.round(Math.random() * 5);
                
                
                //reduce the no. of trials by 1
                trialsLeft--;
                //populate trialsleft hearts
                addHearts();
            }else{//game is over
                playing = false;
                $('#trialsLeft').hide();
                $('#startreset').html("Start Game");
                $('#gameover').show();
                $('#gameover').html('<p>Game Over</p><p>Your score is '+score+'</p>');
                
                stopAction();
            }
        }
    },10)
}

//slice a fruit

$('#fruit1').mouseover(function(){
   score++;
    $('#scoreValue').html(score);
    clearInterval(action);
    $('#fruit1').hide("explode", 400);
    setTimeout(startAction, 500);
});

function stopAction(){
    clearInterval(action);
    $('#fruit1').hide();
}
function chooseFruit(){
    $('#fruit1').attr("src","images/"+fruits[Math.round(8*Math.random())]+".png")
}