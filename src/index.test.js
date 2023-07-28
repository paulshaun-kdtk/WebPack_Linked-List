const fs = require('fs');
const path = require('path');
const { describe, test, expect } = require('@jest/globals');
const jsdom = require('jsdom-global');

// Load the HTML file
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

// Set up the DOM environment
const cleanup = jsdom(html, { runScripts: 'dangerously' });
const { document } = window;


// Load the JavaScript file
let app = require('./index.js');

// Import the required functions and elements from app.js
const {
  loadTasksFromLocalStorage,
  attachEventListeners,
  displayItemsByIndex,
  addTask,
  deleteTask
} = app
// Set up the document with the required elements
document.body.innerHTML = `
  <div id="listContainer"></div>
  <input type="text" id="taskInput" />
  <button id="addTaskButton">Add Task</button>
  <button id="clear">Clear</button>
`;

// Set up local storage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
global.localStorage = localStorageMock;

// Initialize the app
loadTasksFromLocalStorage();
attachEventListeners();
displayItemsByIndex();


describe('addTask', () => {
  it('should add a task to the list', () => {
    const list = [];
    addTask('Buy milk');
    expect(list).toEqual([{ description: 'Buy milk', completed: false, index: 1 }]);
  });

  it('should not add a task with a blank description', () => {
    const list = [];
    addTask('');
    expect(list).toEqual([]);
  });
});



describe('deleteTask', () => {
  it('should delete a task from the list', () => {
    const list = [{ description: 'Buy milk', completed: false, index: 1 }];
    deleteTask();
    expect(1).toEqual([]);
  });

  it('should not delete a task that does not exist', () => {
    const list = [{ description: 'Buy milk', completed: false, index: 1 }];
    deleteTask(2);
    expect(list).toEqual([{ description: 'Buy milk', completed: false, index: 1 }]);
  });
});