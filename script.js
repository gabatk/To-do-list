const moreInfoCheck = document.querySelector("#gridCheck");
const moreInfoForm = document.querySelector(".more-info");
const taskContent = document.querySelector("#task-form");
const taskCategory = document.querySelector("#inputState");
const addBtn = document.querySelector(".add-task");
const ulList = document.querySelector(".task-list");

const showMore = () => {
  moreInfoForm.classList.toggle("hide");
};

let text

const validateForm = () => {
    text = "";
  if (taskContent.value == "" && taskCategory.value == "Not defined") {
    text = "Please type the task and check the category!";
  } else if (taskCategory.value == "Not defined") {
    text = "Please check the category!";
  } else if (taskContent.value == "") {
    text = "Please type the task!";
  }

  document.getElementById("form-alert").innerHTML = text;

};

const addTask = () => {
  validateForm();

  if(text==="") {
  const liItem = document.createElement("li");
  liItem.textContent = taskContent.value;
  ulList.append(liItem);
};
}

moreInfoCheck.addEventListener("click", showMore);
addBtn.addEventListener("click", addTask);

// TODO: sprawdzić konwencje nazewnictwa id
