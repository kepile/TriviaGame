// *******************Variables*************
var timer = 0;
var counter= 0;
var gameOver = false;
var correct=0;
var wrong=0;
var unanswered=0;
var message = "";
var ques = 0;
var userPick;
var responseCorrect = ["That's right! ", "You are correct! ",  "You are a Disney expert! ", "DING DING DING! "]
var responseWrong = ["That is incorrect!",  "BUZZZZ! ",  "Sorry, better luck next time. ",  "Nice try. ", "Good guess but no. "]
var outOfTime = ["You have to be in it to win it!", "Out of time! ", "Darn!  You did not answer. ", "Take a guess next time! ", "Come on now.  You can do this! " ]
var trivia = [
	   {
	    question: "What was the first 3D animated feature film?",
	    ans: ["Toy Story", "Aladdin", "Cinderella", "Tarzan"],
	    response: [true, false, false, false],
	    answer: "The first 3D animated feature film was Toy Story.",
	     vid: "assets/images/toy.gif"},
	   {
	    question: "Which movie is a remake of The Absent Minded Professor?",
	    ans: ["Tangled", "Princess and The Frog", "Flubber", "The Nutty Professor"],
	    response: [false, false, true, false],
	    answer: "Flubber was a remake of The Absent Minded Professor.",
	    vid: "assets/images/flubber.gif"},
       {
	    question: "Who was the scrapped cartoon star that came before Mickey Mouse?",
	    ans: ["Donald Duck", "Horace Horse", "Goofy", "Oswald The Rabbit"],
	    response: [false, false, false, true],
	    answer: "Oswald the Rabbit was scrapped as the cartoon star before Mickey Mouse.",
	     vid: "assets/images/oswald.gif"},
	   {
	    question: "Which Disney villain stars in The Little Mermaid?",
	    ans: ["King Triton", "Ursula", "Captain Hook", "The Red Queen"],
	    response: [false, true, false, false],
	    answer: "Ursula was the villain in The Little Mermaid.",
	     vid: "assets/images/ursala.gif"},
	   {
	    question: "Which Pixar film takes place in Australia?",
	    ans: ["Brave", "Cars", "Ratatouille", "Finding Nemo"],
	    answer: "Finding Nemo takes place in Australia.",
	    response: [false, false, false, true],
	     vid: "assets/images/nemo.gif"},
	   {
	    question: "Which Disney movie is a retelling of the story of Hamlet?",
	    ans: ["The Lion King", "Beauty and The Beast", "Cinderella", "Frozen"],
	    response: [true, false, false, false],
	    answer: "The Lion King is based on the story of Hamlet.",
	     vid: "assets/images/lion.gif"},
	   {
	    question: "Which Disney movie wasn't inspired by a ride at a Disney theme park?",
	    ans: ["Pirates of The Carribbean", "Tomorrowland", "Cars", "Tower of Terror"],
	    response: [false, false, true, false],
	    answer: "Cars is not inspired by a ride at Disney theme parks.",
	     vid: "assets/images/cars.gif"},
	   {
	    question: "Which Disney movie featured a mix of cartoons and live action actors?",
	    ans: ["Space Jam", "The Country Bears", "Dumbo", "Mary Poppins"],
	    response: [false, false, false, true],
	    answer: "Mary Poppins features a mix of cartoons and live action actors.",
	     vid: "assets/images/poppins.gif"},
	   {
	    question: "Which Disney movie was later turned into a TV series?",
	    ans: ["Toy Story", "Aladdin", "A Bug's Life", "Cars"],
	    response: [ false, true, false, false],
	    answer: "Aladdin was later turned into a TV series.",
	     vid: "assets/images/alladin.gif"},
	   {
	    question: "Who sings the featured title song from Frozen?",
	    ans: ["Katy Perry", "Kristen Bell", "Idina Menzel", "Taylor Swift"],
	    response: [false, false, true, false],
		answer: "Idina Menzel sings the featured title song from Frozen.",
	     vid: "assets/images/frozen.gif"}
	    ];


// *****************Functions*******************

