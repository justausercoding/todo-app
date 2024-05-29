// Return a task object
function createOneTaskObject(formData) {
    let newTask = {
        title: formData.get("title"),
        description: formData.get("description"),
        date: formData.get("date"),
        list: formData.get("list"),
        priority: formData.get("priority"),
        finished: false,
        id: Date.now(),
    }
    return newTask;
}

export {
    createOneTaskObject
}