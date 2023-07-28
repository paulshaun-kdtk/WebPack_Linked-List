const fs = require('fs');
const path = require('path');
const { describe, test, expect } = require('@jest/globals');
const jsdom = require('jsdom-global');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

const cleanup = jsdom(html, { runScripts: 'dangerously' });
const { document } = window;

const app = require('./index.js');

const {
  loadTasksFromLocalStorage,
  attachEventListeners,
  displayItemsByIndex,
  addTask,
  deleteTask,
} = app;

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
  it('should not add a task with a blank description', () => {
    const list = [];
    addTask('', list);
    expect(list).toEqual([]);
  });
});

describe('deleteTask', () => {
  it('should not delete a task that does not exist', () => {
    const list = [{ description: 'Buy milk', completed: false, index: 1 }];
    const result = deleteTask(2, list);
    expect(result).toBe(false);
    expect(list).toEqual([{ description: 'Buy milk', completed: false, index: 1 }]);
  });
});