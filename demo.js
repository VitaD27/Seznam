var taskInput = document.getElementById("new-task");   //Add a new task.
var addBtn = document.getElementsByTagName("button")[0];   // first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks");  //ul of #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks");  //completed-tasks


//New task list item
var createNewTaskElement = function(taskString){

	var listItem = document.createElement("li");

	//input (checkbox)
	var checkBox = document.createElement("input");   
	//label
	var label = document.createElement("label");
	//input (text)
	var editInput = document.createElement("input");
	//button.edit
	var editBtn = document.createElement("button");

	//button.delete
	var deleteBtn = document.createElement("button");

	label.innerText = taskString;

	
	checkBox.type = "checkbox";
	editInput.type = "text";

	editBtn.innerText = "Upravit";    
	editBtn.className = "edit";

	deleteBtn.innerText = "Smazat";
	deleteBtn.className = "delete";


	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editBtn);
	listItem.appendChild(deleteBtn);
	
	return listItem;
}



var addTask = function() {
	console.log("Add Task ...");
	// Create a new list item with the text from the #new-task:
	var listItem = createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";

}

// Edit an existing task.

var editTask = function() {
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem = this.parentNode;

var editInput = listItem.querySelector('input[type = text]');
var label = listItem.querySelector("label");
var containsClass = listItem.classList.contains("editMode");
		// If class of the parent is .editmode
		if(containsClass){

		// switch to .editmode
		// label becomes the inputs value.
			label.innerText = editInput.value;
		} else {
			editInput.value = label.innerText;
		}

		// toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}




// Delete task.
var deleteTask = function(){
		console.log("Delete Task ...");

		var listItem = this.parentNode;
		var ul = listItem.parentNode;
		// Remove the parent list item from the ul.
		ul.removeChild(listItem);

}


// Mark task completed
var taskCompleted = function() {
		console.log("Complete Task ...");
	
	// Append the task list item to the #completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function() {
		console.log("Incomplete Task ...");
// Mark task as incomplete.
	// When the checkbox is unchecked
		// Append the task list item to the #incomplete-tasks.
		var listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest = function() {
	console.log("AJAX Request");
}

// The glue to hold it all together.
// Set the click handler to the addTask function.
addBtn.onclick = addTask;
addBtn.addEventListener("click", addTask);
addBtn.addEventListener("click", ajaxRequest);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("bind list item events");
// select ListItems children
	var checkBox = taskListItem.querySelector("input[type = checkbox]");
	var editBtn = taskListItem.querySelector("button.edit");
	var deleteBtn = taskListItem.querySelector("button.delete");


			// Bind editTask to edit button.
			editBtn.onclick = editTask;
			// Bind deleteTask to delete button.
			deleteBtn.onclick = deleteTask;
			// Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange = checkBoxEventHandler;
}

// cycle over incompleteTaskHolder ul list items
	// for each list item
	for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

		// bind events to list items chldren (tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
	}




// cycle over completedTasksHolder ul list items
	for (var i = 0; i < completedTasksHolder.children.length; i++) {
	// bind events to list items chldren(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}

