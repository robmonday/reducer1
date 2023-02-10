import { useTasks } from "../TasksContext";

//notice the App component did not pass any props to this component! Could have been 20 levels down.
export default function StateDisplay() {
  const state = useTasks();
  return (
    <>
      <div className="text-red-600 text-xl mb-5 uppercase">
        Application State:
      </div>
      <div className="">{JSON.stringify(state)}</div>
    </>
  );
}
