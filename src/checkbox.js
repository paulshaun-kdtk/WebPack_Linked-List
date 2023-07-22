const handleCompletionChange = (item, completedRadio, saveTasksToLocalStorage) => {
  item.completed = completedRadio.checked;
  saveTasksToLocalStorage();
};

const handleEditClick = (index, editTaskDescription) => {
  const newDescription = prompt('Enter the new description:');
  if (newDescription !== '') {
    editTaskDescription(index, newDescription);
  } else {
    alert('Description must be at least two chars');
  }
};

export { handleCompletionChange, handleEditClick };
