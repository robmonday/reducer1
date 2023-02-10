import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

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

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

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
