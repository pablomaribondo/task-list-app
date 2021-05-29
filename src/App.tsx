import { FC } from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Notification from './components/Notification';
import { RootState } from './store/store';

const App: FC = () => {
  const notificationMessage = useSelector(
    (state: RootState) => state.notification.message
  );

  return (
    <div className="App">
      <Header
        title="Task List App"
        subtitle="Create some lists and add some tasks tp each list"
      />

      <div className="container px-5">
        <div className="columns">
          <Sidebar />
        </div>
      </div>

      <Notification message={notificationMessage} />
    </div>
  );
};

export default App;
