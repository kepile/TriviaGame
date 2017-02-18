var timer = 0;
var counter= 0;
var gameOver = false;
var correctAns;
var correct;
var wrong;
var unanswered;
var message = "";
var ques = 1;
var userPick;

var trivia = {
	quest1 : {
	    question: "What was the first 3D animated feature film",
	    ans: ["Toy Story", "Aladdin", "Cinderella", "Tarzan"],
	    response: [true, false, false, false],
	     vid: ""},
	quest2  : {
	    question: "Which movie is a remake of The Absent Minded Professor?",
	    ans: ["Tangled", "The Princess and The Frog", "Flubber", "The Nutty Professor"],
	    response: [false, false, true, false]},
    quest3  : {
	    question: "Who was the scrapped cartoon star that came before Mickey Mouse?",
	    ans: ["Donald Duck", "Horace Horse", "Goofy", "Oswald The Rabbit"],
	    response: [false, false, false, true]},
	quest4  : {
	    question: "Which Disney villain stars in The Little Mermaid?",
	    ans: ["King Triton", "Ursula", "Captain Hook", "The Red Queen"],
	    response: [false, true, false, false]},
	quest5  : {
	    question: "Which Pixar film takes place in Australia?",
	    ans: ["Brave", "Cars", "Ratatouille", "Finding Nemo"],
	    response: [false, false, false, true]},
	quest6  : {
	    question: "Which Disney movie is a retelling of the story of Hamlet?",
	    ans: ["The Lion King", "Beauty and The Beast", "Cinderella", "Frozen"],
	    response: [true, false, false, false]},
	quest7  : {
	    question: "Which Disney movie wasn't inspired by a ride at a Disney theme park?",
	    ans: ["Pirates of The Carribbean", "Tomorrowland", "Cars", "Tower of Terror"],
	    response: [false, false, true, false]},
	quest8  : {
	    question: "Which Disney movie featured a mix of cartoons and live action actors?",
	    ans: ["Space Jam", "The Country Bears", "Dumbo", "Mary Poppins"],
	    response: [false, false, false, true]},
	quest9  : {
	    question: "Which Disney movie was later turned into a TV series?",
	    ans: ["Toy Story", "Aladdin", "A Bug's Life", "Cars"],
	    response: [ false, true, false, false]},
	quest6  : {
	    question: "Who sings the featured title song from Frozen",
	    ans: ["Katy Perry", "Kristen Bell", "Idina Menzel", "Taylor Swift"],
	    response: [false, false, true, false]},

	 displayTrivia: function(){
		    var j=0
		    var currentQues = "quest"+ques;
		    
			$("#question").html(trivia[currentQues].question);
			$('.triviaBtn').each(function(){	
				
			    if (trivia[currentQues].response[j]) {
			    	correctAns = trivia[currentQues].ans[j];
			    };
			    $(this).html(trivia[currentQues].ans[j]);
				$(this).attr("data-ansr", trivia[currentQues].response[j]);
				j++;
		    });
		}
	};




function createBttn(){
		for (var i = 0; i < 4; i++) {
		var newBtn = $("<button>");
		newBtn.attr("class", "triviaBtn btn");
		$("#answers").append(newBtn);
	    }
	}



function startNewQues(){
	displayTime();
	trivia.displayTrivia();
	restartTimer();
}


function restartTimer () {
	 timer = 10;
	 counter= setInterval(runTimer, 1000);
}


function displayTime(){
	
	$("#counter").html("Time Remaining: " + timer);
}


function runTimer(){
	timer--;
	displayTime();
	
	if (timer == 0) {
		message = "Out of Time!";
		unanswered++;
		displayAnswer();	
		}
}



function displayResults() {
		$("#answers").empty();
	    $("#counter").remove();
	    var tempDiv  = $("<div>").html("Total Correct Answers: " + correct);
	    $("#answers").append(tempDiv);
	    tempDiv  = $("<div>").html("Total Wrong Answers: " + wrong);
	      $("#answers").append(tempDiv);
}



function displayAnswer() {
    $(".triviaBtn").hide();
	clearInterval(counter);
    var resultDiv = $("#answers");
    $("#question").html(message);
    var newVid = $("<video>");
   // newVid.attr("src", "assets/images/07a3c47a49821d54761a61d704ae0769.mts-mp430-272.MP4");
    newVid.attr("src", "https://www.youtube.com/embed/LJnlmJ4lqik" );
    newVid.attr("class", "screen");
    newVid.attr("type", "video/mp4")
    $("#answers").append(newVid);
    var vid = $(".screen")
   // vid.play();
    setTimeout(function(){
	    $( ".screen" ).remove();

	    if (ques === 10) {
	    	displayResults();
	    } else {
	       $(".triviaBtn").show();
	       ques++;
	       startNewQues();
		}
   }, 1000*5);


}




var begBtn = $("<button>");
begBtn.attr("class", "startBtn");
begBtn.html("Start");
$("#answers").append(begBtn); 



$(".startBtn").on("click", function() {
	$(".startBtn").detach();
	timer = 0;
	counter= 0;
	gameOver = false;
	correctAns = 0;
    wrong = 0;
    unanswered = 0;
    ques = 1;
	createBttn();
	startNewQues();
	 $(".triviaBtn").on("click", function(){
		 	userPick = $(this).data("ansr");
			if (userPick) {
				message = "Congratulations!  That is correct.";
				correct++;
			} else
			    message = "That answer is incorrect."
			    wrong++;

			displayAnswer();

		 	console.log("the guess was " + $(this).data("ansr"));
	});

});
	 
 // 	che
 // });