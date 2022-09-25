const moreInfoCheck = document.querySelector("#gridCheck");
const moreInfoForm = document.querySelector(".more-info");
const taskContent = document.querySelector("#task-form");
const taskCategory = document.querySelector("#inputState");
const addBtn = document.querySelector(".add-task");
const ulList = document.querySelector(".task-list");
// let taskDate = document.querySelector('#task-date')
// const taskTime = document.querySelector('#hour')

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

let liItem;

const addTask = () => {
  validateForm();

  if (text === "") {
    liItem = document.createElement("li");
    liItem.style.backgroundColor = colorDict[taskCategory.value];
    liItem.classList.add("liElement");
    liItem.textContent = taskContent.value;
  }
};

const elementCalls = () => {
  addTask();

  createCategoryArea(liItem);
  createToolsArea(liItem);
  // additionalInfo(liItem);
  ulList.append(liItem);

  taskContent.value = "";
  taskCategory.value = notDefinedValue;
};

const createCategoryArea = (category) => {
  const categoryArea = document.createElement("div");
  categoryArea.classList.add("category");
  category.append(categoryArea);

  categoryArea.textContent = taskCategory.value;
};

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

  deleteIcon = document.createElement("button");
  deleteIcon.classList.add("delete");
  deleteIcon.innerHTML = '<i class="fa-solid fa-xmark icon fa-lg fa-fw"></i>';

  toolsPanel.append(confirmIcon, editIcon, deleteIcon);

  if (!moreInfoForm.classList.contains("hide")) {
    infoBtn = document.createElement("button");
    infoBtn.classList.add("more");
    infoBtn.innerHTML = '<i class="fa-solid fa-info  fa-lg fa-fw"></i>';
    toolsPanel.append(infoBtn);
  }
};

// const showMoreInfo = () => {
//   const dropdownList = document.createElement('div');
//   liItem.append(dropdownList);
//   dropdownList.textContent = moreInfoForm.value;
// }

moreInfoCheck.addEventListener("click", showMore);
addBtn.addEventListener("click", elementCalls);
// infoBtn.addEventListener('click', showMoreInfo);
// TODO: sprawdzić konwencje nazewnictwa id
