(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module) => {

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
    alert('Please add a task to initialize the app.');
  }
};

// delete task
function deleteTask(index, list) {
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
  } else {
    alert('Invalid task index.');
    return false;
  }
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
  addTask,
  deleteTask,
};

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQiwyRUFBMkUsTUFBTTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxnQ0FBZ0M7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxNQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEI7QUFDQSxxRUFBcUUsTUFBTTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgbGlzdCA9IFtdO1xyXG5jb25zdCBsaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3RDb250YWluZXInKTtcclxuXHJcbi8vIExvYWQgdGFza3MgZnJvbSBsb2NhbCBzdG9yYWdlXHJcbmNvbnN0IGxvYWRUYXNrc0Zyb21Mb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XHJcbiAgY29uc3Qgc3RvcmVkTGlzdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvTGlzdCcpO1xyXG4gIGlmIChzdG9yZWRMaXN0KSB7XHJcbiAgICBsaXN0ID0gSlNPTi5wYXJzZShzdG9yZWRMaXN0KTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuY29uc3QgYXR0YWNoRXZlbnRMaXN0ZW5lcnMgPSAoKSA9PiB7XHJcbiAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICBjb25zdCB7IGluZGV4IH0gPSBpdGVtO1xyXG4gICAgY29uc3QgY29tcGxldGVkUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPVwiY29tcGxldGVkXyR7aW5kZXh9XCJdYCk7XHJcblxyXG4gICAgICBjb21wbGV0ZWRSYWRpby5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIGl0ZW0uY29tcGxldGVkID0gY29tcGxldGVkUmFkaW8uY2hlY2tlZDtcclxuICAgICAgc2F2ZVRhc2tzVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgRGVsZXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyJyk7XHJcblxyXG5EZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbGlzdCA9IGxpc3QuZmlsdGVyKChpdGVtKSA9PiAhaXRlbS5jb21wbGV0ZWQpO1xyXG4gIHNhdmVUYXNrc1RvTG9jYWxTdG9yYWdlKCk7XHJcbiAgZGlzcGxheUl0ZW1zQnlJbmRleCgpO1xyXG59KTtcclxuXHJcbi8vIEFkZCBhIG5ldyB0YXNrXHJcbmNvbnN0IGFkZFRhc2sgPSAoZGVzY3JpcHRpb24pID0+IHtcclxuICBpZiAoZGVzY3JpcHRpb24udHJpbSgpICE9PSAnJykge1xyXG4gICAgY29uc3QgdGFzayA9IHtcclxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIGNvbXBsZXRlZDogZmFsc2UsXHJcbiAgICAgIGluZGV4OiBsaXN0Lmxlbmd0aCArIDEsXHJcbiAgICB9O1xyXG5cclxuICAgIGxpc3QucHVzaCh0YXNrKTtcclxuICAgIHNhdmVUYXNrc1RvTG9jYWxTdG9yYWdlKCk7XHJcbiAgICBkaXNwbGF5SXRlbXNCeUluZGV4KCk7XHJcbiAgICBcclxuICAgfVxyXG59O1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFRhc2tCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCB0YXNrSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza0lucHV0Jyk7XHJcbiAgY29uc3QgZGVzY3JpcHRpb24gPSB0YXNrSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICBpZiAoZGVzY3JpcHRpb24gIT09ICcnKSB7XHJcbiAgICBhZGRUYXNrKGRlc2NyaXB0aW9uKTtcclxuICB9XHJcbiAgdGFza0lucHV0LnZhbHVlID0gJyc7XHJcbn0pO1xyXG5cclxuLy8gRWRpdCB0YXNrIGRlc2NyaXB0aW9uZlxyXG5jb25zdCBlZGl0VGFza0Rlc2NyaXB0aW9uID0gKGluZGV4LCBuZXdEZXNjcmlwdGlvbikgPT4ge1xyXG4gIGNvbnN0IHRhc2tJbmRleCA9IGluZGV4IC0gMTtcclxuXHJcbiAgaWYgKHRhc2tJbmRleCA+PSAwICYmIHRhc2tJbmRleCA8IGxpc3QubGVuZ3RoKSB7XHJcbiAgICBsaXN0W3Rhc2tJbmRleF0uZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcclxuICAgIHNhdmVUYXNrc1RvTG9jYWxTdG9yYWdlKCk7XHJcbiAgICBkaXNwbGF5SXRlbXNCeUluZGV4KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KCdQbGVhc2UgYWRkIGEgdGFzayB0byBpbml0aWFsaXplIHRoZSBhcHAuJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gZGVsZXRlIHRhc2tcclxuZnVuY3Rpb24gZGVsZXRlVGFzayhpbmRleCwgbGlzdCkge1xyXG4gIGNvbnN0IHRhc2tJbmRleCA9IGluZGV4IC0gMTtcclxuXHJcbiAgaWYgKHRhc2tJbmRleCA+PSAwICYmIHRhc2tJbmRleCA8IGxpc3QubGVuZ3RoKSB7XHJcbiAgICBsaXN0LnNwbGljZSh0YXNrSW5kZXgsIDEpO1xyXG4gICAgbGlzdC5mb3JFYWNoKCh0YXNrLCBpKSA9PiB7XHJcbiAgICAgIHRhc2suaW5kZXggPSBpICsgMTtcclxuICAgIH0pO1xyXG4gICAgc2F2ZVRhc2tzVG9Mb2NhbFN0b3JhZ2UoKTtcclxuXHJcbiAgICBpZiAobGlzdENvbnRhaW5lcikge1xyXG4gICAgICBkaXNwbGF5SXRlbXNCeUluZGV4KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KCdJbnZhbGlkIHRhc2sgaW5kZXguJyk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBEaXNwbGF5IHRhc2tzXHJcbmNvbnN0IGRpc3BsYXlJdGVtc0J5SW5kZXggPSAoKSA9PiB7XHJcbiAgbGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICBjb25zdCB7IGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIGluZGV4IH0gPSBpdGVtO1xyXG5cclxuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBjb25zdCBjb21wbGV0ZWRSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBjb25zdCBlZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XHJcbiAgICBjb25zdCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBlZGl0LmNsYXNzTGlzdC5hZGQoJ2VkaXQtdGFzaycpO1xyXG4gICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ljb24zJyk7XHJcbiAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24yJyk7XHJcblxyXG4gICAgZGVzY3JpcHRpb25TcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcclxuXHJcbiAgICBkZXNjcmlwdGlvblNwYW4udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjtcclxuICAgIGNvbXBsZXRlZFJhZGlvLnR5cGUgPSAnY2hlY2tib3gnO1xyXG4gICAgY29tcGxldGVkUmFkaW8ubmFtZSA9IGBjb21wbGV0ZWRfJHtpbmRleH1gO1xyXG4gICAgY29tcGxldGVkUmFkaW8uY2hlY2tlZCA9IGNvbXBsZXRlZDtcclxuICAgIGVkaXQudGV4dENvbnRlbnQgPSAnRWRpdCB0YXNrJztcclxuICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgZGVsZXRlSWNvbi50ZXh0Q29udGVudCA9ICcnO1xyXG5cclxuICAgIC8vIEhhbmRsZSBjaGVja2JveCBjaGFuZ2UgZXZlbnRcclxuICAgIGNvbXBsZXRlZFJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgaXRlbS5jb21wbGV0ZWQgPSBjb21wbGV0ZWRSYWRpby5jaGVja2VkO1xyXG4gICAgICBzYXZlVGFza3NUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpcHRpb25TcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgKCkgPT4ge1xyXG4gICAgICBlZGl0VGFza0Rlc2NyaXB0aW9uSW5saW5lKGl0ZW0sIGRlbGV0ZUJ1dHRvbiwgZGVsZXRlSWNvbiwgY29tcGxldGVkUmFkaW8pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdG9nZ2xlRGVsZXRlQnV0dG9uKGRlbGV0ZUljb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBkZWxldGVUYXNrKGluZGV4KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGNvbXBsZXRlZFJhZGlvKTtcclxuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uU3Bhbik7XHJcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcclxuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XHJcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChocik7XHJcblxyXG4gICAgbGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tJbnB1dCcpLnZhbHVlID0gJyc7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCB0b2dnbGVEZWxldGVCdXR0b24gPSAoZGVsZXRlSWNvbikgPT4ge1xyXG4gIGNvbnN0IGxpc3RJdGVtID0gZGVsZXRlSWNvbi5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5pY29uMycpO1xyXG5cclxuICBpZiAoZGVsZXRlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xyXG4gICAgZGVsZXRlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgIGRlbGV0ZUljb24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9IGVsc2Uge1xyXG4gICAgZGVsZXRlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkZWxldGVJY29uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICB9XHJcbn07XHJcblxyXG4vLyBFZGl0IHRhc2sgZGVzY3JpcHRpb25cclxuY29uc3QgZWRpdFRhc2tEZXNjcmlwdGlvbklubGluZSA9IChpdGVtLCBkZWxldGVCdXR0b24sIGRlbGV0ZUljb24sIGNvbXBsZXRlZFJhZGlvKSA9PiB7XHJcbiAgY29uc3QgeyBpbmRleCB9ID0gaXRlbTtcclxuXHJcbiAgY29uc3QgZGVzY3JpcHRpb25TcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc3BhbltkYXRhLWluZGV4PVwiJHtpbmRleH1cIl1gKTtcclxuICBjb25zdCBjdXJyZW50RGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblNwYW4udGV4dENvbnRlbnQ7XHJcblxyXG4gIGNvbnN0IGlucHV0RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIGlucHV0RmllbGQudmFsdWUgPSBjdXJyZW50RGVzY3JpcHRpb247XHJcbiAgaW5wdXRGaWVsZC5jbGFzc0xpc3QuYWRkKCdlZGl0RmllbGQnKTtcclxuXHJcbiAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgIGNvbnN0IG5ld0Rlc2NyaXB0aW9uID0gaW5wdXRGaWVsZC52YWx1ZS50cmltKCk7XHJcbiAgICAgIGlmIChuZXdEZXNjcmlwdGlvbiAhPT0gJycpIHtcclxuICAgICAgICBlZGl0VGFza0Rlc2NyaXB0aW9uKGluZGV4LCBuZXdEZXNjcmlwdGlvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0Rlc2NyaXB0aW9uIG11c3QgYmUgYXQgbGVhc3QgdHdvIGNoYXJhY3RlcnMuJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICBpbnB1dEZpZWxkLnZhbHVlID0gY3VycmVudERlc2NyaXB0aW9uO1xyXG4gICAgICBpbnB1dEZpZWxkLmJsdXIoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3RGVzY3JpcHRpb24gPSBpbnB1dEZpZWxkLnZhbHVlLnRyaW0oKTtcclxuICAgIGlmIChuZXdEZXNjcmlwdGlvbiAhPT0gJycpIHtcclxuICAgICAgZWRpdFRhc2tEZXNjcmlwdGlvbihpbmRleCwgbmV3RGVzY3JpcHRpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5wdXRGaWVsZC52YWx1ZSA9IGN1cnJlbnREZXNjcmlwdGlvbjtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgaWYgKGlucHV0RmllbGQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XHJcbiAgICBkZWxldGVCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRlbGV0ZUljb24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGNvbXBsZXRlZFJhZGlvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfVxyXG5cclxuICBkZXNjcmlwdGlvblNwYW4udGV4dENvbnRlbnQgPSAnJztcclxuICBkZXNjcmlwdGlvblNwYW4uYXBwZW5kQ2hpbGQoaW5wdXRGaWVsZCk7XHJcbiAgaW5wdXRGaWVsZC5mb2N1cygpO1xyXG59O1xyXG5cclxuLy8gU2F2ZSBhbmQgdXBkYXRlIGxvY2FsIHN0b3JhZ2VcclxuY29uc3Qgc2F2ZVRhc2tzVG9Mb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9MaXN0JywgSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGxvYWRUYXNrc0Zyb21Mb2NhbFN0b3JhZ2UsXHJcbiAgYXR0YWNoRXZlbnRMaXN0ZW5lcnMsXHJcbiAgZGlzcGxheUl0ZW1zQnlJbmRleCxcclxuICBhZGRUYXNrLFxyXG4gIGRlbGV0ZVRhc2ssXHJcbn07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9