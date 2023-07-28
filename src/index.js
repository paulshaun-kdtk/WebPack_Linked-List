let list = [];
const listContainer = document.getElementById('listContainer');

// Load tasks from local storage
const loadTasksFromLocalStorage = () => {
  const storedList = localStorage.getItem('todoList');
  if (storedList) {
    list = JSON.parse(storedList);
  }
};

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
  if (description.trim() !== '') {
    const task = {
      description,
      completed: false,
      index: list.length + 1,
    };

    list.push(task);
    saveTasksToLocalStorage();
    displayItemsByIndex();
  }
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
    saveTasksToLocalStorage();
    displayItemsByIndex();
  }
};

// delete task
function deleteTask(index) {
  const taskIndex = index - 1;

  if (taskIndex >= 0 && taskIndex < list.length) {
    list.splice(taskIndex, 1);
    list.forEach((task, i) => {
      task.index = i + 1;
    });
    saveTasksToLocalStorage();

    if (listContainer) {
      displayItemsByIndex();
    }
    return true;
  }
  return true;
}

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
    const deleteIcon = document.createElement('button');
    const deleteButton = document.createElement('button');

    edit.classList.add('edit-task');
    deleteButton.classList.add('icon3');
    deleteIcon.classList.add('icon2');

    descriptionSpan.setAttribute('data-index', index);

    descriptionSpan.textContent = description;
    completedRadio.type = 'checkbox';
    completedRadio.name = `completed_${index}`;
    completedRadio.checked = completed;
    edit.textContent = 'Edit task';
    deleteButton.textContent = '';
    deleteIcon.textContent = '';

    // Handle checkbox change event
    completedRadio.addEventListener('change', () => {
      item.completed = completedRadio.checked;
      saveTasksToLocalStorage();
    });

    descriptionSpan.addEventListener('dblclick', () => {
      editTaskDescriptionInline(item, deleteButton, deleteIcon, completedRadio);
    });

    deleteIcon.addEventListener('click', () => {
      toggleDeleteButton(deleteIcon);
    });

    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });

    listItem.appendChild(completedRadio);
    listItem.appendChild(descriptionSpan);
    listItem.appendChild(deleteIcon);
    listItem.appendChild(deleteButton);
    listItem.appendChild(hr);

    listContainer.appendChild(listItem);

    document.getElementById('taskInput').value = '';
  });
};

const toggleDeleteButton = (deleteIcon) => {
  const listItem = deleteIcon.parentElement;
  const deleteButton = listItem.querySelector('.icon3');

  if (deleteButton.style.display === 'none') {
    deleteButton.style.display = 'inline-block';
    deleteIcon.style.display = 'none';
  } else {
    deleteButton.style.display = 'none';
    deleteIcon.style.display = 'inline-block';
  }
};

// Edit task description
const editTaskDescriptionInline = (item, deleteButton, deleteIcon, completedRadio) => {
  const { index } = item;

  const descriptionSpan = document.querySelector(`span[data-index="${index}"]`);
  const currentDescription = descriptionSpan.textContent;

  const inputField = document.createElement('input');
  inputField.value = currentDescription;
  inputField.classList.add('editField');

  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const newDescription = inputField.value.trim();
      if (newDescription !== '') {
        editTaskDescription(index, newDescription);
      } else {
        alert('Description must be at least two characters.');
      }
    } else if (event.key === 'Escape') {
      inputField.value = currentDescription;
      inputField.blur();
    }
  });

  inputField.addEventListener('blur', () => {
    const newDescription = inputField.value.trim();
    if (newDescription !== '') {
      editTaskDescription(index, newDescription);
    } else {
      inputField.value = currentDescription;
    }
  });

  if (inputField.style.display !== 'none') {
    deleteButton.style.display = 'none';
    deleteIcon.style.display = 'none';
    completedRadio.style.display = 'none';
  }

  descriptionSpan.textContent = '';
  descriptionSpan.appendChild(inputField);
  inputField.focus();
};

// Save and update local storage
const saveTasksToLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(list));
};

module.exports = {
  loadTasksFromLocalStorage,
  attachEventListeners,
  displayItemsByIndex,
  editTaskDescription,
  addTask,
  deleteTask,
  Delete,
};
