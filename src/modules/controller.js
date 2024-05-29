import * as db from "./database_handling.js"
import * as dom from "./dom_elements"
import { createOneTaskObject } from "./create_task.js"

// ---------- CURRENT STATUS ----------
// The class keeps track of what is currently being displayed (e.g. 'time'/'today' or 'list'/'default')
//   also returns the title of the current view
class CurrentView {
    // 'type' is added in order that new Lists can also be called 'Today', 'Future' etc, without conflicting
    // with the 'Time' display options
    static category  = "time";
    static name = "today";
    static title = "Today";

    static get() {
        return [this.category, this.name];
    }

    static getTitle() {
        return this.title;
    }

    static set(category, name) {
        this.category = category;
        this.name = name;
        if (this.category === "time") {
            this.title = this.name[0].toUpperCase() + this.name.slice(1);
        } else {
            this.title = this.name;
        }
    }
}


// ---------- HANDLE FORMS ----------
function handleNewListForm() {
    const form = document.querySelector("#List__form");
    let data = new FormData(form);
    db.addListToDB(data.get("list"));
    form.reset();
}


function handleNewTaskForm() {
    const form = document.querySelector("#New__form");
    let newTask = createOneTaskObject(new FormData(form));
    db.addTaskToDB(newTask.title, newTask);
    form.reset();
}


// ---------- SHOW MODAL DIALOG ----------
function showDialogAddTasks() {
    const dialogNewTask = document.querySelector("#New");

    let listNamesArray = db.getListsNamesDB();
    const selectTaskList = document.querySelector("#task-list");

    // -- remove childs --
    while (selectTaskList.lastChild) {
        selectTaskList.removeChild(selectTaskList.lastChild);
    }

    // -- add childs --
    for (let i of listNamesArray) {
        let element = document.createElement("option");
        element.setAttribute("value", i);
        element.textContent = i;
        selectTaskList.appendChild(element);
    }
    dialogNewTask.showModal();
}


function showDialogListDelete(listName) {
    const body = document.querySelector("body");
    let dialog = dom.confirmationDialogListDOM(listName);
    body.appendChild(dialog)
    dialog.showModal()
    dialog.addEventListener("submit", e => {
        db.removeListFromDB(listName);
        db.removeTasksAllFromList(listName);
        let [category, name] = CurrentView.get();
        if (category === "list" && name === listName) {
            CurrentView.set("list", "Default");
        }
        buildScreenLists();
        buildScreenTasks();
        removeScreenTasksFinished();
    } )
}


function showDialogTaskDelete(idNumber) {
    const body = document.querySelector("body");
    let dialog = dom.confirmationDialogTaskDOM();
    body.appendChild(dialog)
    dialog.showModal()
    dialog.addEventListener("submit", ()  => {
        db.removeTaskFromDB(idNumber)
        buildScreenTasks();
        removeScreenTasksFinished();
    } )
}


// ---------- BUILD SCREEN ----------
function buildScreenLists() {
    let lists = db.getListsNamesDB();

    // -- remove elements --
    const divListContainer = document.querySelector(".Sidebar__list-container");
    while (divListContainer.lastChild) {
        divListContainer.removeChild(divListContainer.lastChild);
    }

    // -- add childs --
    for (let i of lists) {
        if (i !== "Default") {
            divListContainer.appendChild(dom.createListEntryDOM(i));
        }
    }
}


function buildScreenTasks() {
    // -- get current view and the task of this view --
    let [category, name] = CurrentView.get();
    let [current, _] = db.getTasksFiltered(category, name);

    const ulOpen = document.querySelector(".Open");
    // -- remove all childs --
    while (ulOpen.lastChild) {
        ulOpen.removeChild(ulOpen.lastChild);
    }
    // -- add childs --
    for (let i of current) {
        ulOpen.appendChild(dom.createOneTaskDOM(i));
    }
    const h1HeaderTitle = document.querySelector(".Header__title");
    h1HeaderTitle.textContent = CurrentView.getTitle();
}


function buildScreenTasksFinished() {
        // -- get current view and the task of this view --
        let [category, name] = CurrentView.get();
        let [_, finished] = db.getTasksFiltered(category, name);
    
        const ulFinished = document.querySelector(".Finished__container");
        // -- remove all childs --
        while (ulFinished.lastChild) {
            ulFinished.removeChild(ulFinished.lastChild);
        }
        // -- add childs --
        for (let i of finished) {
            ulFinished.appendChild(dom.createOneFinishedTaskDOM(i));
        }
}


function removeScreenTasksFinished() {
    const ulFinishedContainer = document.querySelector(".Finished__container");
        // -- remove all childs --
        while (ulFinishedContainer.lastChild) {
            ulFinishedContainer.removeChild(ulFinishedContainer.lastChild);
        }
    const imgTitle = document.querySelector(".Finished__btn-expanded .icon");
    if (imgTitle.classList.contains("expanded")) {
        imgTitle.classList.remove("expanded");
        imgTitle.classList.add("unexpanded");
        imgTitle.setAttribute("src","./icons/chevron-up.svg");
    }
}

// ---------- DATABASE ----------
function markTaskAsDone(idNumber) {
    db.setTaskAsFinished(idNumber);
}


function markTaskAsUndone(idNumber) {
    db.setTaskAsNotFinished(idNumber);
}


export {
    CurrentView,
    buildScreenTasks,
    buildScreenLists,
    handleNewTaskForm,
    handleNewListForm,
    showDialogAddTasks,
    showDialogTaskDelete,
    showDialogListDelete,
    markTaskAsDone,
    markTaskAsUndone,
    buildScreenTasksFinished,
    removeScreenTasksFinished
}