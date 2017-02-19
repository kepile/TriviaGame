var timer = 0;
var counter= 0;
var gameOver = false;
var correct=0;
var wrong=0;
var unanswered=0;
var message = "";
var ques = 0;
var userPick;

var trivia = [
	   {
	    question: "What was the first 3D animated feature film",
	    ans: ["Toy Story", "Aladdin", "Cinderella", "Tarzan"],
	    response: [true, false, false, false],
	    answer: "The first 3D animated feature film was Toy Story",
	     vid: "assets/images/toy.gif"},
	   {
	    question: "Which movie is a remake of The Absent Minded Professor?",
	    ans: ["Tangled", "The Princess and The Frog", "Flubber", "The Nutty Professor"],
	    response: [false, false, true, false],
	    answer: "Flubber was a remake of The Absent Minded Professor",
	    vid: "assets/images/flubber.gif"},
       {
	    question: "Who was the scrapped cartoon star that came before Mickey Mouse?",
	    ans: ["Donald Duck", "Horace Horse", "Goofy", "Oswald The Rabbit"],
	    response: [false, false, false, true],
	    answer: "Oswald the Rabbit was scrapped as the cartoon star before Mickey Mouse",
	     vid: "assets/images/oswald.gif"},
	   {
	    question: "Which Disney villain stars in The Little Mermaid?",
	    ans: ["King Triton", "Ursula", "Captain Hook", "The Red Queen"],
	    response: [false, true, false, false],
	    answer: "Ursula was the villain in The Little Mermaid",
	     vid: "assets/images/ursala.gif"},
	   {
	    question: "Which Pixar film takes place in Australia?",
	    ans: ["Brave", "Cars", "Ratatouille", "Finding Nemo"],
	    answer: "Finding Nemo takes place in Australia",
	    response: [false, false, false, true],
	     vid: "assets/images/nemo.gif"},
	   {
	    question: "Which Disney movie is a retelling of the story of Hamlet?",
	    ans: ["The Lion King", "Beauty and The Beast", "Cinderella", "Frozen"],
	    response: [true, false, false, false],
	    answer: "The Lion King is based on the story of Hamlet",
	     vid: "assets/images/lion.gif"},
	   {
	    question: "Which Disney movie wasn't inspired by a ride at a Disney theme park?",
	    ans: ["Pirates of The Carribbean", "Tomorrowland", "Cars", "Tower of Terror"],
	    response: [false, false, true, false],
	    answer: "Cars is not inspired by a ride at Disney theme parks",
	     vid: "assets/images/cars.gif"},
	   {
	    question: "Which Disney movie featured a mix of cartoons and live action actors?",
	    ans: ["Space Jam", "The Country Bears", "Dumbo", "Mary Poppins"],
	    response: [false, false, false, true],
	    answer: "Mary Poppins features a mix of cartoons and live action actors",
	     vid: "assets/images/poppins.gif"},
	   {
	    question: "Which Disney movie was later turned into a TV series?",
	    ans: ["Toy Story", "Aladdin", "A Bug's Life", "Cars"],
	    response: [ false, true, false, false],
	    answer: "Aladdin was later turned into a TV series",
	     vid: "assets/images/alladin.gif"},
	   {
	    question: "Who sings the featured title song from Frozen",
	    ans: ["Katy Perry", "Kristen Bell", "Idina Menzel", "Taylor Swift"],
	    response: [false, false, true, false],
		answer: "Idina Menzel sings the featured title song from Frozen",
	     vid: "assets/images/frozen.gif"}
	    ];


// Display the question and answers in a button that has already been created
	 function displayTrivia(){
		    var j=0;
			$("#question").html(trivia[ques].question);
			$('.triviaBtn').each(function(){	
				 $(this).removeData("ansr");
				
			    // if (trivia[ques].response[j]) {
			    // 	correctAns = trivia[ques].ans[j];
			    // };
			    $(this).html(trivia[ques].ans[j]);
				$(this).attr("data-ansr", trivia[ques].response[j]);
				j++;
		    });
		};
	




function createBttn(){

		    console.log("createBttn");
		for (var i = 0; i < 4; i++) {
		var newBtn = $("<button>");
		newBtn.attr("class", "triviaBtn btn");
		$("#answers").append(newBtn);
	    }
	}



function startNewQues(){

    console.log("startNewQues");
	displayTime();
	restartTimer();
	displayTrivia();
	
}


function restartTimer () {

		    console.log("restartTimer");
	 timer = 10;
	 counter= setInterval(runTimer, 1000);
}


function displayTime(){
	
		    console.log("displayTime"+ timer);
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

		    console.log("displayResults");
		$("#question").empty();
	    // $("#counter").hide();
	    var tempDiv  = $("<div>").html("Total Correct Answers: " + correct).attr("class", "results resultsFirst");
	    $("#answers").append(tempDiv);
	    tempDiv = $("<div>").html("Total Wrong Answers: " + wrong).attr("class", "results");
	    $("#answers").append(tempDiv);
	    tempDiv = $("<div>").html("Total Unanswered: " + unanswered	).attr("class", "results");
	    $("#answers").append(tempDiv);
	    begBtn.html("Restart");
		$("#answers").append(begBtn); 


}



function displayAnswer() {

		    console.log("displayAnswer");
    $(".triviaBtn").hide();
    console.log("trivia buttons hidden");
	clearInterval(counter);
    var resultDiv = $("#answers");
    $("#question").html(message);
    $("#question").append("  " + trivia[ques].answer);
    var newImg = $("<img>").attr("src", trivia[ques].vid).attr("class", "screen");
  
    $("#answers").append(newImg);
    setTimeout(function(){
	    $( ".screen" ).remove();
		console.log("question # " +ques + " " + trivia.length);
	    if (ques < trivia.length-1) {

		    console.log("showTriviaBtN");
	    	$(".triviaBtn").show();
	        ques++;
	       startNewQues();
	       				console.log(" called start new question");

	    } else {
	    		console.log(" calling display Results");
	       displayResults();
	    		console.log(" back from displayig results");
		}
   }, 1000*3);


}




$("#question").html("Disney Trivia");
$("#question").attr("class", "titl");
var begBtn = $("<button>");

begBtn.attr("class", "startBtn");
begBtn.html("Start");
$("#answers").append(begBtn); 



$(".startBtn").on("click", function() {

	console.log("start button pushed");
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
	createBttn();
	startNewQues();

	 $(".triviaBtn").on("click", function(){
		 	userPick = $(this).data("ansr");
				console.log("trivia button clicked");
			if (userPick) {
				message = "Congratulations!  That is correct.";
				correct++;
			} else {
			    message = "That answer is incorrect."
			    wrong++;
			   };

			displayAnswer();

		 	console.log("the guess was " + $(this).data("ansr"));
	});

});
	 
 // 	che
 // });