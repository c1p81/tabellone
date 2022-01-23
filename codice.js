var punti_left = 0;
var punti_right = 0;
var game_left = 0;
var game_right = 0;
var set_left = 0;
var set_right = 0;
var name_player1 = "Player 1";
var name_player2 = "Player 2";
var max_sets = 3;
// gestisce l'indicatore del servizio
var ball_left = 1;
var time_start;

// audio
var audioElement;

// tie-brak
var TieBreak = false;

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

var diff = date.getTime() - time_start;
var msec = diff;
var hh = Math.floor(msec / 1000 / 60 / 60);
msec -= hh * 1000 * 60 * 60;
var mm = Math.floor(msec / 1000 / 60);
msec -= mm * 1000 * 60;
var ss = Math.floor(msec / 1000);
msec -= ss * 1000;

$('.Timer').text(h + ':' + m + ':' + s + ' / ' + addZero(hh) + ':' + addZero(mm) + ':' + addZero(ss))
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


  if ((game_right == 6) && (game_left ==  6))
        {
          // TIE BREAK
          TieBreak = true;  
          $("#punti").text("Tie Break");
          $("#punti_left").text("0")
          $("#punti_right").text("0")

          punti_left = 0;
          punti_right = 0;
          return;
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
}

function calcola_punteggio()
{
  if ((TieBreak) && ((set_left+set_right+1) < max_sets))
  {
        // *************** PUNTEGGIO TIEBREAK ***********************
        $("#punti_left").text(punti_left.toString());
        $("#punti_right").text(punti_right.toString());

        if ((punti_right >= 7) && ((punti_right-punti_left) >=2))
        {
          set_right++;
          set();
          TieBreak = false;
          $("#punti").text("Point");

        }

      if ((punti_left  >= 7) && ((punti_left-punti_right) >=2))
        {
          set_left++;
          set();
          TieBreak = false;
          $("#punti").text("Point");

        }


  }
  else
  {
        // *************** PUNTEGGIO GAME ***********************

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

  //  *************************************************
  //  *******************     RESET        ************
  //  *************************************************
function reset()
{
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
    $("#punti").text("Point");
    
    $("#ball_left").attr("src","img/ball.png");
    $("#ball_right").attr("src","img/blank.png");
}


  //  *************************************************
  //  *******************     UNDO         ************
  //  *************************************************
function undo()
{

}


// ******************* MAIN *************************
$(document).foundation();

  $(document).ready(function(){
  
  // TEMPO INIZIO PARTITA
  var date_start = new Date();
  time_start = date_start.getTime();
  

  //  *************************************************
  //  ***************LEGGE VARIABILI       ************
  //  *************************************************
  name_player1 = sessionStorage.getItem("player1");
  name_player2 = sessionStorage.getItem("player2");
  max_sets = sessionStorage.getItem("max_sets");
  if (name_player1.length > 2)
        {
          $('#player1').text(name_player1);        
        }
  
  if (name_player2.length > 2)
        {
          $('#player2').text(name_player2);        
        }
  
  console.log(name_player1);  
  //  *************************************************
  //  ******************* INPUT DA GAMEPAD ************
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

  // PLAYER 1 BUTTON
  $('#player1').click(function(){
    sinistra();
  });

  // PLAYER 2 BUTTON
  $('#player2').click(function(){
    destra();
  });
  

  // FULL SCREEN BUTTON
  $('#full_screen').click(function(){
    var elem = document.body; 
    requestFullScreen(elem);
  });

  // RESET BUTTON
  $('#reset').click(function(){
      reset();
   });

  // UNDO BUTTON
  $('#undo').click(function(){
    undo();
 });


 // CONTROLLA INPUT DA TASTIERA
   $("body").on("keypress", function (e) {
      console.log(e.which);
      switch(e.which)
      {
            case 114: //RESET
                  reset();
                  break;
            case 82: //RESET
                  reset();
                  break;
            case 49: //Player1
                  sinistra();
                  break;
            case 50: //Player2
                  destra();
                  break;
            case 117: //Undo
                  undo();
                  break;
            case 85: //Undo
                  undo();
                  break;


                }
              
    });
});