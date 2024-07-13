import "./TaskBoard.scss";
import TaskItem from "../TaskItem/TaskItem";
import addIcon from "../../assets/icons/add.svg";
import { useState, useContext } from "react";
import AddTask from "../AddTask/AddTask";
import TaskDetails from "../TaskDetails/TaskDetails";
import { ProjectContext } from "../../contexts/projectContext";

const TaskBoard = () => {
  const { todoTasks, inProgressTasks, inReviewTasks, doneTasks } =
    useContext(ProjectContext);

  const [addTaskModal, setAddTaskModal] = useState(false);

  const [taskDetailsModal, setTaskDetailsModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);

  const openTaskDetails = (task) => {
    setTaskDetails(task);
    setTaskDetailsModal(true);
  };

  return (
    <>
      <AddTask isOpen={addTaskModal} onClose={() => setAddTaskModal(false)} />
      <TaskDetails
        isOpen={taskDetailsModal}
        onClose={() => setTaskDetailsModal(false)}
        task={taskDetails}
      />
      <div className="task-board flex gap-5 mb-10">
        <div className="task-board__item px-3 pt-3 pb-16 rounded-lg relative">
          <p className="task-board__label">To do</p>
          {todoTasks?.map((task) => (
            <div className="task-board__task" key={task.id}>
              <TaskItem task={task} handleClick={openTaskDetails} />
            </div>
          ))}

          <button
            className="task-board__btn absolute bottom-4 flex items-center gap-1"
            onClick={() => setAddTaskModal(true)}
          >
            <img src={addIcon} alt="add task icon" />
            <span>Add Task</span>
          </button>
        </div>
        <div className="task-board__item p-3 rounded-lg">
          <p className="task-board__label">In Progress</p>
          {inProgressTasks?.map((task) => (
            <div className="task-board__task" key={task.id}>
              <TaskItem task={task} handleClick={openTaskDetails} />
            </div>
          ))}
        </div>
        <div className="task-board__item p-3 rounded-lg">
          <p className="task-board__label">In Review</p>
          {inReviewTasks?.map((task) => (
            <div className="task-board__task" key={task.id}>
              <TaskItem task={task} handleClick={openTaskDetails} />
            </div>
          ))}
        </div>
        <div className="task-board__item p-3 rounded-lg">
          <p className="task-board__label">Done</p>
          {doneTasks?.map((task) => (
            <div className="task-board__task" key={task.id}>
              <TaskItem task={task} handleClick={openTaskDetails} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskBoard;
