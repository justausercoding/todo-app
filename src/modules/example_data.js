import { checkListDB, createListDB, addTaskToDB } from "./database_handling.js"
import { format, subDays, addDays } from "date-fns"

// Adds some example data to localStorage, in order for the data to be displayed by the app
function enterTestData() {
    // -- Create a list entry in localStorage --
    if (checkListDB() === false) {
        createListDB()
    }

    // -- Add some sample task to localStorage --
    let dateFormat = "yyyy-MM-dd";
    let date = new Date();
    let datePast = format(subDays(date, 14), dateFormat);
    let dateToday = format(date, dateFormat);
    let dateFuture = format(addDays(date, 30), dateFormat);

    let testData = false;
    if (testData === false) {
        let testArray = [
            // Past
            {title : "Do the laundry", description: "", date: datePast, list: "Default", priority: "high", finished: false, id: 1716358358430},
            {title : "Buy a pizza", description: "", date: datePast, list: "Default", priority: "", finished: false, id: 1716358358431},
            {title : "Call a friend", description: "", date: datePast, list: "Default", priority: "high", finished: true, id: 1716358358432},
            {title : "Shopping", description: "", date: datePast, list: "Default", priority: "", finished: true, id: 1716358358433},
            // Today
            {title : "This is an important task", description: "Text is in bold", date: dateToday, list: "Default", priority: "high", finished: false, id: 1716358358434},
            {title : "Not so important", description: "Text has normal weight", date: dateToday, list: "Default", priority: "", finished: false, id: 1716358358435},
            {title : "Finish the course", description: "", date: dateToday, list: "Default", priority: "high", finished: true, id: 1716358358436},
            {title : "Buy food", description: "", date: dateToday, list: "Default", priority: "", finished: true, id: 1716358358437},
            // Future
            {title : "Change the tires of the cars", description: "", date: dateFuture, list: "Default", priority: "high", finished: false, id: 1716358358438},
            {title : "Go to the gym", description: "", date: dateFuture, list: "Default", priority: "", finished: false, id: 1716358358439},
            {title : "Buy clothes", description: "", date: dateFuture, list: "Default", priority: "high", finished: true, id: 1716358358440},
            {title : "Go to the cinema", description: "", date: dateFuture, list: "Default", priority: "", finished: true, id: 1716358358441},
            // No date
            {title : "Book a holiday", description: "", date: "", list: "Default", priority: "high", finished: false, id: 1716358358442},
            {title : "Book a table in the restaurant", description: "", date: "", list: "Default", priority: "", finished: false, id: 1716358358443},
            {title : "Buy a book", description: "", date: "", list: "Default", priority: "high", finished: true, id: 1716358358444},
            {title : "Get the train ticket", description: "", date: "", list: "Default", priority: "", finished: true, id: 1716358358445},
        ]

        for (let i of testArray) {
            addTaskToDB(i.title, i);
        }
    }
    testData = true;
}

export {
    enterTestData
}