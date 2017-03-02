//step 1: state management


var config = {
	questions: [
		{
			question: 'Trump tweeted, "Robert Pattinson should not take back _________. She cheated on him like a dog & will do it again – just watch. He can do much better!” - Who is he talking about this time?',
			choices: ['Kristen Stewart', 'Selena Gomez', 'Harry Potter', 'Melissa McCarthy'],
			correct: 'Kristen Stewart',
		},
		{
			question: 'Trump tweeted, "All of the women on _________ flirted with me – consciously or unconsciously. That’s to be expected.” - What terrible show is he talking about?', 
			choices: ['The View', 'Jimmy Fallon', 'The Apprentice', 'Fox News'],
			correct: 'The Apprentice',
		},
		{
			question: 'Trump tweeted, "I’ve said if __________ weren’t my daughter, perhaps I’d be dating her." - who is he creepily talking about?', 
			choices: ['Melania', 'Roberta', 'Hillary', 'Ivanka'],
			correct: 'Ivanka',
		},
		{
			question: 'Trump tweeted, "___________, one of the most over-rated actresses in Hollywood, doesn’t know me but attacked last night at the Golden Globes. She is a Hillary flunky who lost big." - Who is he talking about?' , 
			choices: ['Mandy Moore', 'Meryl Streep', 'Emma Stone', 'Jennifer Lawrence'],
			correct: 'Meryl Streep',
		},
		{
			question: 'Trump tweeted, "When ________ sends its people, they’re not sending the best. They’re not sending you, they’re sending people that have lots of problems and they’re bringing those problems with us. They’re bringing drugs. They’re bring crime. They’re rapists…" - What country is he talking about?' , 
			choices: ['Pakistan', 'Mexico', 'China', 'Canada'],
			correct: 'Mexico',
		},

	],
	answerComments: {
		questionCorrect: 'You are right! I know, he is unbelievable.',
		questionIncorrect: 'You are wrong! No worries, too many Trump issues to keep track of.',
	}, 
	pages: ['begin-quiz-page', 'question-page', 'answer-page', 'score-page'],

}

//state = should be the initial state of the app (at first)
//state is the 'memory' of the application, and it evolves as the app progresses.

var state = {
	question: 0,	
	page: 0,
	answerCorrect: false,
	answerCorrectCounter: 0,
}

//step 2: functions that modify the state (no jquery here)
//wait, how does the app "remembers" the state that it's on question 1 & page 1.  
function nextPage(state) {
	state.page = state.page + 1;
}

function nextQuestion(state) {
	state.question = state.question + 1;
}

function updateAnswerCorrect(state, answer) {
	var expectedAnswer = config.questions[state.question].correct;
	if (answer === expectedAnswer) {
		state.answerCorrect = true;

		state.answerCorrectCounter = state.answerCorrectCounter + 1; 
		// console.log(state.answerCorrectCounter);
	} else {
		state.answerCorrect = false;
		// console.log(state.answerCorrectCounter);
	}
}

//step 3: Render in the DOM functions
//all render functions should end w/ this: element.html(itemsHTML);
// The HTML should reflect the state. 
//You should have a single function for each part of the page which you want to update. 

function renderPage(state, element, pageName) {
	$(element).find('.page').hide();
	$(element).find('.' + pageName +'-page').show();
};

//questionIndex is in the state

function renderQuestion(state, element) {
	var currentQuestion = config.questions[state.question].question;
	$(element).find('h2.current-question').text(currentQuestion); 
};

function renderAnswerChoices(state, element) {
	var currentAnswerChoices = config.questions[state.question].choices;
	$(element).html(''); //clears previous entry
	currentAnswerChoices.map(function(choice) {
		var output;
		output = '<li><input name="trump-quotes" value="' + choice + '"' + 'type="radio" required/>' + choice + '</li>';
		//$('ul.answer-choices').append(output)
		$(element).append(output);
	});
};

function questionProgress(state, element) {
	var questionCounter = state.question + 1;
	$(element).find('.question-progress').text('question ' + questionCounter + '/5'); 
}


function renderAnswer(state, element, answer) {
	var output;

	if (state.answerCorrect) {
		output = config.answerComments.questionCorrect;
	} else {
		output = config.answerComments.questionIncorrect;
	}

	$(element).text('You answered: ' + answer + '. ' + output);
}

function renderScore(state, element) {
	// $(element).find('.user-score').text(state.answerCorrectCounter);
	var finalScore = state.answerCorrectCounter;
	$(element).text('Your final score is: ' + finalScore + '/5! Thanks for taking this test!');


}

//step 4: jquery event listeners. 

//begin quiz form submission 

$('form[name="begin-quiz"]').on('submit', function(event) {
	event.preventDefault();
	nextPage(state);
	renderPage(state, $('.pages'),'question');
	renderQuestion(state, $('.question-page'));
	renderAnswerChoices(state, $('ul.answer-choices'));
	questionProgress(state, $('.question-page'));

});

$('form[name="submit-answer"]').on('submit', function(event) {
	event.preventDefault();
	renderPage(state, $('.pages'),'answer');
	var userAnswer = $(event.currentTarget).find(':checked').val(); 
	//if (userAnswer == null)   
	//updates the state
	updateAnswerCorrect(state, userAnswer); 
	renderAnswer(state, $('.answer-display'), userAnswer);
});

$('button.next-question').on('click', function(event) {
	if (state.page < config.questions.length) {
		event.preventDefault();
		nextPage(state);
		// console.log('page is' + state.page);
		nextQuestion(state);
		renderPage(state, $('.pages'),'question');
		renderQuestion(state, $('.question-page'), state.question);
		renderAnswerChoices(state, $('ul.answer-choices'), state.question);
		questionProgress(state, $('.question-page'), state.question);
	} else {
		renderPage(state, $('.pages'), 'score');
		renderScore(state, $('.user-score'));
	}	
});

$('button.restart-quiz').on('click', function(event) {
	event.preventDefault();
	renderPage(state, $('.pages'),'begin-quiz');
});

renderPage(state, $('.pages'), 'begin-quiz');






