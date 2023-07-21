import './style.css';

import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
  displayItemsByIndex,
  addTask,
  editTaskDescription,
  attachEventListeners,
} from './engine.js';

loadTasksFromLocalStorage();
displayItemsByIndex();
addTask();
editTaskDescription();
attachEventListeners();
saveTasksToLocalStorage();
