import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import AddNewTask from './AddNewTask';
import SelectList from './SelectList';
import Tasks from './Tasks';

const MainContent: FC = () => {
  const selectedList = useSelector(
    (state: RootState) => state.list.selectedList
  );

  return (
    <div className="column is-9">
      <div className="box">
        <SelectList />
        {selectedList && (
          <>
            <AddNewTask list={selectedList} />
            <hr />
            <Tasks tasks={selectedList.tasks} />
          </>
        )}
      </div>
    </div>
  );
};

export default MainContent;
