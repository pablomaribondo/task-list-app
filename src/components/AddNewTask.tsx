import { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTask, setNotification } from '../store/actions';
import { List, Task } from '../store/types';

interface AddNewTaskProps {
  list: List;
}

const AddNewTask: FC<AddNewTaskProps> = ({ list }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');

  const changeHandler = (event: FormEvent<HTMLInputElement>) => {
    setTaskName(event.currentTarget.value);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskName.trim() === '') {
      // eslint-disable-next-line no-alert
      return alert('Task name is required');
    }

    const newTask: Task = {
      name: taskName,
      id: `task-${new Date().getTime()}`,
      completed: false
    };

    dispatch(addTask(newTask, list));
    dispatch(setNotification(`New task ["${newTask.name}"] created!`));
    setTaskName('');
  };

  return (
    <section className="section">
      <h2 className="is-size-4 has-text-centered">
        Add new task to selected field
      </h2>
      <form onSubmit={submitHandler}>
        <div className="field">
          <label className="label">Task Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Add Task"
              value={taskName}
              onChange={changeHandler}
            />
          </div>
          <div className="control mt-4">
            <input
              type="submit"
              value="Add New Task"
              className="button is-primary"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddNewTask;
