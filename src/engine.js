import { handleCompletionChange, handleEditClick } from './checkbox.js';

let list = [];
const listContainer = document.getElementById('listContainer');

// Load tasks from local storage
const loadTasksFromLocalStorage = () => {
  const storedList = localStorage.getItem('todoList');
  if (storedList) {
    list = JSON.parse(storedList);
  }
};

// Event listeners for the checkboxes and delete buttons
const attachEventListeners = () => {
  list.forEach((item) => {
    const { index } = item;
    const completedRadio = document.querySelector(`input[name="completed_${index}"]`);

    completedRadio.addEventListener('change', () => {
      item.completed = completedRadio.checked;
      saveTasksToLocalStorage();
    });
  });
};

const Delete = document.getElementById('clear');

Delete.addEventListener('click', () => {
  list = list.filter((item) => !item.completed);
  saveTasksToLocalStorage();
  displayItemsByIndex();
});

// Add a new task
const addTask = (description) => {
  const task = {
    description,
    completed: false,
    index: list.length + 1,
  };

  list.push(task);
  saveTasksToLocalStorage();
  displayItemsByIndex();
};

document.getElementById('addTaskButton').addEventListener('click', () => {
  const taskInput = document.getElementById('taskInput');
  const description = taskInput.value.trim();

  if (description !== '') {
    addTask(description);
  }

  taskInput.value = '';
});

// Edit task descriptionf
const editTaskDescription = (index, newDescription) => {
  const taskIndex = index - 1;

  if (taskIndex >= 0 && taskIndex < list.length) {
    list[taskIndex].description = newDescription;
    saveTasksToLocalStorage();
    displayItemsByIndex();
  } else {
    alert('please add a task to init app');
  }
};

// Display tasks
const displayItemsByIndex = () => {
  listContainer.innerHTML = '';

  list.forEach((item) => {
    const { description, completed, index } = item;

    const listItem = document.createElement('div');
    const descriptionSpan = document.createElement('span');
    const completedRadio = document.createElement('input');
    const edit = document.createElement('button');
    const hr = document.createElement('hr');

    edit.classList.add('edit-task');

    listItem.classList.add('icon');

    descriptionSpan.textContent = description;
    completedRadio.type = 'checkbox';
    completedRadio.name = `completed_${index}`;
    completedRadio.checked = completed;
    edit.textContent = 'Edit task';

    // Handle checkbox change event

    completedRadio.addEventListener('change', () => {
      handleCompletionChange(item, completedRadio, saveTasksToLocalStorage);
    });

    edit.addEventListener('click', () => {
      handleEditClick(index, editTaskDescription);
    });

    listItem.appendChild(completedRadio);
    listItem.appendChild(edit);
    listItem.appendChild(descriptionSpan);
    listItem.appendChild(hr);

    listContainer.appendChild(listItem);

    document.getElementById('taskInput').value = '';
  });
};

// Save and update local storage
const saveTasksToLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(list));
  const filteredList = list.filter((task) => !task.completed);
  localStorage.setItem('todoList', JSON.stringify(filteredList));
};

export {
  loadTasksFromLocalStorage,
  displayItemsByIndex,
  attachEventListeners,
  addTask,
  editTaskDescription,
  saveTasksToLocalStorage,
};