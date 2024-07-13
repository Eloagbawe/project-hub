import "./TaskBoard.scss";
import TaskItem from "../TaskItem/TaskItem";
import addIcon from "../../assets/icons/add.svg";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/projectContext";
import projectHubApi from "../../utils/projectHubApi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskBoard = ({ openTaskDetails, openAddTask }) => {
  const {
    todoTasks,
    inProgressTasks,
    inReviewTasks,
    doneTasks,
    tasksData,
    filterTasks,
    setTodoTasks,
    setInProgressTasks,
    setInReviewTasks,
    setDoneTasks,
  } = useContext(ProjectContext);

  const dragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    const tasks = [...tasksData.tasks];
    const task = tasks.find((task) => task.id === draggableId);

    task.status = destinationStatus;
    filterTasks(tasks);

    let destinationColumn = [];
    let setFunction;

    switch (destinationStatus) {
      case "to do": {
        destinationColumn = todoTasks;
        setFunction = setTodoTasks;
        break;
      }
      case "in progress": {
        destinationColumn = inProgressTasks;
        setFunction = setInProgressTasks;
        break;
      }
      case "in review": {
        destinationColumn = inReviewTasks;
        setFunction = setInReviewTasks;
        break;
      }
      case "done": {
        destinationColumn = doneTasks;
        setFunction = setDoneTasks;
        break;
      }
      default: {
        destinationColumn = [];
        setFunction = null;
      }
    }

    let newTasks = Array.from(destinationColumn);

    if (destinationStatus === sourceStatus) {
      newTasks.splice(source.index, 1);
    }
    newTasks.splice(destination.index, 0, task);
    setFunction(newTasks);

    if (destinationStatus === sourceStatus) {
      return;
    }

    try {
      await projectHubApi.updateTask(tasksData.project_id, task.id, task);
    } catch (err) {
      console.error(err);
      task.status = sourceStatus;
      filterTasks(tasks);
    }
  };

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <div className="task-board flex gap-5 mb-10">
        <Droppable droppableId="to do">
          {(provided) => (
            <div
              className="task-board__item px-3 pt-3 pb-16 rounded-lg relative"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <p className="task-board__label">To do</p>
              {todoTasks?.map((task, index) => (
                <div className="task-board__task" key={task.id}>
                  <Draggable draggableId={task.id} index={index}>
                    {(provided) => (
                      <TaskItem
                        task={task}
                        handleClick={openTaskDetails}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                      />
                    )}
                  </Draggable>
                </div>
              ))}

              <button
                className="task-board__btn absolute bottom-4 flex items-center gap-1"
                onClick={openAddTask}
              >
                <img src={addIcon} alt="add task icon" />
                <span>Add Task</span>
              </button>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="in progress">
          {(provided) => (
            <div
              className="task-board__item p-3 rounded-lg"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <p className="task-board__label">In Progress</p>
              {inProgressTasks?.map((task, index) => (
                <div className="task-board__task" key={task.id}>
                  <Draggable draggableId={task.id} index={index}>
                    {(provided) => (
                      <TaskItem
                        task={task}
                        handleClick={openTaskDetails}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                      />
                    )}
                  </Draggable>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="in review">
          {(provided) => (
            <div
              className="task-board__item p-3 rounded-lg"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <p className="task-board__label">In Review</p>
              {inReviewTasks?.map((task, index) => (
                <div className="task-board__task" key={task.id}>
                  <Draggable draggableId={task.id} index={index}>
                    {(provided) => (
                      <TaskItem
                        task={task}
                        handleClick={openTaskDetails}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                      />
                    )}
                  </Draggable>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="done">
          {(provided) => (
            <div
              className="task-board__item p-3 rounded-lg"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <p className="task-board__label">Done</p>
              {doneTasks?.map((task, index) => (
                <div className="task-board__task" key={task.id}>
                  <Draggable draggableId={task.id} index={index}>
                    {(provided) => (
                      <TaskItem
                        task={task}
                        handleClick={openTaskDetails}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                      />
                    )}
                  </Draggable>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
