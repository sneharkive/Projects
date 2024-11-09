const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')
const lastQuote = document.querySelector('.quote')


const allQuotes = [
  'Raise the bar by completing your goals!', 
  'Well begun is half done!', 
  'Just a step away, keep going!', 
  'Whoa! You just completed all the goals, time to chill :D'
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}



/*
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
  first: {
    task: '',
    completed: false,
  },
  second: {
    task: '',
    completed: false,
  },
  third: {
    task: '',
    completed: false,
  }
}
*/


let completedGoalsCount = Object.values(allGoals).filter((goals) => goals.completed).length
progressValue.style.width = `${completedGoalsCount / inputFields.length * 100}%`
progressValue.firstElementChild.innerHTML = `${completedGoalsCount}/ ${inputFields.length} completed`

progressLabel.innerHTML = allQuotes[completedGoalsCount]

if(completedGoalsCount > 0) lastQuote.innerHTML = 'Just a step away, keep going'
else lastQuote.innerHTML = 'Move one step ahead, today!'


checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value
    })

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle('completed')

      const inputID = checkbox.nextElementSibling.id
      allGoals[inputID].completed = !allGoals[inputID].completed 
      completedGoalsCount = Object.values(allGoals).filter((goals) => goals.completed).length
      progressValue.style.width = `${completedGoalsCount / inputFields.length * 100}%`
      progressValue.firstElementChild.innerHTML = `${completedGoalsCount}/ ${inputFields.length} completed`      
      localStorage.setItem('allGoals', JSON.stringify(allGoals))
      progressLabel.innerHTML = allQuotes[completedGoalsCount]
      if(completedGoalsCount > 0) lastQuote.innerHTML = 'Just a step away, keep going'
      else lastQuote.innerHTML = 'Move one step ahead, today!'
    } 
    else {
        progressBar.classList.add('show-error')
    }
  })
})



inputFields.forEach((input) => {
  
  if(allGoals[input.id]) {
    input.value = allGoals[input.id].task

    if(allGoals[input.id].completed) 
        input.parentElement.classList.add('completed')

  }

  input.addEventListener('focus', () => {
    progressBar.classList.remove('show-error')
})

input.addEventListener('input', (e) => {
  if(allGoals[input.id] && allGoals[input.id].completed) {
    input.value = allGoals[input.id].task
    return
  }
  if(allGoals[input.id])
    allGoals[input.id].task = input.value
  else {
    allGoals[input.id] = {
      name: input.value,
      completed: false,
    }
  }
  localStorage.setItem('allGoals', JSON.stringify(allGoals))
})



/*
  input.value = allGoals[input.id].task

  if(allGoals[input.id].completed) input.parentElement.classList.add('completed')
  

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
      if(allGoals[input.id].completed) {
        input.value = allGoals[input.id].task
        return
      }

      allGoals[input.id].task = input.value

      localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })*/
})


const addGoals =document.querySelector('.addGoals')
const restart =document.querySelector('.restart')

restart.addEventListener('click', () => {
  localStorage.clear()
})

addGoals.addEventListener('click' , () => {
  
})