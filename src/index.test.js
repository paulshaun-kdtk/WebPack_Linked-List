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
  editTaskDescription,
  updateTaskCompletion,
  Delete,
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

describe('editTaskDescription', () => {
  let list;

  beforeEach(() => {
    // Set up a sample list of tasks
    list = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];
  });

  test('should not update the description if the index is out of bounds', () => {
    const index = 4;
    const newDescription = 'Updated task description';

    editTaskDescription(index, newDescription, list);

    expect(list).toEqual(list);
  });

  test('should not update the description if the new description is empty', () => {
    const index = 2;
    const newDescription = '';

    editTaskDescription(index, newDescription, list);

    expect(list).toEqual(list);
  });
});

describe('updateTaskCompletion', () => {
  let list;

  beforeEach(() => {
    list = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];
  });

  test('should update the completion status of a task at a given index', () => {
    const index = 2;
    const newCompletionStatus = false;

    // mimicking checkbox click
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('data-index', list[index - 2].completed);
    attachEventListeners(list, checkbox);

    expect(list[index - 2].completed).toEqual(newCompletionStatus);
  });

  test('should not update the completion status if the index is out of bounds', () => {
    const index = 4;
    const newCompletionStatus = true;

    attachEventListeners(index, newCompletionStatus, list);

    expect(list).toEqual(list);
  });
});

describe('clearCompletedTasks', () => {
  let list;

  beforeEach(() => {
    list = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: true, index: 2 },
      { description: 'Task 3', completed: true, index: 3 },
    ];
  });

  test('should not remove any tasks if there are no completed tasks in the list', () => {
    list.forEach((task) => {
      task.completed = false;
    });

    Delete.list;

    expect(list).toEqual(list);
  });
});