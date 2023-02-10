import { useRef } from "react";
import { useTasks, useTasksDispatch } from "./TasksContext";
import StateDisplay from "./components/StateDisplay.jsx";
import "./App.css";

export default function App() {
  const state = useTasks();
  const dispatch = useTasksDispatch();

  const textInputRef = useRef(null);

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
    <div className="">
      <div className="text-red-600 text-3xl mb-5 uppercase">To Do List</div>
      <form
        className="form-control flex flex-row justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          textInputRef.current.focus();
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
            dispatch({
              type: "update_input_text",
              inputText: e.target.value,
            })
          }
          ref={textInputRef}
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
  );
}
