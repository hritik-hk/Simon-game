
var userInput=[];
// button to be clicked next
var currButton;
var level=1;
//counts the clicks
var count=0;
//detects gameover
var restart=false;
//tells about the first game
var start=true;
// to check , if the sequence is verified
   var arrayCheck=false;

// to detect key press to start the game
$(document).keydown(function(event){
    if(event.key==="y" && start===true){
        alert("Start the Game, Then simon will show you the button to be clicked");
        alert("In each level, you have to recreate the sequence from starting to the last button simon indicated you to click");
        alert("and so on .....");
        alert("Click OK and press F to start");
    }
    if(event.key==="f" && start===true){
        start=false;
       $("h3").slideUp();
       $(".foot-content").animate({"margin":"25px 25px", "font-size":"1.7rem"});
       $("h1").text("------- Level 1 -------");
       setTimeout(function(){nextSequence();},1000);
    }
    else if(restart===true){
        $("h1").css("color","black");
        $("h1").text("------- Level 1 -------");
        setTimeout(function(){nextSequence();},1000);
        restart=false;
    }
     });

//generates random number btw 1-4
function randomNum(){
   var num=Math.random();
   num=num*4;
   num=Math.floor(num)+1;

   switch(num){

      case 1: return "one";
      case 2: return "two";
      case 3: return "three";
      case 4: return "four";

      default: return num;
      

   }
}
 
//generates the next sequence
function nextSequence(){
    var n=randomNum();
    makeSound(n);
    animateClick(n);
    currButton=n;
}


     
   //animates the click
    function animateClick(num){
        $("."+num).addClass("pressed");
        setTimeout(function(){$("."+num).removeClass("pressed");},200);
    }

    //game-over function
    function gameOver(){
        //count reset
        count=0;
        //when click in the starting
        $("h3").slideUp();
        //resetting user-input array
        while(userInput.length!=0){
            userInput.pop();
        }
        $("h1").text("GAME OVER. Press any key to start again");
        $("h1").css("color","red");
          //game over sound
          makeSound("gameover");

          //game-over animation
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);

        //resetting level
        level=1;
        //updating boolean restart
        restart=true;
        //updating currButton
        currButton=null;
    }

   //adding keyboard event listener to button
    $(".btn").on("click", function(){
        var k= this.classList[2];
        makeSound(k);
        animateClick(k);

      if(userInput.length===0){
          if(currButton===k){
            level++;
            userInput.push(k);
            $("h1").text("------- Level "+level+" -------");
            setTimeout(function(){nextSequence();},1000);
          }
          else{
            
            gameOver();
            
        }
      }

      else{
          if(count<userInput.length && userInput[count]===k){
              
                count++;
              if(userInput.length===count){
                  arrayCheck=true;
              }
              
          }
          else if(currButton===k && arrayCheck===true){
              count=0;
              userInput.push(k);
              level++;
              $("h1").text("------- Level "+level+" -------");
              setTimeout(function(){nextSequence();},1000);

        }
        else{
           gameOver();
        }
         
      }
     });
     
     //for sounds
     function makeSound(input){
         switch(input){
             case "one":
                 var sound=new Audio("sounds/green.mp3");
                 sound.play();
                 break;

             case "two":
                 var sound=new Audio("sounds/red.mp3");
                 sound.play();
                 break; 

             case "three":
                var sound=new Audio("sounds/yellow.mp3");
                sound.play();
                break;

             case "four":
                 var sound=new Audio("sounds/blue.mp3");
                 sound.play();
                 break;

            default: 
                var sound=new Audio("sounds/wrong.mp3");
                sound.play();
                 
         }
     }

    
  

            
               

        
            
         

            

            

             
          
         
     
