import { isToday, isBefore, isAfter, startOfToday, endOfToday } from "date-fns"


// ---------- TASKS ----------
function addTaskToDB(dataName, dataObject) {
    // input: a 'task' object -> converted to json-string and saved to localStorage
    let name = "task -- " + dataName;
    let json = JSON.stringify(dataObject);
    localStorage.setItem(name, json);
}


// Set the attribute 'finished' to 'true' of a stored task
function setTaskAsFinished(idNumber) {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        let dataParsed = JSON.parse(data);
        if (
            (key.slice(0, 8) === "task -- ") &&
            (dataParsed.id == idNumber)
         ) {
            dataParsed.finished = true;
            let json = JSON.stringify(dataParsed);
            localStorage.setItem(key, json);
        }
    }
}

// Set the attribute 'finished' to 'false' of a stored task
function setTaskAsNotFinished(idNumber) {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        let dataParsed = JSON.parse(data);
        if (
            (key.slice(0, 8) === "task -- ") &&
            (dataParsed.id == idNumber)
         ) {
            dataParsed.finished = false;
            let json = JSON.stringify(dataParsed);
            localStorage.setItem(key, json);
        }
    }
}

// Get all the tasks stored in localStorage as objects
function getTasksAll(){
    // -- get all items form localStorage --
    let arrayWithStringTasks = [];
    for (let i = 0, length = localStorage.length; i < length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        if (key.slice(0, 8) === "task -- ") {
            arrayWithStringTasks.push(data);
        }
    }
    // -- convert the strings of each task into an object --
    let arrayWithObjectTasks = [];   
    for (let i of arrayWithStringTasks) {
        let oneObject = JSON.parse(i);
        arrayWithObjectTasks.push(oneObject);
    }
    // -- convert dates into date objects --
    let allTasks = arrayWithObjectTasks.map((i) =>  {
        if (i.date !== "") i.date = new Date(i.date)
        return i;
    })
    // return -> array containing task objects
    return allTasks;
}

// Get only the task objects of the filtered 'type' (e.g. time) and 'name' (e.g. today)
function getTasksFiltered(typeDisplay, nameDisplay) {
    let allTasksArray = getTasksAll()
    let tasksOpen = [];
    let tasksFinished = [];
    if (typeDisplay === "time") {
        switch (nameDisplay) {
            case "today":
                tasksOpen = allTasksArray.filter(item => {
                    return isToday(item.date) && !(item.finished);
                });
                tasksFinished = allTasksArray.filter(item => {
                    return isToday(item.date) && item.finished;
                });
                break;
            case "past":
                let todayStart = startOfToday();
                tasksOpen = allTasksArray.filter(item => {
                    return isBefore(item.date, todayStart) && !(item.finished);
                });
                tasksFinished = allTasksArray.filter(item => {
                    return isBefore(item.date, todayStart) && item.finished;
                });
                break;
            case "future":
                let todayEnd = endOfToday();
                tasksOpen = allTasksArray.filter(item => {
                    return isAfter(item.date, todayEnd) && !(item.finished);
                });
                tasksFinished = allTasksArray.filter(item => {
                    return isAfter(item.date, todayEnd) && item.finished;
                });
                break;
            case "someday":
                tasksOpen = allTasksArray.filter(item => {
                    return (item.date === "") && !(item.finished);
                });
                tasksFinished = allTasksArray.filter(item => {
                    return (item.date === "") && item.finished;
                });
                break;
        }
    } else if (typeDisplay === "list") {
        tasksOpen = allTasksArray.filter(item => {
            return (nameDisplay === item.list) && !(item.finished);
        });
        tasksFinished = allTasksArray.filter(item => {
            return (nameDisplay === item.list)  && item.finished;
        });
    }

    return [ tasksOpen, tasksFinished ];
}

// Remove all the tasks from localStorage, that belong to a certain list
function removeTasksAllFromList(listName) {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        let dataParsed = JSON.parse(data);
        if (dataParsed.list === listName) {
            localStorage.removeItem(key);
        }
    }
}

// Remove one task from localStorage
function removeTaskFromDB(idNumber) {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        let dataParsed = JSON.parse(data);
        if (
            (key.slice(0, 8) === "task -- ") &&
            (dataParsed.id == idNumber)
        ) {
            localStorage.removeItem(key);
        }
    }
}


// ---------- LISTS ----------
// Check if there is an entry with name 'list' in localStorage
function checkListDB() {
    for (let i = 0, length = localStorage.length; i < length; i++) {
        if (localStorage.key(i) === "list") {
            return true;
        }
    }
    return false;
}

// Create an entry called 'list' in localStorage with one entry: 'Default'
function createListDB() {
    let json = JSON.stringify(["Default"]);
    localStorage.setItem("list", json);
}

// Add a new name of a list to the entry 'list' in localStorage
function addListToDB(listName) {
    let listsArray = getListsNamesDB();
    listsArray.push(listName);
    let listsArrayNoDuplicates = [...new Set(listsArray)];
    let json = JSON.stringify(listsArrayNoDuplicates);
    localStorage.setItem("list", json);
}

// Remove a list name from 'list' in localStorage
function removeListFromDB(listName) {
    let listsArray = getListsNamesDB();
    let newListArray = [];
    for (let i of listsArray) {
        if (i !== listName) {
            newListArray.push(i);
        }
    }
    let json = JSON.stringify(newListArray);
    localStorage.setItem("list", json);
}

// Get all the list names from localStorage
function getListsNamesDB() {
    let listNames;
    for (let i = 0, length = localStorage.length; i < length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        if (key === "list") {
            listNames = data;
        }
    }
    return JSON.parse(listNames);

}


export {
    addTaskToDB,
    getTasksFiltered,
    removeTasksAllFromList,
    checkListDB,
    createListDB,
    addListToDB,
    removeTaskFromDB,
    removeListFromDB,
    getListsNamesDB,
    setTaskAsNotFinished,
    setTaskAsFinished
}
