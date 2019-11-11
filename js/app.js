const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const containerElement = document.getElementById('main-container')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let correctMessage = document.getElementById('correct-message')
let questionNumber = document.getElementById('question-number')
let funFact = document.getElementById('fun-fact')
let results = document.getElementById('results')
let finalScore = document.getElementById('final-score')
let tally = 0

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  finalScore.classList.add('hide')
  startButton.classList.add('hide')
  containerElement.classList.remove('hide')
  finalScore.classList.remove('incorrect')
  finalScore.classList.remove('correct')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  results.innerText = ''
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  if (question.fact) {
    funFact.innerText = question.fact
  } else {
    funFact.innerText = ''
  }
  let questionNum = currentQuestionIndex + 1
  questionNumber.innerText = "Question number " + questionNum + "/" + questions.length
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  funFact.classList.add('hide')
  correctMessage.innerHTML = 'Choose Wisely'
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
  if (correct == 'true') {
    tally+=1
    console.log(tally + '/' + questions.length)
    correctMessage.classList.add('correct')
    correctMessage.innerHTML = ' Correct!'
    funFact.classList.remove('hide')
    disableAnswerButtons()
  } else {
    correctMessage.classList.add('incorrect')
    correctMessage.innerHTML = 'Incorrect'
    funFact.classList.remove('hide')
    disableAnswerButtons()
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    finalScore.classList.remove('hide')
    score = Math.floor(tally/questions.length * 100)
    if (score <= 20) {
      results.innerText = "\rWow... pretty awful. You definately need more practice. \r\r You got " + tally + ' out of ' + questions.length + ' questions correct for a final score of'
      finalScore.innerText = score + '%'
      finalScore.classList.add('incorrect')
    } else if (score <= 50 && score > 20) {
      results.innerText = "\rNot good... You should practice more. \r\r You got " + tally + ' out of ' + questions.length + ' questions correct for a final score of'
      finalScore.innerText = score + '%'
      finalScore.classList.add('incorrect')
    } else if (score <= 70 && score > 50) {
      results.innerText = "\rNot good... You should practice more. \r\r You got " + tally + ' out of ' + questions.length + ' questions correct for a final score of'
      finalScore.innerText = score + '%'
      finalScore.classList.add('incorrect')
    } else if (score <= 90 && score > 70) {
      results.innerText = "\rNot bad! \r\r You got " + tally + ' out of ' + questions.length + ' questions correct for a final score of'
      finalScore.innerText = score + '%'
      finalScore.classList.add('correct')
    } else {
      results.innerText = "\rAwesome! You might be ready for the test! \r\r You got " + tally + ' out of ' + questions.length + ' questions correct for a final score of'
      finalScore.innerText = score + '%'
      finalScore.classList.add('correct')
    }
    tally = 0
  }
}

