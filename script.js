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
const editDate = document.querySelector("#edit-date");
const editHour = document.querySelector("#edit-hour");
const editMsg = document.querySelector("#edit-message");
const editInfoArea = document.querySelector(".edit-info");

// taskDate.value = new Date().toLocaleDateString();

const notDefinedValue = "Not defined";
const taskDateLabel = "Task Date: ";
const taskTimeLabel = "Task Time: ";
const extraMgsLabel = "Additional info: ";
let text;
let liItem;
let confirmBtn;
let editBtn;
let deleteBtn;
let infoBtn;
let dropdownList;
let liCount;
let editedContent;
let taskDateValue;
let taskTimeValue;
let extraMsgValue;
let counter = -1;
let dropdownListDate;
let dropdownListTime;
let dropdownListMsg;

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

const addTask = () => {
  validateForm();

  if (text === "") {
    liItem = document.createElement("li");
    liItem.style.backgroundColor = colorDict[taskCategory.value];
    liItem.classList.add("liElement");
    liItem.textContent = taskContent.value;

    counter++;
    liItem.setAttribute("id", counter);

    if (!moreInfoForm.classList.contains("hide")) {
      addMoreInfoArea();
    }

    createCategoryArea();
    createToolsArea();
    ulList.append(liItem);
  }

  cleanForm();
};

const cleanForm = () => {
  if (!moreInfoForm.classList.contains("hide")) {
    moreInfoCheck.checked = false;
    showMore();
  }
  taskDateValue = "";
  taskTimeValue = "";
  extraMsgValue = "";
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
  confirmBtn.addEventListener("click", taskDone);

  editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerHTML =
    '<i class="fa-solid fa-pen-to-square icon fa-lg fa-fw"></i>';
  editBtn.setAttribute("id", counter);
  editBtn.addEventListener("click", editTask);

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

  dropdownListDate = document.createElement("p");
  dropdownListDate.classList.add("date");
  dropdownListDate.textContent = taskDateLabel + taskDate.value;

  dropdownListTime = document.createElement("p");
  dropdownListTime.classList.add("time");

  dropdownListTime.textContent = taskTimeLabel + taskTime.value;
  dropdownListMsg = document.createElement("p");
  dropdownListMsg.classList.add("message");

  dropdownListMsg.textContent = extraMgsLabel + extraMsg.value;
  dropdownList.append(dropdownListDate, dropdownListTime, dropdownListMsg);
};

const showMoreInfo = (e) => {
  const shownLi = e.target.closest("li");

  console.log(shownLi.getElementsByClassName("details")[0]);
  const details = shownLi.getElementsByClassName("details")[0];
  details.classList.toggle("hide");
};

const taskDone = (e) => {
  const liLine = e.target.closest("li");
  liLine.classList.add("completed");
};

const removeTask = (e) => {
  e.target.closest("li").remove();
};

const editWindowOpen = () => {
  popupEl.style.display = "flex";
};

const editWindowClose = () => {
  popupEl.style.display = "none";
};

const editTask = (e) => {
  editedContent = e.target.closest("li");
  editWindowOpen();

  popupInput.value = editedContent.firstChild.textContent;
  if (!editedContent.getElementsByClassName("details")[0]) {
    editInfoArea.style.display = "none";
  } else {
    const editedDateText =
      editedContent.getElementsByClassName("date")[0].textContent;
    editDate.value = editedDateText.replace("Task Date: ", "");

    const editedTimeText =
      editedContent.getElementsByClassName("time")[0].textContent;
    editHour.value = editedTimeText.replace("Task Time: ", "");

    const editedMsgText =
      editedContent.getElementsByClassName("message")[0].textContent;
    editMsg.value = editedMsgText.replace("Additional info: ", "");

    editInfoArea.style.display = "inline";
  }
};

const acceptTask = () => {
  console.log(editedContent);
  editedContent.firstChild.textContent = popupInput.value;

  dropdownListDate.textContent = taskDateLabel + editDate.value;
  dropdownListTime.textContent = taskTimeLabel + editHour.value;
  dropdownListMsg.textContent = extraMgsLabel + editMsg.value;

  editWindowClose();
  popupInfo.textContent = "";
  popupInput.value = "";
};

moreInfoCheck.addEventListener("click", showMore);
addBtn.addEventListener("click", addTask);
cancelBtn.addEventListener("click", editWindowClose);
acceptBtn.addEventListener("click", acceptTask);

// TODO: sprawdzić konwencje nazewnictwa id
