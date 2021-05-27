import {
  ADD_LIST,
  DELETE_LIST,
  GET_LISTS,
  GET_LIST_BY_ID,
  Lists,
  ListsAction,
  ListState,
  SET_LIST_TO_DELETE,
  SET_LIST_TO_EDIT,
  UPDATE_LIST
} from '../types';

const INITIAL_STATE: ListState = {
  lists: {},
  listToDelete: '',
  listToEdit: null,
  listById: null,
  selectedList: null,
  taskToDelete: null,
  taskToEdit: null
};

const LS_TAG = 'task_list';

const getListsFromLS = (): Lists => {
  if (localStorage.getItem(LS_TAG)) {
    return JSON.parse(localStorage.getItem(LS_TAG) || '{}');
  }

  return {};
};

const saveListsToLS = (lists: Lists) => {
  localStorage.setItem(LS_TAG, JSON.stringify(lists));
};

// eslint-disable-next-line default-param-last
export default (state = INITIAL_STATE, action: ListsAction): ListState => {
  const listsFromLS = getListsFromLS();

  switch (action.type) {
    case ADD_LIST: {
      const clonedListsFromLS = { ...listsFromLS };
      clonedListsFromLS[action.payload.id] = action.payload;

      saveListsToLS(clonedListsFromLS);

      return {
        ...state,
        lists: clonedListsFromLS
      };
    }

    case GET_LISTS:
      return {
        ...state,
        lists: listsFromLS
      };

    case GET_LIST_BY_ID: {
      const list = listsFromLS[action.payload];

      return {
        ...state,
        listById: list
      };
    }

    case SET_LIST_TO_DELETE:
      return {
        ...state,
        listToDelete: action.payload
      };

    case SET_LIST_TO_EDIT: {
      const listToEdit = listsFromLS[action.payload];

      return {
        ...state,
        listToEdit
      };
    }

    case DELETE_LIST: {
      const clonedListsFromLS = { ...listsFromLS };
      const listId = clonedListsFromLS[action.payload].id;

      delete clonedListsFromLS[action.payload];
      saveListsToLS(clonedListsFromLS);

      return {
        ...state,
        lists: clonedListsFromLS,
        listToDelete: '',
        listById: null,
        selectedList:
          state.selectedList && listId === state.selectedList.id
            ? null
            : state.selectedList
      };
    }

    case UPDATE_LIST: {
      const clonedListsFromLS = { ...listsFromLS };

      clonedListsFromLS[action.payload.id].name = action.payload.name;
      saveListsToLS(clonedListsFromLS);

      return {
        ...state,
        lists: clonedListsFromLS,
        listToEdit: null
      };
    }

    default:
      return state;
  }
};
