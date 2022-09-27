const moreInfoCheck = document.querySelector("#gridCheck");
const moreInfoForm = document.querySelector(".more-info");
const taskContent = document.querySelector("#task-form");
const taskCategory = document.querySelector("#inputState");
const addBtn = document.querySelector(".add-task");
const ulList = document.querySelector(".task-list");
const taskDate = document.querySelector("#task-date");
const taskTime = document.querySelector("#hour");
const extraMsg = document.querySelector("#extra-message");
const popupEl = document.querySelector(".popup");
const popupInfo = document.querySelector(".popup-info");
const popupInput = document.querySelector(".popup-input");
const acceptBtn = document.querySelector(".accept");
const cancelBtn = document.querySelector(".cancel");

const notDefinedValue = "Not defined";
let text;
let liItem;
let confirmBtn;
let editBtn;
let deleteBtn;
let infoBtn;
let dropdownList;
let liCount;

const colorDict = {
  Entertainment: "rgb(133, 130, 179)",
  Health: "rgb(212, 190, 200)",
  "Household duties": "rgb(178, 200, 214)",
  "Physical activity": "rgb(190, 196, 252)",
  Other: "rgb(158, 182, 230)",
};

const showMore = () => {
  moreInfoForm.classList.toggle("hide");
};

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

let counter = -1;

const addTask = () => {
  validateForm();

  if (text === "") {
    liItem = document.createElement("li");
    liItem.style.backgroundColor = colorDict[taskCategory.value];
    liItem.classList.add("liElement");
    liItem.textContent = taskContent.value;

    counter++;
    liItem.setAttribute("id", counter);
  }

  if (!moreInfoForm.classList.contains("hide")) {
    addMoreInfoArea();
  }

  createCategoryArea();
  createToolsArea();
  ulList.append(liItem);

  taskContent.value = "";
  taskCategory.value = notDefinedValue;
};

const createCategoryArea = () => {
  const categoryArea = document.createElement("div");
  categoryArea.classList.add("category");
  liItem.append(categoryArea);

  categoryArea.textContent = taskCategory.value;
};

const createToolsArea = () => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  liItem.append(toolsPanel);

  confirmBtn = document.createElement("button");
  confirmBtn.classList.add("confirm");
  confirmBtn.innerHTML = '<i class="fa-solid fa-check icon fa-lg fa-fw"></i>';
  confirmBtn.setAttribute("id", counter);
  confirmBtn.addEventListener("click", taskDone)

  editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerHTML =
    '<i class="fa-solid fa-pen-to-square icon fa-lg fa-fw"></i>';
  editBtn.setAttribute("id", counter);

  deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark icon fa-lg fa-fw"></i>';
  deleteBtn.setAttribute("id", counter);
  deleteBtn.addEventListener("click", removeTask);

  toolsPanel.append(confirmBtn, editBtn, deleteBtn);

  if (!moreInfoForm.classList.contains("hide")) {
    infoBtn = document.createElement("button");
    infoBtn.classList.add("more");
    infoBtn.innerHTML = '<i class="fa-solid fa-info  fa-lg fa-fw"></i>';
    infoBtn.addEventListener("click", showMoreInfo);
    toolsPanel.append(infoBtn);
  }
};

const addMoreInfoArea = () => {
  dropdownList = document.createElement("div");
  dropdownList.classList.add("details");
  dropdownList.classList.add("hide");
  liItem.append(dropdownList);
  const dropdownListDate = document.createElement("p");
  dropdownListDate.textContent = "Task Date: " + taskDate.value;
  const dropdownListTime = document.createElement("p");
  dropdownListTime.textContent = "Task Time: " + taskTime.value;
  const dropdownListMsg = document.createElement("p");
  dropdownListMsg.textContent = "Additional info: " + extraMsg.value;
  dropdownList.append(dropdownListDate, dropdownListTime, dropdownListMsg);
};

const showMoreInfo = () => {
  dropdownList.classList.toggle("hide");
};

const taskDone = (e) => {
const liLine = e.target.closest('li')
liLine.classList.add("completed");
};

const removeTask = (e) => {
  e.target.closest('li').remove()
}

// const editTask = (e) => {
//   console.log(e.target.closest('li'))
// }
// }

const editWindowOpen = () => {
  popupEl.style.display = 'flex'
}

const editWindowClose = () => {
  popupEl.style.display = 'none'
}

editWindowOpen()


// ulList.addEventListener('click', editTask)

moreInfoCheck.addEventListener("click", showMore);
addBtn.addEventListener("click", addTask);

// TODO: sprawdzić konwencje nazewnictwa id

// document.getElementById('task-date') = new Date().toLocaleDateString()