// Display the question and answers in a button that has already been created
	 function displayTrivia(){
		    var j=0;
			$("#question").html(trivia[ques].question).attr("class", "ques");
		    $('.triviaBtn').each(function(){	
					$(this).removeData("ansr");
					$(this).html(trivia[ques].ans[j]);
					$(this).attr("data-ansr", trivia[ques].response[j]);
					j++;
		    });
		};
	



// create the buttons for the trivia questions at the start of each game
function createBttn(){
		for (var i = 0; i < 4; i++) {
		var newBtn = $("<button>");
		newBtn.attr("class", "triviaBtn btn");
		$("#answers").append(newBtn);
	    }
	}



// coordinate functions that need to be set at the begginning of every new question
function startNewQues(){
	restartTimer();
	displayTrivia();
	}


// start function for counting down timer
function restartTimer () {
	 timer = 15;
	 displayTime();
	 counter= setInterval(runTimer, 1000);
}


// display time on page every second
function displayTime(){
	$("#counter").html("Time Remaining: " + timer);
}


// substract a second every time ran, send to display function 
// and check to see if there is still time left.  If out of time, display answer
function runTimer(){
	timer--;
	displayTime();
	
	if (timer == 0) {
		// message = "Out of Time!";
		message = outOfTime[Math.floor(Math.random() *  outOfTime.length)];
		unanswered++;
		displayAnswer();	
		}
}



// At end of game, display the results and a restart button
function displayResults() {
		$("#question").empty();
		if (correct >= 7) { message = "Congratulations! You have achieved expert level!";}
		else if (correct >= 4) {message = "Nice going! You have achieved a novice level.";}
		else {message = "You need to study up on your Disney Trivia and try again!";};
		var tempDiv = $("<div>").html(message).attr("class", "resultsFirst");
		$("#answers").append(tempDiv);  
	    tempDiv = $("<div>").html("Total Correct Answers: " + correct).attr("class", "results");
	    $("#answers").append(tempDiv);
	    tempDiv = $("<div>").html("Total Wrong Answers: " + wrong).attr("class", "results");
	    $("#answers").append(tempDiv);
	    tempDiv = $("<div>").html("Total Unanswered: " + unanswered	).attr("class", "results");
	    $("#answers").append(tempDiv);
	    begBtn.html("Restart");
		$("#answers").append(begBtn); 
}



// after a guess or running out of time, display the asnwer
function displayAnswer() {
    $(".triviaBtn").hide();
	clearInterval(counter);
    // var resultDiv = $("#answers");
    $("#question").html(message);
    $("#question").append("  " + trivia[ques].answer);
    var newImg = $("<img>").attr("src", trivia[ques].vid).attr("class", "screen");
    $("#answers").append(newImg);

// Wait 5 seconds and then clear out the answer.  If there are more
// questions to be asked, ask next question.  If not, display the total results
    setTimeout(function(){
		    $( ".screen" ).remove();
		    if (ques < trivia.length-1) {
			    	$(".triviaBtn").show();
			        ques++;
			        startNewQues();
		    } else {
		       displayResults();
			}
	   }, 1000*5);
}


// ****************start of coding ***************

// display start button and title
$("#question").html("Disney Trivia").attr("class", "titl");
var begBtn = $("<button>");
begBtn.attr("class", "startBtn");
begBtn.html("Start");
$("#answers").append(begBtn); 


// function executes when start button pushed
$(".startBtn").on("click", function() {

// set variables for beginning of game or when game restarted
	$(".startBtn").detach();
	$(".results").empty();
	$("#answers").empty();
	$("#vidDiv").empty();
	timer = 0;
	counter= 0;
	gameOver = false;
	correctAns = "";
	correct = 0;
    wrong = 0;
    unanswered = 0;
    ques = 0;
// create a new button and populate it with a question
	createBttn();
	startNewQues();


// wait for the user to click an answer. Check if correct and send to function to be displayed
	 $(".triviaBtn").on("click", function(){
		 	userPick = $(this).data("ansr");
			if (userPick) {
				message = responseCorrect[Math.floor(Math.random() *  responseCorrect.length)];
				correct++;
			} else {
				message = responseWrong[Math.floor(Math.random() *  responseWrong.length)];
			    // message = "That answer is incorrect."
			    wrong++;
			   };

			displayAnswer();
	});

});
	 
