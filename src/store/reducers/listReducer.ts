import { ListsAction, ListState } from '../types';

const initialState: ListState = {
  lists: {},
  listToDelete: '',
  listToEdit: null,
  listById: null,
  selectedList: null,
  taskToDelete: null,
  taskToEdit: null
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action: ListsAction): ListState => {
  switch (action.type) {
    default:
      return state;
  }
};
