//step 1: state management

var state = {
	questions: [
		{
			question: 'Trump tweeted, "Robert Pattinson should not take back _________. 
			She cheated on him like a dog & will do it again – just watch. He can do much better!” - Who is he talking about 
			this time?',
			choices: ['Kristen Stewart', 'Selena Gomez', 'Harry Potter', 'Melissa McCarthy'],
			correct: 'Kristen Stewart',
		},
		{
			question: 'Trump tweeted, "All of the women on _________ flirted with me – consciously or unconsciously. 
			That’s to be expected.” - What terrible show is he talking about?', 
			choices: ['The View', 'some rando Mexican show', 'The Apprentice', 'Fox News'],
			correct: 'The Apprentice',
		}
	],
}

//step 2: state modification functions (no jquery here)

//step 3: Render in the DOM functions 

function renderQuestions(state, element, index) {
	var displayQuestion = state.questions[index].question
}



//step 4: jquery event listeners. 

//begin quiz form submission 

// $('form').on('submit', function(event) {
// 	event.preventDefault();

// })






