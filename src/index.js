import * as con from "./modules/controller.js"
import { enterTestData } from "./modules/example_data.js"
import "./css/style.css"
import "./icons/checkbox-checked.svg"
import "./icons/checkbox-unchecked.svg"
import "./icons/chevron-down.svg"
import "./icons/chevron-up.svg"
import "./icons/pencil.svg"
import "./icons/plus-circle.svg"
import "./icons/trash-can.svg"


// ---------- SIDEBAR: SHOW TIME TASKS ----------
const buttonSidebarTime = document.querySelectorAll(".Sidebar__time .Sidebar__btn");

buttonSidebarTime.forEach((btn) => {
    btn.addEventListener("click", function() {
        con.CurrentView.set("time", this.textContent.slice(2))
        con.buildScreenTasks();
        con.removeScreenTasksFinished();
    })
});

// ---------- SIDEBAR: SHOW LIST TASKS ----------
const buttonSidebarDefault = document.querySelector(".Sidebar__list-default");

// -- "Default" list --
buttonSidebarDefault.addEventListener("click", function() {
    con.CurrentView.set("list", this.textContent)
    con.buildScreenTasks();
    con.removeScreenTasksFinished();
});

// -- All the other lists --
const divSidebarListContainer = document.querySelector(".Sidebar__list-container");
divSidebarListContainer.addEventListener("click", e => {
    if (e.target.classList.contains("Sidebar__btn")) {
        con.CurrentView.set("list", e.target.textContent);
        con.buildScreenTasks();
        con.removeScreenTasksFinished();
    }
})


// ---------- SIDEBAR: ADD A NEW LIST ----------
const buttonSidebarListAdd = document.querySelector(".Sidebar__btn-add");
const dialogNewList = document.querySelector("#List");
const formNewList = document.querySelector("#List__form");
const buttonCancelNewList = document.querySelector("#List__form .btn-cancel");

// -- step 1: click on button -> show dialog --
buttonSidebarListAdd.addEventListener("click", () => {
    dialogNewList.showModal();
});
// -- step 2: submit form, add list to DB and display screen with new list --
formNewList.addEventListener("submit", () => {
    con.handleNewListForm();
    con.buildScreenLists();
    con.removeScreenTasksFinished();
});
// -- step 2 (alternative): cancel dialog --
buttonCancelNewList.addEventListener("click", () => {
    dialogNewList.close();
})


// ---------- SIDEBAR: DELETE LIST ---------- 
divSidebarListContainer.addEventListener("click", e => { 
    if (e.target.classList.contains("delete")) {
        let parent = e.target.parentElement;
        let listName = parent.previousSibling.textContent;
        con.showDialogListDelete(listName);
    }
})


// ---------- ADD A NEW TASK ----------
const buttonAddTask = document.querySelector(".Header__btn-add");
const dialogNewTask = document.querySelector("#New");
const formNewTask = document.querySelector("#New__form");
const buttonCancelNewTask = document.querySelector("#New__form .btn-cancel");

// -- step 1: click on button -> show dialog --
buttonAddTask.addEventListener("click", () => {
    con.showDialogAddTasks();
});
// -- step 2: submit form, add task to DB and display screen with new task --
formNewTask.addEventListener("submit", () => {
    con.handleNewTaskForm();
    con.buildScreenTasks();
    con.removeScreenTasksFinished();
});
// -- step 2 (alternative): cancel dialog --
buttonCancelNewTask.addEventListener("click", () => {
    dialogNewTask.close();
})


