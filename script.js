const moreInfoCheck = document.querySelector("#grid-check");
const moreInfoForm = document.querySelector(".more-info");
const taskContent = document.querySelector("#task-form");
const taskCategory = document.querySelector("#input-state");
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
const emptyTodos = document.querySelector(".empty-info");

const notDefinedValue = "Not defined";
const taskDateLabel = "Task Date: ";
const taskTimeLabel = "Task Time: ";
const extraMgsLabel = "Additional info: ";
let text, liItem, confirmBtn, editBtn, deleteBtn, infoBtn, dropdownList, editedContent, editedDateText, editedTimeText, editedMsgText;

const colorDict = {
  Entertainment: "rgb(133, 130, 179, 0.85)",
  Health: "rgb(212, 190, 200, 0.85)",
  "Household duties": "rgb(178, 200, 214, 0.85)",
  "Physical activity": "rgb(190, 196, 252, 0.85)",
  Other: "rgb(158, 182, 230, 0.85)",
};

const iconDict = {
  confirmIcon: '<i class="fa-solid fa-check icon fa-lg fa-fw"></i>',
  editIcon: '<i class="fa-solid fa-pen-to-square icon fa-lg fa-fw"></i>',
  deleteIcon: '<i class="fa-solid fa-xmark icon fa-lg fa-fw"></i>',
  moreInfoIcon: '<i class="fa-solid fa-info  fa-lg fa-fw"></i>',
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
  taskDate.value = "";
  taskTime.value = "";
  extraMsg.value = "";
  taskContent.value = "";
  emptyTodos.textContent = "";
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
  configBtn(confirmBtn, "confirm", iconDict["confirmIcon"], taskDone);

  editBtn = document.createElement("button");
  configBtn(editBtn, "edit", iconDict["editIcon"], editTask);

  deleteBtn = document.createElement("button");
  configBtn(deleteBtn, "delete", iconDict["deleteIcon"], removeTask);

  toolsPanel.append(confirmBtn, editBtn, deleteBtn);

  if (!moreInfoForm.classList.contains("hide")) {
    infoBtn = document.createElement("button");
    configBtn(infoBtn, "more", iconDict["moreInfoIcon"], showMoreInfo);
    toolsPanel.append(infoBtn);
  }
};

const configBtn = (btn, className, icon, listenerFunction) => {
  btn.classList.add(className);
  btn.innerHTML = icon;
  btn.addEventListener("click", listenerFunction);
};

const addMoreInfoArea = () => {
  dropdownList = document.createElement("div");
  dropdownList.classList.add("details");
  dropdownList.classList.add("hide");
  liItem.append(dropdownList);

  const dropdownListDate = document.createElement("p");
  dropdownListDate.classList.add("date");
  dropdownListDate.textContent = taskDateLabel + taskDate.value;

  const dropdownListTime = document.createElement("p");
  dropdownListTime.classList.add("time");
  dropdownListTime.textContent = taskTimeLabel + taskTime.value;

  const dropdownListMsg = document.createElement("p");
  dropdownListMsg.classList.add("message");
  dropdownListMsg.textContent = extraMgsLabel + extraMsg.value;

  dropdownList.append(dropdownListDate, dropdownListTime, dropdownListMsg);
};

const showMoreInfo = (e) => {
  const shownLi = e.target.closest("li");

  const details = shownLi.getElementsByClassName("details")[0];
  details.classList.toggle("hide");
};

const taskDone = (e) => {
  const liLine = e.target.closest("li");
  liLine.classList.toggle("completed");
};

const removeTask = (e) => {
  e.target.closest("li").remove();
  const allTodos = ulList.querySelectorAll("li");
  console.log(allTodos);
  if (allTodos.length == 0) {
    emptyTodos.textContent = "Your list is empty!";
  }
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
    editedDateText = editedContent.getElementsByClassName("date")[0];
    editDate.value = editedDateText.textContent.replace("Task Date: ", "");

    editedTimeText = editedContent.getElementsByClassName("time")[0];
    editHour.value = editedTimeText.textContent.replace("Task Time: ", "");

    editedMsgText = editedContent.getElementsByClassName("message")[0];
    editMsg.value = editedMsgText.textContent.replace("Additional info: ", "");

    editInfoArea.style.display = "inline";
  }
};

const acceptTask = () => {
  if (popupInput.value === "") {
    popupInfo.textContent = "Please type task content!";
  } else {
    editedContent.firstChild.textContent = popupInput.value;
    if (editedContent.getElementsByClassName("details")[0]) {
      editedDateText.textContent = taskDateLabel + editDate.value;
      editedTimeText.textContent = taskTimeLabel + editHour.value;
      editedMsgText.textContent = extraMgsLabel + editMsg.value;
    }
    editWindowClose();
    popupInfo.textContent = "";
    popupInput.value = "";
  }
};

const enterKeyCheck = (e) => {
  if (e.key === "Enter") {
    addTask();
  }
};

moreInfoCheck.addEventListener("click", showMore);
addBtn.addEventListener("click", addTask);
cancelBtn.addEventListener("click", editWindowClose);
acceptBtn.addEventListener("click", acceptTask);
taskContent.addEventListener("keyup", enterKeyCheck);
