import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeProgressValue, deleteTask } from "../actions/task";
import { useEffect, useState } from "react";
function TaskItem(task) {
  const [firstRender,setFirstRender]=useState(true)
  const dispatch = useDispatch();
  const [pv, setPv] = useState(task.progressValue);
  const deleteT = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const changeProgress = (e) => {
    e.preventDefault();
    setPv(Number(e.target.value));
  };

  useEffect(() => {
    let bounceTime;

    if(!firstRender){
       bounceTime = setTimeout(
        () => dispatch(changeProgressValue(pv, task._id)),
        2000,
      );
    }
    

    return () => clearTimeout(bounceTime);
  }, [pv]);

  useEffect(()=>{
    setFirstRender(false)
})

  return (
    <div className="bg-white rounded-xl p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        {/* categorie */}
        <div className="w-fit px-2 py-3 rounded-md bg-purpleColor text-white font-bold">
          {task.categorie}
        </div>
        <div className="flex gap-2">
          {/* edit Btn */}
          <Link
            className="text-white p-1 bg-orangeColor text-sm"
            to="/dashboard/editTask"
            state={task}
          >
            edit
          </Link>
          {/* delete Btn */}
          <Link
            className="bg-deleteColor text-white text-sm p-1"
            onClick={() => deleteT(task._id)}
          >
            delete
          </Link>
        </div>
      </div>
      {/* task name */}
      <h3>{task.task}</h3>
      {/* description */}
      <p className="text-slate-500">{task.desc}</p>
      {/* progess */}
      <div className="flex justify-between">
        <h4 className="font-bold">Progress</h4>
        <h4>{task.progressValue}/10</h4>
      </div>
      {/* range input */}
      <input
        type="range"
        min={"0"}
        max={"10"}
        value={pv}
        className="rangeInput"
        onChange={changeProgress}
      />
      {/* created at */}
      <p>{format(task.createdAt, "MM/dd/yyyy")}</p>

      {/* ends at */}
      <p>{format(task.endsAt, "MM/dd/yyyy")}</p>
    </div>
  );
}

export default TaskItem;
