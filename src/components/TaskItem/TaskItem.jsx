import "./TaskItem.scss";
import { capitalizeInitials } from "../../utils";
import moreIcon from "../../assets/icons/more_horiz.svg";

const TaskItem = ({ task, handleClick }) => {
  return (
    <div className="task-item rounded-lg p-3 my-3 flex gap-1">
      <div className="flex flex-col gap-2 justify-between w-[90%]">
        <div className="task-item__title">{task?.title}</div>
        <div className="task-item__user">
          <p>
            {task?.user
              ? capitalizeInitials(
                  task?.user?.first_name,
                  task?.user?.last_name
                )
              : "Unassigned"}
          </p>
        </div>
      </div>
      <div>
        <button onClick={() => handleClick(task)}>
          <img src={moreIcon} className="expand task" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
