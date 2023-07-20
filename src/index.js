import './style.css';

const list = [
  {
    description: 'Make 9k by December 2023',
    completed: false,
    index: 3,

  },
  {
    description: 'Buy a Kawasaki 2cc by November 2023',
    completed: false,
    index: 2,

  },
  {
    description: 'Meet and greet with top 5 group',
    completed: true,
    index: 1,

  },
];

const listContainer = document.getElementById('listContainer');

// dynamic display
function displayItemsByIndex() {
  listContainer.innerHTML = '';

  list.forEach((item) => {
    const { description, completed, index } = item;

    const listItem = document.createElement('div');
    const descriptionSpan = document.createElement('span');
    const completedRadio = document.createElement('input');
    const hr = document.createElement('hr');

    listItem.classList.add('icon');

    descriptionSpan.textContent = description;
    completedRadio.type = 'checkbox';
    completedRadio.name = `completed_${index}`;
    completedRadio.checked = completed;

    listItem.appendChild(completedRadio);
    listItem.appendChild(descriptionSpan);
    listItem.appendChild(hr);

    listContainer.appendChild(listItem);
  });
}

displayItemsByIndex();