const form = document.querySelector('form')
const para1 = document.querySelector('.para1')
const para2 = document.querySelector('.para2')
const para3 = document.querySelector('.para3')
const checkBox = document.querySelectorAll('.inputCheck')
const container2 = document.querySelector('.container2')

const gridBar = document.querySelectorAll('.gridBar')
const button1 = document.querySelector('.button')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    button1.style.display = 'none'

    const inputText = document.querySelectorAll('.inputText')

    para1.innerHTML = "Just a step away, keep going"
    para2.innerHTML = ""
    
    for(let i = 0; i < checkBox.length; i++){
        checkBox[i].style.display = 'inline'
        inputText[i].disabled = true
    }
    
})

let count = 0;

for(let i = 0; i < checkBox.length; i++){
    checkBox[i].addEventListener('change', () => {

        if(checkBox[i].checked === true) 
            checkBox[i].disabled = true
        

        let strikeInput = document.querySelectorAll('.inputText')
        strikeInput[i].style.color = '#48A300'
        strikeInput[i].style.textDecoration = 'line-through'

        gridBar[count].style.background = '#48A300'

        if(count < 2) gridBar[0].innerHTML = `${count + 1}/3 Completed`
        else if(count == 2) {
            gridBar[0].innerHTML  = ''
            gridBar[1].innerHTML = `All Task Completed`
            container2.style.display = 'block'
            form.style.display = 'none'
            para1.style.display = 'none'
            para2.style.display = 'none'
            para3.style.display = 'none'
        }
        count++

    })
}


const button2 = document.querySelector('.button2')
button2.addEventListener('click', () => {
    location.reload(true)
})