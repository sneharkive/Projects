const nameElement = document.querySelector('.name-tag')
const nameInput = document.querySelector('.name')
const ageElement = document.querySelector('.age-tag')
const ageInput = document.querySelector('.age')

/* //not a good approach
// nameElement.innerText = localStorage.myName

nameInput.addEventListener('input', (e) => {
    localStorage.myName = e.target.value
    nameElement.innerText = localStorage.myName
})
*/

/*
//better approach

// nameElement.innerText = localStorage.getItem('myName')

nameInput.addEventListener('input', (e) => {
    localStorage.setItem('myName', e.target.value)
    nameElement.innerText = localStorage.getItem('myName')

})
ageInput.addEventListener('input', (e) => {
    localStorage.setItem('myAge', e.target.value)
    ageElement.innerText = localStorage.getItem('myAge')
})
*/



const myData = JSON.parse(localStorage.getItem('myData')) || {}

if(myData.myName) nameElement.innerText = myData.myName
if(myData.myAge)  ageElement.innerText = myData.myAge


//to convert object to string => JSON.stringFy(myData)
//here we get JSON string
//we can convert this string to object again => JSON.parse(string u want to convert)

nameInput.addEventListener('input', (e) => {
    myData.myName = e.target.value
    localStorage.setItem('myData', JSON.stringify(myData))
    nameElement.innerText = e.target.value
})
ageInput.addEventListener('input', (e) => {
    myData.myAge = e.target.value
    localStorage.setItem('myData', JSON.stringify(myData))
    ageElement.innerText = e.target.value
})



//to clear all localStorage data

const button1 = document.querySelector('button')
button1.addEventListener('click' , () => {
    localStorage.clear()
})


//to delete one specific item

// localStorage.removeItem('myData')