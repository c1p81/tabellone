var punti_left = 0;
var punti_right = 0;
var game_left = 0;
var game_right = 0;
var set_left = 0;
var set_right = 0;

// gestisce l'indicatore del servizio
var ball_left = 1;

// audio
var audioElement;

// ************************************************************************
// **********************************FULL SCREEN******************************
// ************************************************************************    

function requestFullScreen(element) {
// Supports most browsers and their versions.
var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

if (requestMethod) { // Native full screen.
    requestMethod.call(element);
} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
        wscript.SendKeys("{F11}");
    }
}
}

// ************************************************************************
// **********************************OROLOGIO******************************
// ************************************************************************    
function clockUpdate() {
    var date = new Date();
    $('.Timer').css({'font-family': 'digital', 'font-size':'30px','color':'yellow'});
    
    function addZero(x) {
      if (x < 10) {
        return x = '0' + x;
      } else {
        return x;
      }
    }


var h = addZero(date.getHours());
var m = addZero(date.getMinutes());
var s = addZero(date.getSeconds());

$('.Timer').text(h + ':' + m + ':' + s)
}

// ************************************************************************
// **********************************PUNTEGGIO******************************
// ************************************************************************    


function set()
{
    punti_left = 0;
    punti_right = 0;
    game_left = 0;
    game_right = 0;
    $("#punti_left").text("00");
    $("#punti_right").text("00");
    $("#game_left").text("0");
    $("#game_right").text("0");
    $("#set_left").text(set_left.toString());
    $("#set_right").text(set_right.toString());

}

function game()
{
    punti_left = 0;
    punti_right = 0;
    $("#punti_left").text("00");
    $("#punti_right").text("00");
    $("#game_left").text(game_left.toString());
    $("#game_right").text(game_right.toString());
    if (ball_left == 1)
        {
          ball_left=0;
          $("#ball_right").attr("src","img/ball.png");
          $("#ball_left").attr("src","img/blank.png");
        }
        else
        {
          ball_left=1;
          $("#ball_left").attr("src","img/ball.png");
          $("#ball_right").attr("src","img/blank.png");

        }
  if ((game_left == 6) && (game_right < 5))
        {
          set_left++;
          set();
        }

  if ((game_right == 6) && (game_left < 5))
        {
          set_right++;
          set();
        }

  if ((game_left == 7) && (game_right  == 5))
        {
          set_left++;
          set();
        }

  if ((game_right == 7) && (game_left ==  5))
        {
          set_right++;
          set();
        }
  if ((game_right == 6) && (game_left ==  6))
        {
          // TIE BREAK
        }

}

function calcola_punteggio()
{
  console.log("left " + punti_left  + " right  "+ punti_right);

  switch (punti_left){
    case 0: $("#punti_left").text("00");break;
    case 1: $("#punti_left").text("15");break;
    case 2: $("#punti_left").text("30");break;
    case 3: $("#punti_left").text("40");break;
    case 4: $("#punti_left").text("ADV");break;
  }      

  switch (punti_right){
    case 0: $("#punti_right").text("00");break;
    case 1: $("#punti_right").text("15");break;
    case 2: $("#punti_right").text("30");break;
    case 3: $("#punti_right").text("40");break;
    case 4: $("#punti_right").text("ADV");break;
  }      
  if ((punti_right == 4) && (punti_left <3))
            {
              game_right++;
              game();
            } 

  if ((punti_left == 4) && (punti_right <3))
            {
              game_left++;
              game();
            } 
  if (punti_right == 5) 
            {
              game_right++;
              game();
            } 

  if (punti_left == 5)
            {
              game_left++;
              game();
            } 
  }
  
function destra(){
  if ((punti_left == 4) && (punti_right == 3))
                {
                  punti_left--;
                }
                else
                {
                  punti_right++;
                }
            audioElement.play();
                      calcola_punteggio(); 
}

function sinistra(){
  if ((punti_right == 4) && (punti_left == 3))
                {
                  punti_right--;
                }
                else
                {
                  punti_left++;
                }

            audioElement.play();
            calcola_punteggio(); 
}

// ******************* MAIN *************************
$(document).foundation();

  $(document).ready(function(){

  //  *************************************************
  //  ******************* IMPUT DA GAMEPAD ************
  //  *************************************************

  window.gamepad = new Gamepad();
  gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
          //console.log('Connected', device);
      });

  gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
    console.log(e.control);
    if (e.control == 'FACE_1')
          {
            sinistra();
          }
    
    if (e.control == 'FACE_2')
          {
            destra();
          }

      });

  if (!gamepad.init()) {
        alert('Your browser does not support gamepads, get the latest Google Chrome or Firefox.');
      }


  // DISPLAY CLOCK
  clockUpdate();
  setInterval(clockUpdate, 1000);

  // LOAD SOUND
  audioElement = new Audio('./sound/bling_short.mp3');

  // FULL SCREEN BUTTON
  $('#full_screen').click(function(){
    var elem = document.body; 
    requestFullScreen(elem);
  });

  // RESET BUTTON
  $('#reset').click(function(){
    punti_left = 0;
    punti_right = 0;
    game_left = 0;
    game_right = 0;
    set_left = 0;
    set_right = 0;

    ball_left = 1;		

    $("#punti_left").text("00");
    $("#punti_right").text("00");
    $("#game_left").text("0");
    $("#game_right").text("0");
    $("#set_left").text("0");
    $("#set_right").text("0");  
    
    $("#ball_left").attr("src","img/ball.png");
    $("#ball_right").attr("src","img/blank.png");

   });

 // CONTROLLA INPUT DA TASTIERA
   $("body").on("keypress", function (e) {
          console.log(e.which);
      switch(e.which)
      {
                case 114: //RIGHT
            destra();
                      break;
                case 108: //LEFT
            sinistra();
                   break;
        }
    });
});