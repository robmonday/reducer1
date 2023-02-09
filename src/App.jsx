import { useReducer, createContext, useContext } from "react";
import "./App.css";

const AppContext = createContext(); // variable name is capitalized because this hook creates a react component

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

//notice the App component did not pass any props to this component! Could have been 20 levels down.
function StateDisplay() {
  const state = useContext(AppContext);
  return (
    <>
      <div className="text-red-600 text-xl mb-5 uppercase">
        Application State:{" "}
      </div>
      <div className="">{JSON.stringify(state)}</div>
    </>
  );
}

function App() {
  const [state, dispatch] = useReducer(toDoReducer, initialState);

  let tasksToMap = state.list;

  if (state.showImportantOnly) {
    tasksToMap = tasksToMap.filter((t) => t.important === true);
  }

  if (state.excludeCompleted) {
    tasksToMap = tasksToMap.filter((t) => t.status !== "done");
  }

  const tasks = tasksToMap.map((t) => (
    <li
      className="text-lg hover:bg-red-100 active:translate-y-0.5 px-10 py-1 "
      key={t.id}
    >
      <span className={t.important ? "font-bold" : ""}>
        <span className={t.status === "done" ? "line-through" : ""}>
          {t.task}
        </span>
      </span>
    </li>
  ));

  return (
    // here we are using the 'AppContext' React component created by createContext()
    <AppContext.Provider value={state}>
      <div className="">
        <div className="text-red-600 text-3xl mb-5 uppercase">To Do List</div>
        <form
          className="form-control flex flex-row justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            if (state.inputText === "") {
              return;
            }
            dispatch({
              type: "new_task",
              task: state.inputText,
              important: state.inputCheckbox,
            });
          }}
        >
          <input
            type="text"
            placeholder="Add new task here..."
            className="input input-sm input-bordered w-full max-w-md inline mx-2"
            value={state.inputText}
            onChange={(e) =>
              dispatch({ type: "update_input_text", inputText: e.target.value })
            }
          />
          Important?
          <input
            type="checkbox"
            className="checkbox mx-2"
            onChange={() =>
              dispatch({
                type: "checkbox_toggle",
                important: !state.inputCheckbox,
              })
            }
            checked={state.inputCheckbox}
          />
          <input
            type="submit"
            value="Add A Task"
            className="btn btn-outline btn-sm inline"
          />
        </form>
        <div className="flex flex-row justify-center">
          <label className="label cursor-pointer justify-center mt-3">
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-neutral"
              onChange={() =>
                dispatch({
                  type: "show_important_only",
                  value: !state.showImportantOnly,
                })
              }
              checked={state.showImportantOnly}
            />
            &nbsp;
            <span className="label-text mr-3">Show Important Only</span>
          </label>
          &nbsp;
          <label className="label cursor-pointer justify-center mt-3">
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-neutral"
              onChange={() =>
                dispatch({
                  type: "exclude_completed",
                  value: !state.excludeCompleted,
                })
              }
              checked={state.excludeCompleted}
            />
            &nbsp;
            <span className="label-text mr-3">Exclude Completed</span>
          </label>
        </div>

        <div className="divider" />
        <ol>{tasks}</ol>
        <div className="divider" />
        <StateDisplay />
      </div>
    </AppContext.Provider>
  );
}

export default App;