// ---------- TASKS: HIDE/SHOW DETAILS ----------
const ulOpen = document.querySelector(".Open");
ulOpen.addEventListener("click", e => {
    if (e.target.classList.contains("unexpanded")) { // imgChevron
        let buttonChevron = e.target.parentElement;
        let divContainerTask = buttonChevron.parentElement;
        let divContainerEdit = divContainerTask.nextSibling;
        divContainerEdit.classList.remove("hidden");
        e.target.classList.remove("unexpanded");
        e.target.classList.add("expanded")
        e.target.setAttribute("src","./icons/chevron-down.svg")
        
    } else if (e.target.classList.contains("expanded")) { // imgChevron
        let buttonChevron = e.target.parentElement;
        let divContainerTask = buttonChevron.parentElement;
        let divContainerEdit = divContainerTask.nextSibling;
        divContainerEdit.classList.add("hidden");
        e.target.classList.remove("expanded");
        e.target.classList.add("unexpanded")
        e.target.setAttribute("src","./icons/chevron-up.svg")

    } else if (e.target.classList.contains("unchecked")) { // imgCheckbox
        let buttonCheckbox = e.target.parentElement; 
        let divText = buttonCheckbox.nextSibling;
        let divContainerTask = buttonCheckbox.parentElement;
        let idTask = divContainerTask.getAttribute("data-index");
        con.markTaskAsDone(idTask);
        e.target.classList.remove("unchecked");
        e.target.classList.add("checked");
        e.target.setAttribute("src", "./icons/checkbox-checked.svg")
        divText.classList.add("Open__text--line-through");

    } else if (e.target.classList.contains("checked")) { // imgCheckbox
        let buttonCheckbox = e.target.parentElement; 
        let divText = buttonCheckbox.nextSibling;
        let divContainerTask = buttonCheckbox.parentElement;
        let idTask = divContainerTask.getAttribute("data-index");
        con.markTaskAsUndone(idTask);
        e.target.classList.remove("checked");
        e.target.classList.add("unchecked");
        e.target.setAttribute("src", "./icons/checkbox-unchecked.svg");
        divText.classList.remove("Open__text--line-through");

    } else if (e.target.classList.contains("delete")) { // imgDelete
        let buttonDelete = e.target.parentElement; 
        let divContainerTask = buttonDelete.parentElement;
        let idTask = divContainerTask.getAttribute("data-index");
        con.showDialogTaskDelete(idTask);
    }
})


// ---- FINISHED TASKS: HIDE/SHOW ----
const buttonFinishedTitle = document.querySelector(".Finished__title");
buttonFinishedTitle.addEventListener("click", e => {
    if (e.target.classList.contains("unexpanded")) {
        e.target.classList.remove("unexpanded");
        e.target.classList.add("expanded");
        e.target.setAttribute("src","./icons/chevron-down.svg");
        con.buildScreenTasksFinished();

    } else if (e.target.classList.contains("expanded")) {
        e.target.classList.remove("expanded");
        e.target.classList.add("unexpanded");
        e.target.setAttribute("src","./icons/chevron-up.svg");
        con.removeScreenTasksFinished();
    }
})

const buttonFinishedContainer = document.querySelector(".Finished__container");
buttonFinishedContainer.addEventListener("click", e => {
    if (e.target.classList.contains("checked")) {
        let buttonCheckbox = e.target.parentElement;
        let divText = buttonCheckbox.nextSibling;
        let idNumber = buttonCheckbox.getAttribute("data-index");
        e.target.classList.remove("checked");
        e.target.classList.add("unchecked");
        e.target.setAttribute("src", "./icons/checkbox-unchecked.svg");
        divText.classList.remove("Finished__text--closed");
        divText.classList.add("Finished__text--open");
        con.markTaskAsUndone(idNumber);

    } else if (e.target.classList.contains("unchecked")) {
        let buttonCheckbox = e.target.parentElement;
        let divText = buttonCheckbox.nextSibling;
        let idNumber = buttonCheckbox.getAttribute("data-index");
        e.target.classList.remove("unchecked");
        e.target.classList.add("checked");
        e.target.setAttribute("src", "./icons/checkbox-checked.svg");
        divText.classList.remove("Finished__text--open");
        divText.classList.add("Finished__text--closed");
        con.markTaskAsDone(idNumber);
    }

})



// ---- FINISHED TASKS: CHECK/UNCHECK TASKS ----



// ---- UPDATE HOMEPAGE ----
enterTestData()
con.buildScreenTasks()
con.buildScreenLists()



