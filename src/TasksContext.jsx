/* In this separate module...
   You are creating a wrapping component that manages state with useReducer and passes context provider component to "children"
   To support useReducer, a separate reducer function and an initial state are needed
   Separate useContext functions are also provided, so that this import is not needed in other files

   See for more info:  https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file
*/

import { createContext, useContext, useReducer } from "react";

// instantiating createContext components
const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

// creating functions that useContext, exported for use by other modules
export function useTasks() {
  return useContext(TasksContext);
}
export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

// creating a wrapping component that implements useReducer, makes state and dispatch available to any wrapped components
export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(toDoReducer, initialState);
  return (
    <TasksContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// reducer function input for useReducer in TaskProvider
function toDoReducer(state, action) {
  console.log(JSON.stringify(action));
  switch (action.type) {
    case "new_task":
      return {
        ...state,
        inputText: "",
        inputCheckbox: false,
        list: state.list.concat({
          id: state.list.length + 1,
          task: action.task,
          important: action.important,
          status: "open",
        }),
      };
    case "update_input_text":
      return { ...state, inputText: action.inputText };
    case "checkbox_toggle":
      return { ...state, inputCheckbox: action.important };
    case "show_important_only":
      return { ...state, showImportantOnly: action.value };
    case "exclude_completed":
      return { ...state, excludeCompleted: action.value };
    default:
      return state;
  }
}

// initial state input for useReducer in TaskProvider
const initialState = {
  inputText: "",
  inputCheckbox: false,
  showImportantOnly: false,
  excludeCompleted: false,
  list: [
    {
      id: 1,
      task: "Groceries at Costco",
      important: true,
      status: "done",
    },
    {
      id: 2,
      task: "Clean out items in garage",
      important: false,
      status: "open",
    },
    {
      id: 3,
      task: "Feed the baby",
      important: true,
      status: "open",
    },
  ],
};
