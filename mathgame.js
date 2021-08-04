const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")


let state = {
	score: 0,
	wrongAnswer: 0
}

function updateProblem(){
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem.numberOne}
     ${state.currentProblem.operator} 
     ${state.currentProblem.numberTwo}`
    ourField.value =""
    ourField.focus()
}
updateProblem()

function generateNumber (max){
	return Math.floor(Math.random()*(max + 1))
}
function generateProblem(){
	return {
		numberOne: generateNumber(10),
		numberTwo: generateNumber(10),
		operator: ['+', '-', 'x'][generateNumber(2)]
	}
}

ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(ev){
ev.preventDefault()

let correctAnswer
const pq = state.currentProblem
    if(pq.operator == "+") correctAnswer = pq.numberOne + pq.numberTwo
  	if(pq.operator == "-") correctAnswer = pq.numberOne - pq.numberTwo
		if(pq.operator == "x") correctAnswer = pq.numberOne * pq.numberTwo

    //if (true) {}
 
if (parseInt(ourField.value, 10)=== correctAnswer) {
state.score++
pointsNeeded.textContent = 10 - state.score
updateProblem()
     renderProgressBar()
} else {
    state.wrongAnswer++
    mistakesAllowed.textContent = 2 - state.wrongAnswer
    problemElement.classList.add("animate-wrong")
    setTimeout(() => problemElement.classList.remove("animate-wrong") ,600)
   }
   
   checkLogic()
}
  function checkLogic(){
      // if you won
      if (state.score === 10){
           endMessage.textContent = "Congrats! You Won"
           document.body.classList.add("overlay-is-open")
         setTimeout(() => resetButton.focus(), 331)
      }
      // if you lost
      if (state.wrongAnswer === 3){
           endMessage.textContent = "Sorry! You Lost"
           document.body.classList.add("overlay-is-open")
           setTimeout(() => resetButton.focus(), 331)
      }
  }
     resetButton.addEventListener("click", resetGame) 

     function resetGame(){
         document.body.classList.remove("overlay-is-open")
     	updateProblem()
     	state.score = 0
     	state.wrongAnswer = 0
     	pointsNeeded.textContent = 10
     	mistakesAllowed.textContent = 2
         renderProgressBar()
     }
  
     function renderProgressBar(){
        progressBar.style.transform = `scaleX(${state.score / 10})`
     }
     