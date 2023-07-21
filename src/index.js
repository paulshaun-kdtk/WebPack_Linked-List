import './style.css';

import {
  loadTasksFromLocalStorage,
  displayItemsByIndex,
  attachEventListeners,
} from './engine.js';

// Call the initial setup functions
loadTasksFromLocalStorage();
displayItemsByIndex();
attachEventListeners();
