const moreInfoCheck = document.querySelector("#gridCheck");
const moreInfoForm = document.querySelector(".more-info");
const taskContent = document.querySelector("#task-form");
const taskCategory = document.querySelector("#inputState");
const addBtn = document.querySelector(".add-task");
const ulList = document.querySelector(".task-list");
// let taskDate = document.querySelector('#task-date')
// const taskTime = document.querySelector('#hour')

const showMore = () => {
  moreInfoForm.classList.toggle("hide");
};

let text;
const notDefinedValue = "Not defined";
// document.getElementById('task-date') = new Date().toLocaleDateString()

const validateForm = () => {
  text = "";
  if (taskContent.value == "" && taskCategory.value == notDefinedValue) {
    text = "Please type the task and check the category!";
  } else if (taskCategory.value == notDefinedValue) {
    text = "Please check the category!";
  } else if (taskContent.value == "") {
    text = "Please type the task!";
  }

  document.getElementById("form-alert").innerHTML = text;
};

const addTask = () => {
  validateForm();

  if (text === "") {
    const liItem = document.createElement("li");
    liItem.classList.add("liElement");
    liItem.textContent = taskContent.value;
    createToolsArea(liItem);
    ulList.append(liItem);
  }

  taskContent.value = "";
  taskCategory.value = notDefinedValue;
};

// const additionalInfo = () => {
//   if(moreInfoForm.classList.contains('hide')){
//     return
//   } else {
//     taskDate.value = new Date().toLocaleDateString()
//   }

// }

const createToolsArea = (tools) => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  tools.append(toolsPanel);

  const confirmIcon = document.createElement("button");
  confirmIcon.classList.add("confirm");
  confirmIcon.innerHTML = '<i class="fa-solid fa-check icon fa-lg fa-fw"></i>';

  const editIcon = document.createElement("button");
  editIcon.classList.add("edit");
  editIcon.innerHTML =
    '<i class="fa-solid fa-pen-to-square icon fa-lg fa-fw"></i>';

  const deleteIcon = document.createElement("button");
  deleteIcon.classList.add("delete");
  deleteIcon.innerHTML = '<i class="fa-solid fa-xmark icon fa-lg fa-fw"></i>';

  toolsPanel.append(confirmIcon, editIcon, deleteIcon);
};

moreInfoCheck.addEventListener("click", showMore);
addBtn.addEventListener("click", addTask);

// TODO: sprawdzić konwencje nazewnictwa id
