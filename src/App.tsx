import { FC } from 'react';
import { useSelector } from 'react-redux';

import './App.css';

import { RootState } from './store/store';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Notification from './components/Notification';
import DeleteListModal from './components/DeleteListModal';
import EditListModal from './components/EditListModal';
import MainContent from './components/MainContent';
import EditTaskModal from './components/EditTaskModal';

const App: FC = () => {
  const notificationMessage = useSelector(
    (state: RootState) => state.notification.message
  );
  const listToDelete = useSelector(
    (state: RootState) => state.list.listToDelete
  );
  const listToEdit = useSelector((state: RootState) => state.list.listToEdit);
  const taskToEdit = useSelector((state: RootState) => state.list.taskToEdit);

  return (
    <div className="App">
      <Header
        title="Task List App"
        subtitle="Create some lists and add some tasks tp each list"
      />

      <div className="container px-5">
        <div className="columns">
          <Sidebar />
          <MainContent />
        </div>
      </div>

      <Notification message={notificationMessage} />
      {listToDelete && <DeleteListModal listId={listToDelete} />}
      {listToEdit && <EditListModal list={listToEdit} />}
      {taskToEdit && <EditTaskModal taskToEdit={taskToEdit} />}
    </div>
  );
};

export default App;
