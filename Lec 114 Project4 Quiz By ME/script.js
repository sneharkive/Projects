let rightCount = 0
let ansGive
let QuestionAttend = 0

const startNow = document.querySelector('.startNow')
const startPage = document.querySelector('.startPage')
const heightScore = document.querySelector('.heightScore')

const quizPages = document.querySelector('.quizPages')
const QuizContainer = document.querySelectorAll('.QuizContainer')
const nextSpan = document.querySelectorAll('.nextSpan')
const queCountSpan = document.querySelectorAll('.queCountSpan')
const error = document.querySelector('.error')
const score = document.querySelector('.score')

const progressValue = document.querySelector('.progress-value')

const answerContainer = document.querySelectorAll('.answerContainer')

const audioNormal = document.querySelector('.audioNormal')
const audioWrong = document.querySelector('.audioWrong')
const audioCorrect = document.querySelector('.audioCorrect')
const volumeUp = document.querySelector('.volumeUp')
const volumeMute = document.querySelector('.volumeMute')
audioNormal.volume = 0.2

volumeUp.addEventListener('click', () => {
    audioNormal.volume = 0
    audioWrong.volume = 0
    audioCorrect.volume = 0

    volumeMute.classList.add('show-mute')
    volumeUp.classList.add('close-up')
    
})
volumeMute.addEventListener('click', () => {
    audioNormal.volume = 0.2
    audioWrong.volume = 1
    audioCorrect.volume = 1

    volumeMute.classList.remove('show-mute')
    volumeUp.classList.remove('close-up')
    
})

let yellow = 0
let red = 0

function removeBgColor(){
    if(yellow == 1) {
        quizPages.classList.remove('yellow-quizPage')
        yellow = 0

    }
    if(red == 1) {
        quizPages.classList.remove('red-quizPage')
        red = 0
    }
}

let timer

function checkAns(timeIndex) {
    const showAnswerContainer = document.querySelector('.show-answerContainer')
    const answer = showAnswerContainer.querySelectorAll('.answer')
    const timeSpan = document.querySelectorAll('.timeSpan')
    

    let rightAns
    for(let i = 0; i < answer.length; i++){
        if(answer[i].id) rightAns = i
    }
    let check = 0 
    let startTime = 12
    let sec = 12

    timer = setInterval(() => {

        timeSpan[timeIndex].innerHTML = `00:${sec}`
        if(check == 0)sec--
        if(sec == startTime / 2) {
            quizPages.classList.add('yellow-quizPage')
            yellow = 1
        }
        if(sec == startTime / 4) {
            quizPages.classList.add('red-quizPage')
            red = 1
        }
        if (sec < 10) timeSpan[timeIndex].innerHTML = `00:0${sec}`
        if(sec == 0) {
            clearInterval(timer)
            ansGive = true
            check++
            audioWrong.play()

            QuestionAttend++
            answer[rightAns].classList.add('green-border')
            myData.questionIndex = QuestionAttend
            myData.rightCountLocal = rightCount
            localStorage.setItem('myData', JSON.stringify(myData))
        }
   }, 1000)


for(let j = 0; j < answer.length; j++){
    answer[j].addEventListener('click', () => {
        ansGive = true
        const wrongCheckImg = answer[j].querySelector('.wrongCheckImg')
        const correctCheckImg = answer[rightAns].querySelector('.correctCheckImg')
        if(errorCount = 1){
            error.classList.remove('show-error')
            errorCount = 0
        }
        if(answer[j].id && check === 0) {
            correctCheckImg.classList.add('show-correctCheckImg')
            audioCorrect.play()
            answer[j].classList.add('green-border')
            clearInterval(timer)
            rightCount++
            check++
            ansGive = true
            QuestionAttend++
        }
        else if(!answer[j].id && check === 0) {
            wrongCheckImg.classList.add('show-wrongCheckImg')
            correctCheckImg.classList.add('show-correctCheckImg')
            audioWrong.play()
            answer[rightAns].classList.add('green-border')
            answer[j].classList.add('red-border')
            clearInterval(timer)
            check++
            ansGive = true
            QuestionAttend++
        }

        myData.questionIndex = QuestionAttend
        myData.rightCountLocal = rightCount
        localStorage.setItem('myData', JSON.stringify(myData))

})
}
}


