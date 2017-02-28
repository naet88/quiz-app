//step 1: state management


var config = {
	questions: [
		{
			question: 'Trump tweeted, "Robert Pattinson should not take back _________. She cheated on him like a dog & will do it again – just watch. He can do much better!” - Who is he talking about this time?',
			choices: ['Kristen Stewart', 'Selena Gomez', 'Harry Potter', 'Melissa McCarthy'],
			correct: 0,
		},
		{
			question: 'Trump tweeted, "All of the women on _________ flirted with me – consciously or unconsciously. That’s to be expected.” - What terrible show is he talking about?', 
			choices: ['The View', 'Jimmy Fallon', 'The Apprentice', 'Fox News'],
			correct: 2,
		}
	],
	answerComments: {
		questionCorrect: 'I know, unbelievable.',
		questionIncorrect: 'No worries, too many Trump issues to keep track of.',
	}, 
	pages: ['begin-quiz-page', 'question-page', 'answer-page', 'score-page'],

}

//state = should be the initial state of the app (at first)
//state is the 'memory' of the application, and it evolves as the app progresses.

var state = {
	question: 0,	
	page: 0,
}

//step 2: functions that modify the state (no jquery here)
//wait, how does the app "remembers" the state that it's on question 1 & page 1.  
function nextPage(state) {
	state.page = state.page + 1;
}

function nextQuestion(state) {
	state.question = state.question + 1;
}

// function nextAnswerChoices(state) {
// 	state.
// }

//step 3: Render in the DOM functions
//all render functions should end w/ this: element.html(itemsHTML);
// The HTML should reflect the state. 
//You should have a single function for each part of the page which you want to update. 

function renderPage(state, element, pageName) {
	$(element).find('.page').hide();
	$(element).find('.' + pageName +'-page').show();
};

function renderQuestion(state, element, questionIndex) {
	var currentQuestion = config.questions[questionIndex].question;
	console.log('currrent question is' + currentQuestion);
	$(element).find('h2.current-question').text(currentQuestion); 
};

function renderAnswerChoices(state, element, questionIndex) {
	var currentAnswerChoices = config.questions[questionIndex].choices;
	
	currentAnswerChoices.map(function(choice) {
		var output = '';
		output = '<li><input type="radio"/>' + choice + '</li>';
		//$('ul.answer-choices').append(output)
		$(element).append(output);
	});
};

function questionProgress(state, element, questionIndex) {
	var questionCounter = state.question+1;
	$(element).find('.question-progress').text('question ' + questionCounter + '/5'); 
}


function renderAnswerPage(state, element, questionIndex) {


}

//step 4: jquery event listeners. 

//begin quiz form submission 

$('form[name="begin-quiz"]').on('submit', function(event) {
	event.preventDefault();
	nextPage(state);
	renderPage(state, $('.pages'),'question');
	renderQuestion(state, $('.question-page'), 0);
	renderAnswerChoices(state, $('ul.answer-choices'), 0);
	questionProgress(state, $('.question-page'), 0);

});

$('form[name="submit-answer"]').on('submit', function(event) {
	event.preventDefault();
	renderPage(state, $('.pages'),'answer');
	// renderQuestion(state, $('.question-page'), state.question);
	// nextPage(state);
	// console.log(state);
});

$('button.next-question').on('click', function(event) {
	event.preventDefault();
	nextPage(state);
	nextQuestion(state);
	renderPage(state, $('.pages'),'question');
	renderQuestion(state, $('.question-page'), state.question);
	renderAnswerChoices(state, $('ul.answer-choices'), state.question);
	questionProgress(state, $('.question-page'), state.question);
	//use reset()
});



// $('form#question-form').on('submit', function(event) {
//    // console.log(event.currentTarget);
//    console.log(event.currentTarget); 
// });

renderPage(state, $('.pages'), 'begin-quiz');