function disableAnswerButtons() {
  Array.from(answerButtonsElement.children).forEach(button => {
    button.classList.add('disable')
    button.removeEventListener('click', selectAnswer)
  })
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  correctMessage.classList.remove('correct')
  correctMessage.classList.remove('incorrect')
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'A situation in which an application writes to an area of memory that it is not supposed to access is referred to as:',
    answers: [
      { text: 'DLL Injection', correct: false },
      { text: 'Buffer Overflow', correct: true },
      { text: 'Memory Leak', correct: false },
      { text: 'Integer Overflow', correct: false }
    ]
  },
  {
    question: 'Which of the terms listed below describes a programming error where an application tries to store a numeric value in a variable that is too small to hold it?',
    answers: [
      { text: 'Buffer Overflow', correct: false },
      { text: 'Pointer dereference', correct: false },
      { text: 'Integer Overflow', correct: true },
      { text: 'Memory Leak', correct: false }
    ]
  },
  {
    question: "A situation in which an application fails to properly release memory allocated to it or continually requests more memory than it needs is called:",
    answers: [
      { text: 'Buffer Overflow', correct: false },
      { text: 'Memory Leak', correct: true },
      { text: 'DLL Injection', correct: false },
      { text: 'Pointer deference', correct: false }
    ]
  },
  {
    question: "The purpose of a downgrade attack is to make a computer system fall back to a weaker security mode which makes the system more vulnerable to attacks.",
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: "A collection of precompiled functions designed to be used by more than one Microsoft Windows application simultaneously to save system resources is known as:",
    answers: [
      { text: 'ISO', correct: false },
      { text: 'EXE', correct: false },
      { text: 'DLL', correct: true },
      { text: 'INI', correct: false }
    ]
  },
  {
    question: "Which of the following terms describes an attempt to read a variable that stores a null value?",
    answers: [
      { text: 'Integer Overflow', correct: false },
      { text: 'Pointer deference', correct: true },
      { text: 'Buffer Overflow', correct: false },
      { text: 'SQL Injection', correct: false }
    ]
  },
  {
    question: "A predefined username/password on a brand new wireless router is an example of:",
    answers: [
      { text: 'Misconfiguration', correct: false },
      { text: 'Zero-day Vulnerability', correct: false },
      { text: 'Default Configuration', correct: true },
      { text: 'Architecture/design Weakness', correct: false }
    ]
  },
  {
    question: "A situation in which a web form field accepts data other than expected (e.g. server commands) is an example of:",
    answers: [
      { text: 'Zero-day vulnerability', correct: false },
      { text: 'Improper input validation', correct: true },
      { text: 'Improper error handling', correct: false },
      { text: 'Default configuration', correct: false }
    ]
  },
  {
    question: "Which of the terms listed below describes a type of attack that relies on executing a library of code?",
    answers: [
      { text: 'Zero-day vulnerability', correct: false },
      { text: 'Buffer overflow', correct: false },
      { text: 'DLL injection', correct: true },
      { text: 'Default configuration', correct: false }
    ]
  },
  {
    question: "Which of the terms listed below describes a type of attack that relies on executing a library of code?",
    answers: [
      { text: 'Zero-day vulnerability', correct: false },
      { text: 'Buffer overflow', correct: false },
      { text: 'DLL injection', correct: true },
      { text: 'Default configuration', correct: false }
    ]
  },
  {
    question: 'In IT, the term "System sprawl" is used to describe one of the aspects of poor asset management process.',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: "An e-commerce store app running on an unpatched web server is an example of:",
    answers: [
      { text: 'Risk acceptance', correct: false },
      { text: 'Security through obscurity', correct: false },
      { text: 'Vulnerable business process', correct: true },
      { text: 'Architecture/design weakness', correct: false }
    ]
  },
  {
    question: "What is the best countermeasure against social engineering?",
    answers: [
      { text: 'AAA protocols', correct: false },
      { text: 'Multi-factor Authentication', correct: false },
      { text: 'User education', correct: true },
      { text: 'User authentication', correct: false }
    ]
  },
  {
    question: "Which describes the result of a successful DoS attack?",
    answers: [
      { text: 'Code injection', correct: false },
      { text: 'Privilege escalation', correct: false },
      { text: 'Identity theft', correct: false },
      { text: 'Resource exhaustion', correct: true }
    ]
  },
  {
    question: "A vulnerability that is present in already released software but unknown to the software developer is called:",
    answers: [
      { text: 'DLL injection', correct: false },
      { text: 'Patched software', correct: false },
      { text: 'DoS', correct: false },
      { text: 'Zero-day vulnerability', correct: true }
    ]
  },
  {
    question: "After feeding an input form field with incorrect data, a hacker gets access to debugger info providing extensive description of the error. This situation is an example of:",
    answers: [
      { text: 'Improper input handling', correct: false },
      { text: 'Fuzz testing', correct: false },
      { text: 'Improper error handling', correct: true },
      { text: 'Brute-force attack', correct: false }
    ]
  },
  {
    question: "A malfunction in preprogrammed sequential access to a shared resource is described as:",
    fact: '',
    answers: [
      { text: 'Race condition', correct: true },
      { text: 'Pointer deference', correct: false },
      { text: 'Improper error handling', correct: false },
      { text: 'Memory leak', correct: false }
    ]
  }
]
