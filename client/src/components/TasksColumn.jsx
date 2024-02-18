import { CiCircleInfo } from "react-icons/ci";
import { HiDotsHorizontal } from "react-icons/hi";
import TaskItem from "./TaskItem";

const TasksColumn = ({ organizedTasks, type }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center py-2 border-b border-pinkColor">
        <div className="flex items-center gap-4">
          <p className="font-bold text-darkBlue">{type}</p>
          <CiCircleInfo />
        </div>
        {/* HiHorizontal Dots */}
        <HiDotsHorizontal />
      </div>

      {/* not started tasks listing */}
      {organizedTasks[type] &&
        organizedTasks[type].length &&
        organizedTasks[type].map((task, index) => (
          <TaskItem key={index} {...task} />
        ))}
    </div>
  );
};

export default TasksColumn;
