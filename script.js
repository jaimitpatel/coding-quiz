const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
let shuffledQuestions, currentQuestionIndex
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex ++
    setNextQuestion()
})

function updateTimerText(ms) {
    if (ms === -1) {
      timer.innerText = '';
    }
    else if (ms > 0) {
      timer.innerText = 'Time Remaining: ' + (ms / 1000.0).toFixed(1) + ' seconds';
    }
    else {
      timer.innerText = "Time's up!"
    }
  }
  
  function updateTimer() {
    decrementTimer(100);
    updateTimerText(timerValue)
  }
  
  function startTimer() {
    timerValue = timeLimit;
    updateTimerText(timerValue)
    timerId = setInterval(updateTimer, 100);
  }

function startQuiz() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button =document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
        
    };

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }
    else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')


    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    { 
        question: "Arrays in JavaScript can be used to store ", 
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays" , correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true }
        ]
    },
    { 
        question: "the condition in an if / else statement is enclosed with", 
        answers: [
            { text: "quotes", correct: false },
            { text: "curly brackets", correct: false },
            { text: "paranthesis", correct: true },
            { text: "square brackets", correct: false }
        ]
    },
    { 
        question: "commonly used data types DO Not Include:", 
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false }
        ]
    },
    { 
        question: "string values must be enclosed within _____ when being assigned to variables.", 
        answers: [
            { text: "quotes", correct: true },
            { text: "curly brackets", correct: false },
            { text: "commas", correct: false },
            { text: "parenthesis", correct: false }
        ]
    },
    { 
        question: " A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log", correct: true }
        ]
    },
]