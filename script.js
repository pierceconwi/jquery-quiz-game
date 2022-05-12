"use strict";

// bindings
// const to hold question and answer data
const mycards = [
  {
    question: "What color is the sky?",
    answers: [ "black", "purple", "blue", "yellow" ],
    correct: 2
  },
  {
    question: "What is 2+2?",
    answers: [ 13, 4, 98, 0, 19],
    correct: 1
  },
  {
    question: "What is another word for ECMAScript?",
    answers: [ "JavaScript", "mathematics", "Korean" ],
    correct: 0
  },
  {
    question: "What year is it?",
    answers: [ 1997, 1641, 3, 2022],
    correct: 3
  }
];

// variable to hold question number
var qn = 0;

// on load
// loads the first question
showQuestion();

// jQuery UI
  $( "#tabs" ).tabs();


// functions

/* function to pull info from data model and populate user choice options and question info. */
function showQuestion() {
  $('#counter').text( qn + 1);
  $('#question').text( mycards[qn].question );
  $('#answers').empty();
  $( "#progressbar" ).progressbar({
      value: (qn*25)
    });
  for ( let index in mycards[qn].answers ) {
    var button = $("<span>");
    button.text( mycards[qn].answers[index] );
    button.data ('choice', index);
    $('#answers').append( button );
    button.draggable();
/*    button.click(
      function() {
        checkAnswer(index);
      }
    ); not needed w/ drag and drop */
  }

// drop zone that activates on drop to trigger checkAnswer() */
  $("#drophere").droppable (
  {
    drop: function(event, ui) {
      var uselect = ui.draggable.data('choice');
      checkAnswer(uselect);
    }
  }
  );
}

/* compare user selection to the correct answer listed under mycards based on the turn aka qn, while also clearing the area a message won't be displayed */
function checkAnswer(uanswer) {
  if ( uanswer == mycards[qn].correct ) {
    $('#wrong').empty();
    $('#right').text("Correct!");
    nextQuestion();
  } else {
    $('#wrong').text("Wrong!");
    $('#right').empty();
  }
}


/* compare number of items in array to turns taken and decide whether to procede or show end-of-game screen */
function nextQuestion() {
  qn++;
  if ( qn < mycards.length ) {
    showQuestion();
  } else {
    setTimeout(function(){
      window.location.href = 'index.html';
   }, 5000);
    $('body').html("<div id='game-over'><h2>Thanks for playing!</h2><br><p>The game will automatically reset in 5 seconds...</p></div>")
  }
}