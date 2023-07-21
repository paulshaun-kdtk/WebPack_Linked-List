import './style.css';

import {
  loadTasksFromLocalStorage,
  displayItemsByIndex,
  attachEventListeners,
} from './engine.js';

loadTasksFromLocalStorage();
displayItemsByIndex();
attachEventListeners();
