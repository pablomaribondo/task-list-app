import { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Task, List } from '../store/types';
import { updateTask, unsetTaskToEdit, setNotification } from '../store/actions';

interface EditTaskModalProps {
  taskToEdit: {
    task: Task;
    list: List;
  };
}

const EditTaskModal: FC<EditTaskModalProps> = ({
  taskToEdit: { task, list }
}) => {
  const dispatch = useDispatch();

  const [taskName, setTaskName] = useState(task.name);
  const [taskState, setTaskState] = useState(task.completed);

  const closeModalHandler = () => {
    dispatch(unsetTaskToEdit());
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskName.trim() === '') {
      // eslint-disable-next-line no-alert
      return alert('Task name is required!');
    }

    if (taskName === task.name && taskState === task.completed) {
      // eslint-disable-next-line no-alert
      return alert('Task name and state are the same as before!');
    }

    dispatch(updateTask(task.id, taskName, taskState, list));
    dispatch(setNotification(`Task ["${task.name}"] updated!`));
  };

  const nameChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setTaskName(event.currentTarget.value);
  };

  const stateChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setTaskState(event.currentTarget.checked);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModalHandler} />
      <form className="modal-card" onSubmit={submitHandler}>
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Task</p>
          <button
            className="delete"
            type="button"
            onClick={closeModalHandler}
          />
        </header>
        <div className="modal-card-body">
          <div className="field">
            <label className="label">Task Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Task Name"
                value={taskName}
                onChange={nameChangeHandler}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Complete Task</label>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={taskState}
                onChange={stateChangeHandler}
              />{' '}
              Complete
            </label>
          </div>
        </div>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-success">
            Save Changes
          </button>
          <button type="button" className="button" onClick={closeModalHandler}>
            Cancel
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EditTaskModal;
