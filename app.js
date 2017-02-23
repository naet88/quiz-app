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
			choices: ['The View', 'some rando Mexican show', 'The Apprentice', 'Fox News'],
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

//step 3: Render in the DOM functions
//all render functions should end w/ this: element.html(itemsHTML);
// The HTML should reflect the state. 
//You should have a single function for each part of the page which you want to update. 

//initially I had (state, element) <--not sure why I did this. 
function renderPage(state, pageName) {
	$('.page').hide();
	$('.' + pageName +'-page').show();
}

var questionIndex = 0
function renderQuestions(state) {
	var currentQuestion = config.questions[questionIndex].question;
	$('h2.current-question').text(currentQuestion); 
}

// function renderAnswerChoices(state) {

// }
// var renderList = function(state, element) {
//     var itemsHTML = state.items.map(function(item) {
//         return '<li>' + item + '</li>';
//     });
//     element.html(itemsHTML);
// };

//step 4: jquery event listeners. 

//begin quiz form submission 

$('form[name="begin-quiz"]').on('submit', function(event) {
	event.preventDefault();
	nextPage(state);
	renderPage(state, 'question');
	renderQuestions(state);
})

$('form[name="submit-answer"]').on('submit', function(event) {
	event.preventDefault();
	// nextPage(state);
	// renderQuestionPage(state);
	// renderQuestions(state);
})

renderPage(state, 'begin-quiz');






