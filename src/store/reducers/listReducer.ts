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
  UPDATE_LIST,
  SET_SELECTED_LIST,
  ADD_TASK,
  SET_TASK_TO_DELETE,
  UNSET_TASK_TO_DELETE,
  DELETE_TASK,
  SET_TASK_TO_EDIT,
  UNSET_TASK_TO_EDIT,
  UPDATE_TASK
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

    case SET_SELECTED_LIST: {
      const selectedList = getListsFromLS()[action.payload];

      return {
        ...state,
        selectedList
      };
    }

    case ADD_TASK: {
      const clonedListsFromLS = { ...listsFromLS };
      clonedListsFromLS[action.payload.list.id].tasks.push(action.payload.task);

      saveListsToLS(clonedListsFromLS);

      return {
        ...state,
        lists: clonedListsFromLS,
        selectedList: clonedListsFromLS[action.payload.list.id]
      };
    }

    case SET_TASK_TO_DELETE:
      return {
        ...state,
        taskToDelete: {
          task: action.payload.task,
          list: action.payload.list
        }
      };

    case UNSET_TASK_TO_DELETE:
      return {
        ...state,
        taskToDelete: null
      };

    case DELETE_TASK: {
      const clonedListsFromLS = { ...listsFromLS };
      const clonedTasks = [
        ...clonedListsFromLS[state.taskToDelete!.list.id].tasks
      ];
      const task = clonedTasks.find(
        taskData => taskData.id === state.taskToDelete!.task.id
      );

      clonedTasks.splice(clonedTasks.indexOf(task!), 1);
      clonedListsFromLS[state.taskToDelete!.list.id].tasks = clonedTasks;

      saveListsToLS(clonedListsFromLS);

      return {
        ...state,
        lists: clonedListsFromLS,
        selectedList: clonedListsFromLS[state.taskToDelete!.list.id],
        taskToDelete: null
      };
    }

    case SET_TASK_TO_EDIT:
      return {
        ...state,
        taskToEdit: {
          task: action.payload.task,
          list: action.payload.list
        }
      };

    case UNSET_TASK_TO_EDIT:
      return {
        ...state,
        taskToEdit: null
      };

    case UPDATE_TASK: {
      const clonedListsFromLS = { ...listsFromLS };
      const clonedList = { ...clonedListsFromLS[action.payload.list.id] };
      const clonedTasks = [...clonedList.tasks];
      const task = clonedTasks.find(
        taskData => taskData.id === action.payload.taskId
      );
      const clonedTask = { ...task! };

      clonedTask.name = action.payload.taskName;
      clonedTask.completed = action.payload.taskState;

      const updatedTasks = clonedTasks.map(taskData =>
        taskData.id === clonedTask.id ? clonedTask : taskData
      );

      clonedList.tasks = updatedTasks;
      clonedListsFromLS[clonedList.id] = clonedList;

      saveListsToLS(clonedListsFromLS);

      return {
        ...state,
        lists: clonedListsFromLS,
        selectedList: clonedList,
        taskToEdit: null
      };
    }

    default:
      return state;
  }
};
