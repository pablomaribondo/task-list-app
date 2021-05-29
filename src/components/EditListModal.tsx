import { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { List } from '../store/types';
import { setListToEdit, updateList, setNotification } from '../store/actions';

interface EditListModalProps {
  list: List;
}

const EditListModal: FC<EditListModalProps> = ({ list }) => {
  const dispatch = useDispatch();

  const [listName, setListName] = useState(list.name);

  const hideModalHandler = () => {
    dispatch(setListToEdit(''));
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (listName.trim() === '') {
      return alert('List name is required!'); // eslint-disable-line no-alert
    }

    if (listName.trim() === list.name) {
      return alert('List name is the same as before'); // eslint-disable-line no-alert
    }

    dispatch(updateList(list.id, listName.trim()));
    dispatch(setNotification(`List ["${list.name}"] updated!`));
  };

  const changeHandler = (event: FormEvent<HTMLInputElement>) => {
    setListName(event.currentTarget.value);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={hideModalHandler} />
      <form className="modal-card" onSubmit={submitHandler}>
        <header className="modal-card-head">
          <p className="modal-card-title">Edit List</p>
          <button className="delete" type="button" onClick={hideModalHandler} />
        </header>
        <div className="modal-card-body">
          <div className="field">
            <label htmlFor="" className="label">
              List Name
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="listName"
                placeholder="List Name"
                value={listName}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-success">
            Save changes
          </button>
          <button type="button" className="button" onClick={hideModalHandler}>
            Cancel
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EditListModal;
