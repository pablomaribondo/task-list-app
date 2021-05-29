import { FC } from 'react';
import './App.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App: FC = () => {
  return (
    <div className="App">
      <Header
        title="Task List App"
        subtitle="Create some lists and add some tasks tp each list"
      />

      <div className="container px-5">
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
