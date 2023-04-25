"use strict";

const todoList = document.getElementById("todoList");
const newItemInput = document.getElementById("newItemInput");
const addButton = document.getElementById("addButton");

let items = [];
let lastDeletedItem = null;

const addNewItem = () => {
  const task = newItemInput.value;

  const newItem = {
    text: task,
    completed: false,
    date: null
  };

  if (task === "") {
    return;
  }

  items.push(newItem);
  displayList();
  newItemInput.value = "";
}

const completeItem = (index) => {
  items[index].completed = !items[index].completed;
  items[index].date = new Date().toLocaleString();
  displayList();
}

const deleteItem = (index) => {
  const modal = $("#confirmDeleteModal");
  const cancelButton = $("#cancelDeleteButton");
  const confirmButton = $("#confirmDeleteButton");

  modal.css("display", "block");

  cancelButton.on("click", () => {
    modal.css("display", "none");
  });

  confirmButton.on("click", () => {
    lastDeletedItem = items.splice(index, 1)[0];
    displayList();
    modal.css("display", "none");
  });
};

const displayList = () => {
  todoList.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const listItem = document.createElement("li");
    listItem.innerHTML = item.text;
    listItem.classList.add("listItem");

    if (item.completed) {
      listItem.classList.add("completed");
      listItem.innerHTML += `<small>(wykonane: ${item.date})</small>`;
    }

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&times;";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", function () {
      deleteItem(i);
    });

    listItem.appendChild(deleteButton);
    listItem.addEventListener("click", function () {
      completeItem(i);
    });

    todoList.appendChild(listItem);
  }
}

addButton.addEventListener("click", addNewItem);
$(document).on('keypress', (e) => {
  if (e.key === 'z' || e.key === 'Z') {
    if (lastDeletedItem !== null) {
      items.push(lastDeletedItem);
      lastDeletedItem = null;
    }
    displayList();
  }
});

displayList();