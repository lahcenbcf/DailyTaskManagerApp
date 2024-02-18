import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../actions/task";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import TasksColumn from "./TasksColumn";

function TaskList() {
  const dispatch = useDispatch();
  const { loading, error, tasks } = useSelector((state) => state.taskReducer);
  const [organizedTasks, setOrganizedTasks] = useState(null);
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (user._id && !tasks.length) dispatch(getTasks(user?._id));
  }, []);

  useEffect(() => {
    if (tasks.length) {
      const organizedTasks = tasks.reduce((acc, task) => {
        if (!acc[task.status]) {
          acc[task.status] = [];
        }
        acc[task.status].push(task);
        return acc;
      }, {});
      setOrganizedTasks(organizedTasks);
    }
  }, [tasks]);

  return (
    <div className="px-6">
    {loading && <Spinner />}
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Tasks</h2>
        {/* search bar */}
        <SearchBar />
      </div>

      {organizedTasks ? (
        <div className="relative grid grid-cols-2  lg:grid-cols-4 gap-8 my-4 min-h-screen">
          {/* not started yet */}
          <TasksColumn organizedTasks={organizedTasks} type={"not started"} />

          {/*started */}

          <TasksColumn organizedTasks={organizedTasks} type={"Started"} />
          {/* in progress */}

          <TasksColumn organizedTasks={organizedTasks} type={"in progress"} />
          {/* completed */}

          <TasksColumn organizedTasks={organizedTasks} type={"completed"} />
          
          {error && <p className="text-red-600">{error}</p>}
          {
            organizedTasks.length &&
            organizedTasks?.map((task, index) => (
              <TaskItem key={index} {...task} />
            ))
          }
        </div>
      ) : (
        <p>
          no tasks{" "}
          <Link className=" text-primary underline" to="/dashboard/addTask">
            Add your first task
          </Link>
        </p>
      )}
    </div>
  );
}

export default TaskList;
