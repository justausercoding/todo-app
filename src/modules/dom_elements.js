import { format } from "date-fns";

// returns the HTML for an open task
function createOneTaskDOM(taskObject) {
    // -- create elements --
    const liParent = document.createElement("li");

    const divContainerTask = document.createElement("div");
    const buttonCheckbox = document.createElement("button");
    const imgCheckbox = document.createElement("img");
    const divText = document.createElement("div");
    const buttonChevron = document.createElement("button");
    const imgChevron = document.createElement("img");
    const buttonDelete = document.createElement("button");
    const imgDelete = document.createElement("img");

    const divContainerEdit = document.createElement("div");
    const divDateTitle = document.createElement("div");
    const divDateText = document.createElement("div");
    const divDescriptionTitle = document.createElement("div");
    const divDescriptionText = document.createElement("div");
    const divListTitle = document.createElement("div");
    const divListText = document.createElement("div");


    // -- add classes, text etc. to the elements --
    liParent.classList.add("Open__one-task");

    divContainerTask.classList.add("Open__container-task");
    divContainerTask.setAttribute("data-index", taskObject.id);
    buttonCheckbox.classList.add("Open__btn-unchecked");
    imgCheckbox.classList.add("icon", "unchecked");
    imgCheckbox.setAttribute("src", "./icons/checkbox-unchecked.svg");
    divText.classList.add("Open__text");
    if (taskObject.priority === "high") {
        divText.classList.add("bold");
    }
    divText.textContent = taskObject.title;
    buttonChevron.classList.add("Open__btn-unexpanded");
    imgChevron.classList.add("icon", "unexpanded");
    imgChevron.setAttribute("src","./icons/chevron-down.svg");
    buttonDelete.classList.add("Open__btn-delete");
    imgDelete.classList.add("icon", "delete");
    imgDelete.setAttribute("src", "./icons/trash-can.svg");

    divContainerEdit.classList.add("Open__container-details", "hidden");
    divDateTitle.classList.add("Open__details-title");
    divDateTitle.textContent = "due date";
    divDateText.classList.add("Open__details-text");
    if (taskObject.date !== "") {
        divDateText.textContent = format(taskObject.date, "d.M.yyyy");
    } else {
        divDateText.textContent = "-";
    }
    divDescriptionTitle.classList.add("Open__details-title");
    divDescriptionTitle.textContent = "description";
    divDescriptionText.classList.add("Open__details-text");
    if (taskObject.description !== "") {
        divDescriptionText.textContent = taskObject.description;
    } else {
        divDescriptionText.textContent = "-";
    }
    divListTitle.classList.add("Open__details-title");
    divListTitle.textContent = "list";
    divListText.classList.add("Open__details-text");
    divListText.textContent = taskObject.list;

    // -- append to DOM --
    
    // |__ liParent
    //    |__ divContainerTask
    //       |__ buttonCheckbox
    //          |__ imgCheckbox
    //       |__ divText
    //       |__ buttonChevron
    //          |__ imgChevron
    //       |__ buttonDelete
    //         |__ imgDelete
    //    |__ divContainerEdit
    //       |__ divDateTitle
    //       |__ divDateText
    //       |__ divDescriptionTitle
    //       |__ divDescriptionText
    //       |__ divListTitle
    //       |__ divListText 

    // level 3
    buttonCheckbox.appendChild(imgCheckbox);
    buttonChevron.appendChild(imgChevron);
    buttonDelete.appendChild(imgDelete);

    // level 2
    divContainerTask.appendChild(buttonCheckbox);
    divContainerTask.appendChild(divText);
    divContainerTask.appendChild(buttonChevron);
    divContainerTask.appendChild(buttonDelete);
    
    divContainerEdit.appendChild(divDateTitle);
    divContainerEdit.appendChild(divDateText);
    divContainerEdit.appendChild(divDescriptionTitle);
    divContainerEdit.appendChild(divDescriptionText);
    divContainerEdit.appendChild(divListTitle);
    divContainerEdit.appendChild(divListText);

    // level 1
    liParent.appendChild(divContainerTask);
    liParent.appendChild(divContainerEdit);

    return liParent;

}


// returns the HTML for a finished task
function createOneFinishedTaskDOM(taskObject) {
    // -- create elements --
    const liParent = document.createElement("li");

    const buttonCheckbox = document.createElement("button");
    const imgCheckbox = document.createElement("img");
    const divText = document.createElement("div");

    // -- add classes, text etc. to the elements --
    liParent.classList.add("Finished__one-task");
    buttonCheckbox.classList.add("Finished__btn-checked");
    buttonCheckbox.setAttribute("data-index", taskObject.id);
    imgCheckbox.classList.add("icon", "checked");
    imgCheckbox.setAttribute("src", "./icons/checkbox-checked.svg");
    divText.classList.add("Finished__text--closed");
    divText.textContent = taskObject.title;

    // -- append to DOM --

    // |__ liParent
    //    |__ buttonCheckbox
    //       |__ imgCheckbox
    //    |__ divText

    // level 2
    buttonCheckbox.appendChild(imgCheckbox);
    // level 1
    liParent.appendChild(buttonCheckbox);
    liParent.appendChild(divText);

    return liParent
}