const myData = JSON.parse(localStorage.getItem('myData')) || {}
function checkQuestionIndex(){
    if(myData.questionIndex) QuestionAttend = myData.questionIndex
    if(myData.rightCountLocal)  rightCount = myData.rightCountLocal


    if(QuizContainer.length == myData.questionIndex) {
        myData.questionIndex = 0
        myData.rightCountLocal = 0
        QuestionAttend = 0
        rightCount = 0
    }
    else if(myData.questionIndex > QuizContainer.length || myData.questionIndex == undefined) {
        myData.questionIndex = 0
        myData.rightCountLocal = 0
        rightCount = 0
        QuestionAttend = 0
    }

}

startNow.addEventListener('click', () => {
    startPage.classList.add('close-startPage')
    quizPages.classList.add('show-quizPages')
    audioNormal.play()
    audioNormal.loop = true
    

    checkQuestionIndex()

    QuizContainer[parseInt(myData.questionIndex)].classList.add('show-QuizContainer')
    queCountSpan[parseInt(myData.questionIndex)].innerHTML = `${parseInt(myData.questionIndex) + 1}/${QuizContainer.length}`

    answerContainer[parseInt(myData.questionIndex)].classList.add('show-answerContainer')
    checkAns(parseInt(myData.questionIndex))
})

let errorCount = 0

checkQuestionIndex()

for(let i = myData.questionIndex; i < nextSpan.length; i++){
    nextSpan[i].addEventListener('click', () => {
        if(ansGive){
            clearInterval(timer)
            removeBgColor()
            if(QuizContainer[i].classList.contains("show-QuizContainer"))
                QuizContainer[i].classList.remove('show-QuizContainer')
            QuizContainer[i+1].classList.add('show-QuizContainer')
            queCountSpan[i+1].innerHTML = `${i+2}/${QuizContainer.length}`
            if(answerContainer[i].classList.contains("show-answerContainer"))
                answerContainer[i].classList.remove('show-answerContainer')
            answerContainer[i+1].classList.add('show-answerContainer')
            checkAns(i+1)

            }
            else {
                error.classList.add('show-error')
                errorCount = 1
            }
            ansGive = false
        })
}

const allQuotes = [
    'There is lot more to improve.',
    'You can do better. ',
    'Good, Keep Learning',
    'Very Good, You did great.',
    'Excellent!! You are amazing.'
]

const resultPage = document.querySelector('.resultPage')
const ansCount = document.querySelector('.ansCount')
const firstPercent = document.querySelector('.firstPercent')
const secondPercent = document.querySelector('.secondPercent')
const quotesResult = document.querySelector('.quotesResult')

score.addEventListener('click', () => {
    checkAns(QuizContainer.length)
    if(ansGive){
        clearInterval(timer)

        resultPage.classList.add('show-resultPage')
        quizPages.classList.remove('show-quizPages')
        progressValue.style.width = `${rightCount / QuizContainer.length * 100}%`
        ansCount.innerHTML = `${rightCount}/${QuizContainer.length}`
        const firstNum = Math.round(rightCount / QuizContainer.length * 100)
        if(firstNum != 0 )firstPercent.innerHTML = `${firstNum}%`
        if(firstNum != 100) secondPercent.innerHTML = `${100 - firstNum}%`
        if(firstNum == 0) {
            secondPercent.innerHTML = `${firstNum}%`
            quotesResult.innerHTML = `${allQuotes[0]}`
        }
        else if(firstNum < 50) quotesResult.innerHTML = `${allQuotes[1]}`
        else if(firstNum > 50 && firstNum < 70) quotesResult.innerHTML = `${allQuotes[2]}`
        else if(firstNum > 70 && firstNum < 90) quotesResult.innerHTML = `${allQuotes[3]}`
        else if(firstNum > 90) quotesResult.innerHTML = `${allQuotes[4]}`

        myScore.scoreNow = myData.rightCountLocal
        if(myScore.HighestScore)
            myScore.HighestScore = Math.max(parseInt(myScore.HighestScore), parseInt(myData.rightCountLocal))
        else myScore.HighestScore = myData.rightCountLocal

        localStorage.setItem('myScore', JSON.stringify(myScore))
    }
    else {
        error.classList.add('show-error')
        errorCount = 1
    }
    ansGive = false
})


const myScore = JSON.parse(localStorage.getItem('myScore')) || {}

if(myScore.HighestScore)heightScore.innerHTML = `Highest Score : ${parseInt(myScore.HighestScore)}/${QuizContainer.length}`

const retryButton = document.querySelector('.retryButton')
retryButton.addEventListener('click', () => {
    location.reload()
    localStorage.removeItem('myData')
})

const clearLocal = document.querySelector('.clearLocal')
clearLocal.addEventListener('click', () => {
    localStorage.clear()
    heightScore.innerHTML = ``
    location.reload()
})

