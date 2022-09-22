const moreInfoCheck = document.querySelector('#gridCheck')
const moreInfoForm = document.querySelector('.more-info')
const taskContent = document.querySelector('#task-form')
const taskCategory = document.querySelector('#inputState')
const addBtn = document.querySelector('.add-task')
// const formError = document.getElementById('#form-alert')


const showMore = () => {
    moreInfoForm.classList.toggle('hide')
}

let text

const validateForm = () => {
    if (taskContent.value == '' && taskCategory.value == "Not defined"){
    text = "Please type the task and check the category!"
   } else if (taskContent.value !== '' && taskCategory.value == "Not defined"){
    text = "Please check the category!"
   } else if (taskContent.value == '' && taskCategory.value !== "Not defined"){
    text = "Please type the task!"
   } 
//    formError.innerHTML = text
   document.getElementById("form-alert").innerHTML = text
        
    }







moreInfoCheck.addEventListener('click',showMore)
addBtn.addEventListener('click',validateForm)

// TODO: sprawdzić konwencje nazewnictwa id
