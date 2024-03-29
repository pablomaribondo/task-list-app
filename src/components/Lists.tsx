import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { getLists, setListToDelete, setListToEdit } from '../store/actions';
import { List } from '../store/types';

const Lists: FC = () => {
  const dispatch = useDispatch();

  const lists = useSelector((state: RootState) => state.list.lists);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  const setListToEditHandler = (id: string) => {
    dispatch(setListToEdit(id));
  };

  const setListToDeleteHandler = (id: string) => {
    dispatch(setListToDelete(id));
  };

  return (
    <div className="panel is-primary">
      <p className="panel-heading">Your lists</p>

      <div>
        {Object.keys(lists).length === 0 ? (
          <p className="py-4 has-text-centered">No Lists</p>
        ) : (
          <div>
            {Object.values(lists).map((list: List) => {
              return (
                <div key={list.id} className="panel-block py-3">
                  <p onClick={() => setListToEditHandler(list.id)}>
                    {list.name}
                  </p>
                  <span
                    className="panel-icon has-text-danger"
                    onClick={() => setListToDeleteHandler(list.id)}
                  >
                    <i className="fas fa-times-circle" />
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
