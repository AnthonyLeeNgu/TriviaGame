
var triviaQuestions = [{
	question: "In the episode Diversity Day, the office undergo a training program on diversity. What is the reason for this needing to happen?",
	answerList: ["Michael fires Stanley", " Michael upset his workers attempting to recreate a Chris Rock comedy routine ", "Michael was forced to do the training", "Jan makes Michael do it"],
	answer: 1
},{
	question: "How many seasons did this show go for?",
	answerList: ["9", "5", "8", "1"],
	answer: 0
},{
	question: "Which season was Michael Scotts last season on the show?",
	answerList: ["7", "9", "5", "3"],
	answer: 0
},{
	question: "Who was NBC first choice to play Michael Scott?",
	answerList: ["Denzel Washington", "Lil Wayne", "Paul Giamatti", "Seth Rogan"],
	answer: 2
},{
	question: "What does Micahel Scott's mug say?",
    answerList: ["His name", "he didn't have a mug", "World's worst boss", "World's Best Boss"],
	answer: 3
},{
	question: "Does Poor Richards Pub really exist?",
	answerList: ["yes", "no", "maybe", "I have no idea"],
	answer: 0
},{
	question: "What is Dwights brothers name?",
	answerList: ["Moses", "Jeb", "Jack", "Ed"],
	answer: 1
},{
	question: "Who attended anger management in season 3?",
	answerList: ["Dwight", "Jim", "Andy", "Michael"],
	answer: 2
},{
	question: "Name Angela's cat",
	answerList: ["Roxy", "Sprinkles", "King", "Sweetheart"],
	answer: 1
},{
	question: "What was the name of Jan's baby?",
	answerList: ["Hopper", "Woody", "Marlin", "Astrid"],
	answer: 3
},{
	question: "Name Ryan's online Social Media Networking site",
	answerList: ["WUPHF.com", "Woof.com", "He didn't have one", "Linkup.com"],
	answer: 0
},{
	question: "What is Andy's birth name?",
	answerList: ["Nard Dog", "Walter Bernard", "Andrew Walter", "The Prince of Egypt"],
	answer: 1
},{
	question: "Who is revealed to have a second job as a tele marketer in the season 4 episode 'Money'?",
	answerList: ["Dwight", "Ryan", "Andy", "Michael"],
	answer: 3
},{
	question: "Who goes with Miachel to confront Donna's husband in the season 6 episode 'Chump'?",
	answerList: ["Andy", "Stanley", "Ryan", "Toby"],
	answer: 0
},{
	question: "What was Stanley's car hit by in the season 3 episode 'Safety Training'?",
	answerList: ["Rock", "Cat", "Watermelon", "Printer"],
	answer: 2
}];


var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();


	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}