// returns the HTML to display the lists in the sidebar
function createListEntryDOM(listName) {
    // -- create elements --
    const divParent = document.createElement("div");
    const buttonText = document.createElement("button");
    const buttonDelete = document.createElement("button");
    const imgDelete = document.createElement("img");

    // -- add classes, text etc. to the elements --
    divParent.classList.add("Sidebar__list-element");
    buttonText.classList.add("Sidebar__btn");
    buttonText.textContent = listName;
    buttonDelete.classList.add("Sidebar__btn-delete");
    imgDelete.classList.add("icon");
    imgDelete.classList.add("delete");
    imgDelete.setAttribute("src", "./icons/trash-can.svg")

    // -- append to DOM --

    // |__ divParent
    //    |__ buttonText
    //    |__ buttonDelete
    //       |__ imgDelete

    // level 2
    buttonDelete.appendChild(imgDelete);

    // level 1
    divParent.appendChild(buttonText);
    divParent.appendChild(buttonDelete);

    return divParent;
}


// returns the HTML to display a dialog asking to 
//   confirm if a list should be deleted
function confirmationDialogListDOM(listName) {
    // -- create elements --
    const dialogParent = document.createElement("dialog");
    const formContainer = document.createElement("form");
    const divTitle = document.createElement("div");
    const divText = document.createElement("div");
    const divConfirm = document.createElement("div");
    const buttonCancel = document.createElement("button");
    const buttonDelete = document.createElement("button");

    // -- add classes, text etc. to the elements --
    dialogParent.setAttribute("id", "Confirm-list"); 
    formContainer.setAttribute("method", "dialog");
    formContainer.setAttribute("id", "Confirm-list__form");
    divTitle.classList.add("Dialog__title");
    divTitle.textContent = `Delete list '${listName}'`
    divText.classList.add("Dialog__text");
    divText.textContent = "All the tasks of the list will also be deleted";
    divConfirm.classList.add("Dialog__confirm"); 
    buttonCancel.classList.add("btn-cancel")
    buttonCancel.textContent = "CANCEL";
    buttonCancel.setAttribute("type", "button");
    buttonCancel.setAttribute("formnovalidate", "formnovalidate");
    
    buttonDelete.classList.add("btn-confirm");
    buttonDelete.textContent = "DELETE";
    buttonDelete.setAttribute("type", "submit");
    // -- add event listener --
    buttonCancel.addEventListener("click", () => {
        dialogParent.close();
    })

    // -- append to DOM --

    // |__ dialogParent
    //    |__ formContainer
    //       |__ divTitle
    //       |__ divText
    //       |__ divConfirm
    //          |__ buttonCancel
    //          |__ buttonDelete

    // level 3
    divConfirm.appendChild(buttonCancel);
    divConfirm.appendChild(buttonDelete);

    // level 2
    formContainer.appendChild(divTitle);
    formContainer.appendChild(divText);
    formContainer.appendChild(divConfirm);

    // level 1
    dialogParent.appendChild(formContainer);

    return dialogParent;
}


// returns the HTML to display a dialog asking to 
//   confirm if a task should be deleted
function confirmationDialogTaskDOM() { 
    // -- create elements --
    const dialogParent = document.createElement("dialog");
    const formContainer = document.createElement("form");
    const divTitle = document.createElement("div");
    const divConfirm = document.createElement("div");
    const buttonCancel = document.createElement("button");
    const buttonDelete = document.createElement("button");

    // -- add classes, text etc. to the elements --
    dialogParent.setAttribute("id", "Confirm-list"); 
    formContainer.setAttribute("method", "dialog");
    formContainer.setAttribute("id", "Confirm-list__form");
    divTitle.classList.add("Dialog__title");
    divTitle.textContent = "Delete task?"
    divConfirm.classList.add("Dialog__confirm"); 
    buttonCancel.classList.add("btn-cancel")
    buttonCancel.textContent = "CANCEL";
    buttonCancel.setAttribute("type", "button");
    buttonCancel.setAttribute("formnovalidate", "formnovalidate");
    
    buttonDelete.classList.add("btn-confirm");
    buttonDelete.textContent = "DELETE";
    buttonDelete.setAttribute("type", "submit");
    // -- add event listener --
    buttonCancel.addEventListener("click", () => {
        dialogParent.close();
    })

    // -- append to DOM --

    // |__ dialogParent
    //    |__ formContainer
    //       |__ divTitle
    //       |__ divConfirm
    //          |__ buttonCancel
    //          |__ buttonDelete

    // level 3
    divConfirm.appendChild(buttonCancel);
    divConfirm.appendChild(buttonDelete);

    // level 2
    formContainer.appendChild(divTitle);
    formContainer.appendChild(divConfirm);

    // level 1
    dialogParent.appendChild(formContainer);

    return dialogParent;
}


export {
    createOneTaskDOM,
    createOneFinishedTaskDOM,
    createListEntryDOM,
    confirmationDialogListDOM,
    confirmationDialogTaskDOM
}